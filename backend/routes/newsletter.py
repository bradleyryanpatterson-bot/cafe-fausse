import psycopg2
from flask import Blueprint, jsonify

from database import get_db
from routes.reservations import validate_email
from security import rate_limit, require_csrf, require_json

newsletter_bp = Blueprint("newsletter", __name__)


@newsletter_bp.route("/newsletter", methods=["POST"])
@rate_limit("newsletter")
@require_csrf
@require_json
def subscribe(data):
    email = data.get("email", "").strip().lower() if isinstance(data.get("email", ""), str) else ""
    if not validate_email(email):
        return jsonify({"error": "Please enter a valid email address."}), 400

    try:
        with get_db() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT customer_id, newsletter_signup FROM customers WHERE customer_email = %s",
                    (email,),
                )
                existing = cur.fetchone()
                if existing and existing["newsletter_signup"]:
                    return jsonify({"message": "You are already subscribed!"}), 200
                if existing:
                    cur.execute("UPDATE customers SET newsletter_signup = TRUE WHERE customer_id = %s", (existing["customer_id"],))
                else:
                    cur.execute(
                        "INSERT INTO customers (customer_name, customer_email, newsletter_signup) VALUES (%s, %s, TRUE)",
                        ("Newsletter Subscriber", email),
                    )
        return jsonify({"message": "Subscribed successfully! Welcome aboard."}), 201
    except psycopg2.Error:
        return jsonify({"error": "We could not process your subscription. Please try again."}), 503
