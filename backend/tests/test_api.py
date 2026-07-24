from datetime import date, timedelta

import pytest


def future_date(days=1):
    """Return an ISO date that remains valid as time passes."""
    return (date.today() + timedelta(days=days)).isoformat()


def next_sunday():
    """Return a future Sunday for the Sunday-hours validation test."""
    days_until_sunday = (6 - date.today().weekday()) % 7 or 7
    return future_date(days_until_sunday)


class TestHealthEndpoint:
    def test_health_returns_ok(self, client):
        resp = client.get("/api/health")
        assert resp.status_code == 200
        assert resp.json == {"status": "ok"}

    def test_health_sets_security_headers(self, client):
        resp = client.get("/api/health")
        assert resp.headers["X-Content-Type-Options"] == "nosniff"
        assert resp.headers["X-Frame-Options"] == "DENY"


class TestAvailabilityEndpoint:
    def test_valid_date_returns_slots(self, client):
        resp = client.get(f"/api/reservations/availability?date={future_date()}")
        assert resp.status_code == 200
        assert "available_slots" in resp.json
        assert isinstance(resp.json["available_slots"], list)
        assert len(resp.json["available_slots"]) > 0

    def test_missing_date_returns_400(self, client):
        resp = client.get("/api/reservations/availability")
        assert resp.status_code == 400
        assert "error" in resp.json

    def test_invalid_date_format_returns_400(self, client):
        resp = client.get("/api/reservations/availability?date=not-a-date")
        assert resp.status_code == 400
        assert "error" in resp.json


class TestReservationEndpoint:
    def test_create_reservation_success(self, client):
        resp = client.post("/api/reservations", json={
            "name": "Test Runner",
            "email": "testrunner@example.com",
            "phone": "(202) 555-0000",
            "guest_count": 2,
            "date": future_date(),
            "time": "7:00 PM",
            "newsletter": False
        })
        assert resp.status_code == 201
        data = resp.json
        assert "reservation_id" in data
        assert "table_number" in data
        assert 1 <= data["table_number"] <= 30

    def test_missing_name_returns_400(self, client):
        resp = client.post("/api/reservations", json={
            "name": "",
            "email": "test@example.com",
            "date": future_date(),
            "time": "7:00 PM"
        })
        assert resp.status_code == 400
        assert "error" in resp.json

    def test_invalid_email_returns_400(self, client):
        resp = client.post("/api/reservations", json={
            "name": "Test User",
            "email": "not-an-email",
            "date": future_date(),
            "time": "7:00 PM"
        })
        assert resp.status_code == 400
        assert "error" in resp.json

    def test_missing_date_returns_400(self, client):
        resp = client.post("/api/reservations", json={
            "name": "Test User",
            "email": "test@example.com",
            "date": "",
            "time": "7:00 PM"
        })
        assert resp.status_code == 400

    def test_missing_time_returns_400(self, client):
        resp = client.post("/api/reservations", json={
            "name": "Test User",
            "email": "test@example.com",
            "date": future_date(),
            "time": ""
        })
        assert resp.status_code == 400

    def test_sunday_outside_hours_returns_400(self, client):
        resp = client.post("/api/reservations", json={
            "name": "Test User",
            "email": "test@example.com",
            "guest_count": 2,
            "date": next_sunday(),
            "time": "10:00 PM"
        })
        assert resp.status_code == 400
        assert "Sunday" in resp.json["error"]

    def test_empty_body_returns_400(self, client):
        resp = client.post("/api/reservations", json={})
        assert resp.status_code == 400

    def test_missing_guest_count_returns_400(self, client):
        resp = client.post("/api/reservations", json={
            "name": "Test User", "email": "guests@example.com", "date": future_date(), "time": "7:00 PM"
        })
        assert resp.status_code == 400
        assert "guests" in resp.json["error"]

    def test_invalid_guest_count_returns_400(self, client):
        resp = client.post("/api/reservations", json={
            "name": "Test User", "email": "many@example.com", "guest_count": 31, "date": future_date(), "time": "7:00 PM"
        })
        assert resp.status_code == 400

    def test_past_date_returns_400(self, client):
        resp = client.post("/api/reservations", json={
            "name": "Test User", "email": "past@example.com", "guest_count": 2, "date": "2020-01-01", "time": "7:00 PM"
        })
        assert resp.status_code == 400

    def test_non_json_body_returns_415(self, client):
        resp = client.post("/api/reservations", data="not json", content_type="text/plain")
        assert resp.status_code == 415

    def test_missing_csrf_token_returns_403(self, client):
        client.environ_base.pop("HTTP_X_CSRF_TOKEN")
        resp = client.post("/api/reservations", json={})
        assert resp.status_code == 403

    def test_newsletter_signup_on_reservation(self, client):
        resp = client.post("/api/reservations", json={
            "name": "Newsletter Test",
            "email": "newslettest@example.com",
            "guest_count": 2,
            "date": future_date(),
            "time": "6:00 PM",
            "newsletter": True
        })
        assert resp.status_code == 201


class TestNewsletterEndpoint:
    def test_subscribe_success(self, client):
        resp = client.post("/api/newsletter", json={
            "email": "newsubscriber@example.com"
        })
        assert resp.status_code in (200, 201)
        assert "message" in resp.json

    def test_invalid_email_returns_400(self, client):
        resp = client.post("/api/newsletter", json={
            "email": "bad-email"
        })
        assert resp.status_code == 400
        assert "error" in resp.json

    def test_missing_email_returns_400(self, client):
        resp = client.post("/api/newsletter", json={})
        assert resp.status_code == 400

    def test_already_subscribed_returns_200(self, client):
        client.post("/api/newsletter", json={"email": "dup@example.com"})
        resp = client.post("/api/newsletter", json={"email": "dup@example.com"})
        assert resp.status_code == 200
        assert "already subscribed" in resp.json["message"].lower()
