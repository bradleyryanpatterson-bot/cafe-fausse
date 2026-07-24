import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from routes.reservations import reservations_bp
from routes.newsletter import newsletter_bp
from security import issue_csrf_token

load_dotenv()

app = Flask(__name__)
secret_key = os.environ.get("SECRET_KEY")
if not secret_key:
    raise RuntimeError("SECRET_KEY must be configured before starting the API.")
app.config["SECRET_KEY"] = secret_key
app.config.update(
    MAX_CONTENT_LENGTH=int(os.environ.get("MAX_CONTENT_LENGTH", "16384")),
    RATE_LIMIT_WINDOW_SECONDS=int(os.environ.get("RATE_LIMIT_WINDOW_SECONDS", "60")),
    RATE_LIMIT_RESERVATIONS=int(os.environ.get("RATE_LIMIT_RESERVATIONS", "10")),
    RATE_LIMIT_NEWSLETTER=int(os.environ.get("RATE_LIMIT_NEWSLETTER", "5")),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=os.environ.get("SESSION_COOKIE_SECURE", "false").lower() == "true",
)

allowed_origins = [
    origin.strip()
    for origin in os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]
CORS(
    app,
    resources={r"/api/*": {"origins": allowed_origins}},
    methods=["GET", "POST"],
    allow_headers=["Content-Type", "X-CSRF-Token"],
    supports_credentials=True,
    max_age=600,
)

app.register_blueprint(reservations_bp, url_prefix="/api")
app.register_blueprint(newsletter_bp, url_prefix="/api")


@app.route("/api/health")
def health():
    return {"status": "ok"}


@app.route("/api/csrf-token", methods=["GET"])
def csrf_token():
    return jsonify({"csrf_token": issue_csrf_token()})


@app.after_request
def add_security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Content-Security-Policy"] = (
        "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
    )
    if not app.debug:
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(host=os.environ.get("HOST", "127.0.0.1"), port=port, debug=debug)
