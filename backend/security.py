"""Small, dependency-free security helpers for the public API."""

from collections import defaultdict, deque
from secrets import compare_digest, token_urlsafe
from functools import wraps
from threading import Lock
from time import monotonic

from flask import current_app, jsonify, request, session


class InMemoryRateLimiter:
    """Per-process rate limiter appropriate for a single self-hosted instance.

    A shared store (such as Redis) is required if the application is scaled to
    multiple workers or hosts.
    """

    def __init__(self):
        self._hits = defaultdict(deque)
        self._lock = Lock()

    def allow(self, key, limit, window_seconds):
        now = monotonic()
        with self._lock:
            hits = self._hits[key]
            while hits and now - hits[0] >= window_seconds:
                hits.popleft()
            if len(hits) >= limit:
                return False
            hits.append(now)
            return True


rate_limiter = InMemoryRateLimiter()


def issue_csrf_token():
    """Create one session-bound token for the browser to echo on unsafe requests."""
    token = session.get("csrf_token")
    if not token:
        token = token_urlsafe(32)
        session["csrf_token"] = token
    return token


def require_csrf(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        expected = session.get("csrf_token", "")
        supplied = request.headers.get("X-CSRF-Token", "")
        if not expected or not supplied or not compare_digest(expected, supplied):
            return jsonify({"error": "Invalid or missing CSRF token."}), 403
        return view(*args, **kwargs)

    return wrapped


def require_json(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json."}), 415
        data = request.get_json(silent=True)
        if not isinstance(data, dict):
            return jsonify({"error": "Request body must be a JSON object."}), 400
        return view(data, *args, **kwargs)

    return wrapped


def rate_limit(bucket):
    config_key = f"RATE_LIMIT_{bucket.upper()}"

    def decorator(view):
        @wraps(view)
        def wrapped(*args, **kwargs):
            limit = current_app.config[config_key]
            window = current_app.config["RATE_LIMIT_WINDOW_SECONDS"]
            client_ip = request.remote_addr or "unknown"
            if not rate_limiter.allow((bucket, client_ip), limit, window):
                response = jsonify({"error": "Too many requests. Please try again shortly."})
                response.status_code = 429
                response.headers["Retry-After"] = str(window)
                return response
            return view(*args, **kwargs)

        return wrapped

    return decorator
