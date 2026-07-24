"""Database connection configuration. Credentials are supplied at runtime."""

import os

import psycopg2
from psycopg2.extras import RealDictCursor


def get_db():
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL must be configured before starting the API.")
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)
