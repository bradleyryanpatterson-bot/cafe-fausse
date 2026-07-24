import os
import pytest

# Test-only key: production always obtains SECRET_KEY from its environment.
os.environ.setdefault("SECRET_KEY", "test-only-csrf-secret")
from app import app as flask_app


@pytest.fixture
def app():
    flask_app.config.update(
        TESTING=True,
        RATE_LIMIT_RESERVATIONS=1000,
        RATE_LIMIT_NEWSLETTER=1000,
    )
    yield flask_app


@pytest.fixture
def client(app):
    client = app.test_client()
    with client.session_transaction() as session:
        session["csrf_token"] = "test-csrf-token"
    client.environ_base["HTTP_X_CSRF_TOKEN"] = "test-csrf-token"
    return client


@pytest.fixture
def db_conn():
    import psycopg2
    from psycopg2.extras import RealDictCursor
    conn = psycopg2.connect(
        os.environ.get(
            "DATABASE_URL"
        ),
        cursor_factory=RealDictCursor,
    )
    yield conn
    conn.close()
