import random
import re
from datetime import date, datetime

import psycopg2
from flask import Blueprint, jsonify, request

from database import get_db
from security import rate_limit, require_csrf, require_json

reservations_bp = Blueprint("reservations", __name__)

EMAIL_PATTERN = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
PHONE_PATTERN = re.compile(r"^[0-9+().\-\s]{7,20}$")


def validate_email(email):
    return isinstance(email, str) and len(email) <= 255 and EMAIL_PATTERN.fullmatch(email) is not None


def validate_name(name):
    return (
        isinstance(name, str)
        and 2 <= len(name.strip()) <= 100
        and all(ord(character) >= 32 for character in name)
    )


def validate_phone(phone):
    return not phone or (len(phone) <= 20 and PHONE_PATTERN.fullmatch(phone) is not None)


def validate_guest_count(guest_count):
    return isinstance(guest_count, int) and not isinstance(guest_count, bool) and 1 <= guest_count <= 30


def parse_time_slot(date_str, time_str):
    if not isinstance(date_str, str) or not isinstance(time_str, str):
        return None
    try:
        time_slot = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %I:%M %p")
    except ValueError:
        return None, "Please provide a valid date and time."
    if time_slot.date() < date.today():
        return None, "Please select today or a future date."
    if time_slot.weekday() == 6:
        valid = 17 <= time_slot.hour < 21
        error = "Sunday hours are 5:00 PM – 9:00 PM."
    else:
        valid = 17 <= time_slot.hour < 23
        error = "Monday–Saturday hours are 5:00 PM – 11:00 PM."
    return (time_slot, None) if valid else (None, error)


@reservations_bp.route("/reservations/availability", methods=["GET"])
def check_availability():
    date_str = request.args.get("date")
    try:
        target_date = datetime.strptime(date_str or "", "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Provide a date in YYYY-MM-DD format."}), 400

    if target_date < date.today():
        return jsonify({"error": "Please select today or a future date."}), 400

    hours = range(17, 21) if target_date.weekday() == 6 else range(17, 23)
    available = []
    with get_db() as conn:
        with conn.cursor() as cur:
            for hour in hours:
                slot = datetime.combine(target_date, datetime.min.time().replace(hour=hour))
                cur.execute("SELECT COUNT(*) AS cnt FROM reservations WHERE time_slot = %s", (slot,))
                if cur.fetchone()["cnt"] < 30:
                    available.append(slot.strftime("%I:%M %p").lstrip("0"))
    return jsonify({"available_slots": available})


@reservations_bp.route("/reservations", methods=["POST"])
@rate_limit("reservations")
@require_csrf
@require_json
def create_reservation(data):
    name = data.get("name", "").strip() if isinstance(data.get("name", ""), str) else ""
    email = data.get("email", "").strip().lower() if isinstance(data.get("email", ""), str) else ""
    phone = data.get("phone", "").strip() if isinstance(data.get("phone", ""), str) else ""
    newsletter = data.get("newsletter", False)

    if not validate_name(name):
        return jsonify({"error": "Please enter a full name of 2–100 characters."}), 400
    if not validate_email(email):
        return jsonify({"error": "Please enter a valid email address."}), 400
    if not validate_phone(phone):
        return jsonify({"error": "Please enter a valid phone number or leave it blank."}), 400
    if not validate_guest_count(data.get("guest_count")):
        return jsonify({"error": "Please select between 1 and 30 guests."}), 400
    if not isinstance(newsletter, bool):
        return jsonify({"error": "Newsletter preference must be true or false."}), 400

    time_slot, time_error = parse_time_slot(data.get("date"), data.get("time"))
    if not time_slot:
        return jsonify({"error": time_error}), 400

    try:
        with get_db() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT table_number FROM reservations WHERE time_slot = %s", (time_slot,))
                available_tables = list(set(range(1, 31)) - {row["table_number"] for row in cur.fetchall()})
                if not available_tables:
                    return jsonify({"error": "That time slot is fully booked. Please choose another."}), 409

                cur.execute("SELECT customer_id FROM customers WHERE customer_email = %s", (email,))
                existing = cur.fetchone()
                if existing:
                    customer_id = existing["customer_id"]
                    if newsletter:
                        cur.execute("UPDATE customers SET newsletter_signup = TRUE WHERE customer_id = %s", (customer_id,))
                else:
                    cur.execute(
                        """INSERT INTO customers (customer_name, customer_email, phone_number, newsletter_signup)
                           VALUES (%s, %s, %s, %s) RETURNING customer_id""",
                        (name, email, phone or None, newsletter),
                    )
                    customer_id = cur.fetchone()["customer_id"]

                table_number = random.choice(available_tables)
                cur.execute(
                    """INSERT INTO reservations (customer_id, time_slot, table_number)
                       VALUES (%s, %s, %s) RETURNING reservation_id""",
                    (customer_id, time_slot, table_number),
                )
                reservation_id = cur.fetchone()["reservation_id"]

        return jsonify({
            "message": "Reservation confirmed!",
            "reservation_id": reservation_id,
            "table_number": table_number,
            "time_slot": time_slot.strftime("%B %d, %Y at %I:%M %p"),
        }), 201
    except psycopg2.IntegrityError:
        return jsonify({"error": "That table was just reserved. Please submit again to receive another table."}), 409
    except psycopg2.Error:
        return jsonify({"error": "We could not process your reservation. Please try again."}), 503
