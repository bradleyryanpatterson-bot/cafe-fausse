# Café Fausse — Single Source of Truth (SSOT)

## 1. Purpose and authority

This document records the approved implementation decisions for Café Fausse. It prevents scope drift and clarifies how the application satisfies ambiguous or cross-cutting requirements.

Authority order:

1. `docs/SRS.md` — immutable functional and non-functional authority
2. `docs/PROJECT_INSTRUCTIONS.md` — submission and rubric authority
3. This SSOT — approved interpretation, implementation contract, and non-goals
4. Supporting design, test, and presentation documents

This SSOT never overrides the SRS. When an implementation decision conflicts with the SRS, the SRS wins and the implementation must change.

## 2. Approved architecture

| Layer | Approved decision |
|---|---|
| Frontend | React with JSX using Create React App, matching course learning materials |
| Pages | Five distinct routes: Home, Menu, Reservations, About Us, Gallery |
| Backend | Flask REST API |
| Persistence | PostgreSQL |
| Browser/API | HTTPS/HTTP JSON API; public write endpoints use session-bound CSRF tokens |
| Configuration | Runtime environment variables only; no credentials or secret values in source |

## 3. Data model and relational integrity

The SRS-required schema consists only of `customers` and `reservations`.

The course-facing artifacts are [entity_diagram.md](entity_diagram.md) and [data_dictionary.md](data_dictionary.md). `schema.sql` remains the executable database authority.

```text
customers (1) ────< reservations (many)
```

| Table | Approved columns / role |
|---|---|
| `customers` | `customer_id`, customer name, unique normalized email, optional phone, newsletter boolean |
| `reservations` | `reservation_id`, `customer_id` foreign key, time slot, table number |

PostgreSQL is the final integrity authority:

- `customer_email` is `UNIQUE` and `NOT NULL`.
- `customer_id` on reservations is a foreign key to customers.
- `table_number` is constrained to 1–30.
- `UNIQUE(time_slot, table_number)` prevents the same table from being reserved twice at the same time.

`schema.sql` contains destructive reset statements and is development/demo setup only, never a production migration mechanism.

## 4. Reservation lifecycle and validation ownership

| Rule | Frontend | Flask API | PostgreSQL | Approved interpretation |
|---|---:|---:|---:|---|
| Select a restaurant-local date/time | Guides user; fallback options preserve the selected day's hours if the availability request fails | Validates format, future date, and hours | Stores time slot | Times are Washington, DC / Eastern Time; the current SRS schema uses a timezone-naive timestamp |
| Show availability | Requests after date selection | Counts reservations per slot | Source of reservation records | Display is advisory and can become stale |
| Confirm availability | — | Rechecks immediately before insert | Enforces final unique table/slot fact | Database wins during concurrent submissions |
| Guest count | Requires explicit choice 1–30 | Rejects 0, negatives, non-integers, and values over 30 | Not stored | FR-6 requires input; FR-17 does not define a database column |
| Name, email, phone | Guides user | Validates format/length | Unique customer email | Email is lowercased before lookup/storage |
| Newsletter preference | Checkbox | Validates boolean and persists it | Boolean `NOT NULL DEFAULT FALSE` | Repeated newsletter signup is idempotent |
| CSRF protection | Fetches/sends token | Requires valid token for POST | — | Session-bound token is returned by `GET /api/csrf-token` |

### Reservation transaction boundary

A reservation write is one database transaction: determine an available table, locate or create the customer, and insert the reservation. If the insert cannot satisfy the table/time constraint, the transaction rolls back and the API returns a safe conflict response.

### Time and seating assumptions

- All displayed reservation times are Café Fausse local time: Washington, DC / Eastern Time.
- Guest count does **not** influence table assignment. The SRS defines only a fixed pool of 30 numbered tables; it provides no capacity, layout, combination, or seating rules.
- The app intentionally does not assume two guests. A solo diner is valid; users must deliberately select their party size.

## 5. API and security contract

| Endpoint | Contract |
|---|---|
| `GET /api/health` | Service health response |
| `GET /api/csrf-token` | Creates/returns session-bound CSRF token |
| `GET /api/reservations/availability?date=YYYY-MM-DD` | Returns currently available operating-hour slots |
| `POST /api/reservations` | CSRF-protected JSON request; validates booking and returns assigned table or safe error |
| `POST /api/newsletter` | CSRF-protected JSON request; creates/updates subscription idempotently |

| Status | Meaning |
|---|---|
| `400` | Invalid booking or request field |
| `403` | Missing/invalid CSRF token |
| `409` | Booking conflict or fully booked slot |
| `415` | Request is not JSON |
| `429` | Local rate limit reached |
| `503` | Reservation/newsletter write cannot be processed due to database failure |

Security baseline:

- Parameterized psycopg2 SQL only; no dynamically assembled SQL.
- React’s escaped rendering only; no raw user/API HTML rendering.
- JSON-only write requests, request-size limit, local rate limits, restricted CORS, and security response headers.
- Runtime configuration names may be documented; values never appear in source, screenshots, or presentation: `DATABASE_URL`, `SECRET_KEY`, `CORS_ORIGINS`, `FLASK_DEBUG`, and rate/body settings.
- Stored PII is limited to name, email, optional phone, and newsletter preference. No authentication passwords, payment data, or customer accounts exist.
- User-facing errors explain recovery without exposing stack traces, database details, configuration, or credentials.

## 6. Deliberate non-goals

The following are realistic restaurant capabilities but are intentionally excluded because the SRS does not require them:

- Odd table shapes, capacities, seating plans, table combinations/splits, or dynamic inventory
- Reservation editing, cancellation, waitlists, durations, turnover logic, seating optimization, or administration tools
- Reservation idempotency keys. The UI prevents an accidental double-click while a request is pending; a replayed valid request can create a separate valid reservation on another table.
- Authentication, customer accounts, roles, payments, menu management, analytics, and multi-location support
- Persistent guest count or a separate newsletter table

## 7. Change-control and verification rule

Any future change must preserve SRS traceability, this schema contract, the API/security contract, and the five-page user experience. Verify affected frontend behavior, API validation, and the database integrity query for duplicate `(time_slot, table_number)` values. Detailed test results and the demo sequence remain in their dedicated documents, not in this SSOT.
