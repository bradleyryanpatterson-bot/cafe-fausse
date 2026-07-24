# Café Fausse — 8½-Minute Presentation Script

> **Goal:** Demonstrate the rubric requirements, the working full-stack flow, data persistence, design decisions, security/validation, and tests. Keep the browser, Flask terminal, and PostgreSQL terminal prepared before recording. Never display `.env` or credentials.

## Pre-setup

1. Start PostgreSQL and load the development database.
2. In `backend/.env`, configure `DATABASE_URL` and a generated `SECRET_KEY`; keep this file off screen.
3. Start Flask on port 5001 and React on port 3000.
4. Open the browser at the Home page, a terminal at the backend test command, and a terminal at `psql`.

## 0:00–0:30 — Opening and scope

> “Hi, I’m [Name]. This is Café Fausse, a responsive full-stack restaurant application built with React and JSX, a Flask API, and PostgreSQL. I’ll show the required pages, a real reservation and newsletter flow, the database records created by those interactions, plus the design, validation, testing, and security decisions behind them.”

## 0:30–1:45 — Five-page experience and navigation

**Show:** Home page, then use the header to visit Menu, Reservations, About Us, Gallery, and back Home.

> “The site has five distinct pages, each with shared navigation and a consistent responsive visual system. The Home page presents the restaurant identity and reservation call to action. The header indicates the active page and collapses for smaller screens.”

> “The Menu page implements the exact SRS menu: four categories and eleven specified dishes, descriptions, and prices.”

> “The About page includes the required founding story—Chef Antonio Rossi and Maria Lopez—plus the mission, hospitality focus, excellent food, and locally sourced ingredients.”

> “The Gallery includes interior, dish, and event imagery. Selecting an image opens a keyboard-accessible lightbox; Escape closes it. The required awards and customer reviews appear below.”

## 1:45–3:25 — Reservation flow: human interaction and validation

**Show:** Reservations page. First demonstrate one client-side error, then complete a valid booking.

> “The reservation form collects the SRS-required name, email, optional phone, date, time, and number of guests. Guest count is validated from one to thirty, but deliberately not stored because the required reservation schema defines its columns exactly.”

**Show:** Submit an empty or malformed email field.

> “The interface gives immediate, specific, non-blaming feedback. These visible checks improve the experience, but the server repeats all critical validation because browser validation can be bypassed.”

**Enter:** Name `John Smith`; email `john@example.com`; guests `2`; future date; available time; optionally check newsletter.

> “After selecting a date, the form requests available times from Flask. On submission, the application obtains a session-bound CSRF token and sends it with the request. Flask validates the JSON body, email, phone, guest count, future date, and operating hours; then it checks availability and assigns one random table from the thirty-table pool.”

**Submit and show confirmation.**

> “The confirmation shows the assigned table and requested time. If all tables are occupied, the customer receives a clear alternative-time message.”

## 3:25–4:10 — Newsletter flow

**Show:** Home page newsletter. Submit an invalid email, then a valid email.

> “Newsletter signup uses the same interaction pattern: clear format validation, a CSRF-protected POST, and a success or user-friendly error message. Duplicate signup is handled gracefully rather than creating duplicate customer records.”

## 4:10–5:20 — PostgreSQL persistence and integrity

**Switch to `psql`; run:**

```sql
SELECT customer_id, customer_name, customer_email, phone_number, newsletter_signup
FROM customers
ORDER BY customer_id DESC
LIMIT 5;

SELECT r.reservation_id, c.customer_name, r.time_slot, r.table_number
FROM reservations r
JOIN customers c ON r.customer_id = c.customer_id
ORDER BY r.reservation_id DESC
LIMIT 5;

SELECT time_slot, table_number, COUNT(*)
FROM reservations
GROUP BY time_slot, table_number
HAVING COUNT(*) > 1;
```

> “These are the records created from the browser. The database uses two SRS-aligned tables: Customers and Reservations. The relationship is one customer to many reservations through a foreign key. The final query should return no rows, because a unique constraint prevents the same table being booked twice for the same time slot.”

## 5:20–6:20 — Design and engineering choices

**Show:** `docs/database_design.md` and `docs/design_standards.md` briefly.

> “The design began with requirements, then a relational model, then PostgreSQL and the API. The schema stays intentionally small: no invented status column, no extra tables inventory, no newsletter table, and no persisted guest-count column outside the specification.”

> “For human-centered design, I applied consistent navigation, labeled inputs, inline recovery guidance, responsive grids, semantic headings, focus states, ARIA relationships for errors, and a keyboard-operable gallery dialog. These choices support usability and accessibility rather than treating them as decoration.”

## 6:20–7:30 — Security and API validation

**Show:** `docs/security.md` or the relevant route files; do not show secret values.

> “Although this is a local learning application, the API uses production-minded boundaries. Database credentials and the Flask secret key come from runtime environment configuration, never hard-coded source. SQL is parameterized to prevent injection. React avoids raw HTML rendering, so user/API text is escaped by default.”

> “POST requests require JSON, a session-bound CSRF token, and server-side validation. The API also limits request size, applies local rate limits, restricts CORS to configured origins, and sends browser security headers. Reservation and newsletter write failures return safe messages instead of internal details.”

## 7:30–8:10 — Testing and validation

**Run:**

```bash
cd backend && source .venv/bin/activate && python -m pytest tests/ -v
```

**Show:** Frontend test command/result if already run locally.

```bash
cd frontend && CI=true npm test -- --watchAll=false
```

> “The backend tests cover normal reservations, malformed input, guest-count and past-date validation, operating hours, newsletter behavior, CSRF rejection, and security headers. Frontend tests cover shared navigation, form fields, page content, and gallery-lightbox interaction. I also verify the full browser-to-database path manually, because that is the rubric’s core integration requirement.”

## 8:10–8:30 — AI tooling and close

**Show:** `ai-tooling.md`.

> “The AI-tooling documentation records how AI assisted requirements extraction, documentation, implementation, testing, and the final security review. Every output was checked against the SRS; the SRS remained the source of truth.”

> “Café Fausse therefore meets the core project requirements: five React pages, a Flask and PostgreSQL reservation system, newsletter persistence, responsive accessible interaction, validation and data-integrity controls, test coverage, and demonstrable database effects. Thank you.”
