# Café Fausse — Security & Self-Hosted Deployment Standard

## Security posture

Café Fausse is a public, self-hosted restaurant application. The booking and newsletter endpoints are intentionally public; they do **not** use a browser-visible API key, because a client-side key cannot be kept secret. Database credentials are server-only secrets supplied through `DATABASE_URL`.

## Required configuration

1. Copy `backend/.env.example` to `backend/.env` for local development.
2. Set a unique PostgreSQL application-user credential in `DATABASE_URL`; do not use a superuser.
3. Generate `SECRET_KEY` with the command in `.env.example`, then add it to local `.env`. Do not commit `.env`; `backend/.gitignore` excludes it.
4. In production, inject secrets through the hosting environment or secret manager. Set `FLASK_DEBUG=false`, an HTTPS deployment origin in `CORS_ORIGINS`, and use a production WSGI server/reverse proxy.
5. Run the destructive development schema only against a disposable development database. It drops both application tables.

## Controls implemented

- Parameterized psycopg2 queries protect database calls from SQL injection.
- React renders user/API text as escaped text; the project does not use raw HTML injection APIs.
- The API validates JSON content type, body shape, name, email, phone, guest count, future date, time format, operating hours, and newsletter boolean values.
- The API issues a session-bound CSRF token at `GET /api/csrf-token`. Both frontend forms must include that value in the `X-CSRF-Token` header for POST requests; missing or mismatched tokens receive `403`.
- Request bodies are limited to 16 KiB by default. Reservation and newsletter endpoints have configurable per-IP, per-process rate limits.
- CORS is limited to configured origins and API methods. Security response headers prohibit framing and MIME sniffing, restrict referrers and browser permissions, and add HSTS outside debug mode.
- Database constraints prevent a table from being reserved twice at the same time. A constraint collision returns a safe booking response rather than a raw database error.

## Operational limits

The included rate limiter is in-memory and fits one local self-hosted process. TLS, OS patching, PostgreSQL backups, least-privilege database roles, and dependency scanning remain deployment responsibilities.

## Dependency posture

`react-scripts` 5 brings transitive audit findings. Do not use `npm audit fix --force`: its proposed resolution is breaking. Migrate the frontend build tooling to a maintained bundler in a separately tested change before internet exposure.
