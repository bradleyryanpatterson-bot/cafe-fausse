 Café Fausse — Web Application

> **Authority:** All requirements are grounded in the Software Requirements Specification (SRS) and Project Instructions documents.

---

## Overview

Café Fausse is a responsive, full-stack web application for a fine-dining restaurant, built for the Quantic MSAIE Web Application & Interface Design project.

- **Frontend:** React (JSX) via Create React App
- **Backend:** Flask (Python)
- **Database:** PostgreSQL

---

## Tech Stack

| Component | Technology | SRS Reference |
|---|---|---|
| Frontend | React with JSX | SRS §2.4, §3.3.2 |
| CSS | Flexbox or Grid | SRS §2.4, §3.3.1 |
| Backend | Flask (Python) | SRS §2.4, §3.3.2 |
| Database | PostgreSQL | SRS §2.4, §3.3.2 |
| Protocol | HTTP/HTTPS, RESTful API | SRS §3.3.3 |

---

## Project Structure

```text
cafe-fausse-v2/
├── backend/
│   ├── app.py                 # Flask application entry point
│   ├── conftest.py            # Pytest fixtures
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── reservations.py    # /api/reservations endpoints
│   │   └── newsletter.py      # /api/newsletter endpoint
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_api.py        # API validation and security tests
│   ├── .env.example           # Safe environment-variable template
│   ├── .env                   # Local secret; never commit
│   ├── requirements.txt       # Python dependencies
│   └── .venv/                 # Virtual environment
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx     # Shared header with nav
│   │   │   ├── Footer.jsx     # Shared footer
│   │   │   ├── ReservationForm.jsx  # Reservation form with validation
│   │   │   ├── NewsletterSignup.jsx # Newsletter signup form
│   │   │   └── __tests__/
│   │   │       ├── Header.test.js
│   │   │       ├── Footer.test.js
│   │   │       ├── ReservationForm.test.js
│   │   │       └── NewsletterSignup.test.js
│   │   ├── App.js             # Main app with all sections
│   │   ├── App.css            # Global styles
│   │   ├── App.test.js        # App-level tests
│   │   └── index.js           # Entry point (CRA)
│   ├── public/
│   │   └── images/            # Restaurant images (webp)
│   └── package.json
├── docs/
│   ├── SRS.md                      # Software Requirements Specification (verbatim)
│   ├── PROJECT_INSTRUCTIONS.md     # Project brief and rubric (verbatim)
│   ├── requirements_traceability.md # FR/NFR traceability matrix
│   ├── functional_requirements.md  # Functional/non-functional requirements
│   ├── database_design.md          # Database design grounded in SRS
│   ├── schema.sql                  # PostgreSQL DDL
│   ├── seed.sql                    # Sample data (20 customers, 14 reservations)
│   ├── user_stories.md             # 14 user stories
│   ├── user_journeys.md            # 4 Mermaid journey maps
│   ├── design_standards.md         # UX/accessibility/error patterns
│   └── ai-tooling.md               # AI tooling documentation
├── README.md
└── ai-tooling.md
```

---

## Setup & Run (Local)

### 1. PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE cafe_fausse;

# Load schema
\i docs/schema.sql
#\i 'c:/users/brad/cafe-fausse-v2/docs/schema.sql'

# Seed sample data
\i docs/seed.sql

# Verify
SELECT COUNT(*) FROM customers;
SELECT COUNT(*) FROM reservations;
```

### 2. Backend (Terminal 1)

```bash
cd \users\brad\cafe-fausse-v2\backend
python3 -m venv .venv
source .venv/bin/activate
#.venv\scripts\activate for windows
export PATH="/Library/PostgreSQL/18/bin;$PATH"  # Required for psycopg2
#set PATH="c:\program files\Postgresql\18\bin":%PATH% for windows
pip install -r requirements.txt
pip install psycopg2-binary --prefer-binarycp 
cp .env.example .env
# Edit .env and supply a least-privilege DATABASE_URL for your local database.
#copy .env.example.env for windows
pip install flask
pip install flask-cors
pip install python-dotenv
python app.py
```

The API will be available at `http://localhost:5001`.

### 3. Frontend (Terminal 2)

```bash
cd \users\brad\cafe-fausse-v2\frontend
npm install
npm start
```

The React dev server runs at `http://localhost:3000`.

Open `http://localhost:3000` in your browser.

---

## API Endpoints

| Method | Endpoint | Body | Response | SRS Ref |
|--------|----------|------|----------|---------|
| GET | `/api/health` | — | `{"status": "ok"}` | — |
| GET | `/api/reservations/availability?date=YYYY-MM-DD` | — | `{available_slots: [...]}` | FR-18 |
| POST | `/api/reservations` | `{name, email, phone, guest_count, date, time, newsletter}` | `{reservation_id, table_number}` | FR-6, FR-18 |
| POST | `/api/newsletter` | `{email}` | `{message}` | FR-15 |

---

## Running Tests

### Backend Tests

```bash
cd backend
source .venv/bin/activate
export PATH="/Library/PostgreSQL/18/bin:$PATH"
python -m pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend
CI=true npm test
```

---

## Key Requirements

### Operating Hours (SRS FR-2)
| Day | Hours |
|---|---|
| Monday – Saturday | 5:00 PM – 11:00 PM |
| Sunday | 5:00 PM – 9:00 PM |

### Contact Information (SRS FR-2)
| Field | Value |
|---|---|
| Address | 1234 Culinary Ave, Suite 100, Washington, DC 20002 |
| Phone | (202) 555-4567 |

### Database Schema (SRS FR-17)
- **Customers:** customer_id, customer_name, customer_email, phone_number, newsletter_signup
- **Reservations:** reservation_id, customer_id, time_slot, table_number

### Reservation System (SRS FR-18)
- Insert new customer records
- Check table availability for selected time slot
- Assign random table from 30 available
- Return confirmation or error messages
- Validate guest count (1–30) at the client and API; it is intentionally not persisted because FR-17 specifies the reservation-table columns exactly

### Design Standards (Quantic MSAIE-Grounded)
- **UX:** Jakob's 10 Usability Heuristics applied to every screen
- **Accessibility:** WCAG 2.1 AA compliance (semantic HTML, ARIA labels, keyboard nav)
- **Error Handling:** Precise, non-blaming, fix-suggestive error messages
- **Responsive:** Mobile-first with breakpoints at 768px and 480px
- See [`docs/design_standards.md`](docs/design_standards.md) for full details

### Security & Self-Hosting

- Secrets are runtime configuration only; no database credential is hard-coded in application code.
- The Flask API validates all inputs, accepts JSON only for writes, uses parameterized SQL, limits request bodies, rate-limits public writes, restricts CORS, and sets security headers.
- Forms obtain a session-bound CSRF token from the API and must send it in an `X-CSRF-Token` header for each POST request.
- Use a production WSGI server and HTTPS reverse proxy for deployment; do not expose Flask debug mode.
- The database setup SQL drops tables and is for a disposable development database only.
- See [`docs/security.md`](docs/security.md) for deployment controls and limits.

---

## Demo Verification

To verify the database during the presentation:

```sql
-- Check customers
SELECT customer_id, customer_name, customer_email, newsletter_signup
FROM customers ORDER BY customer_id;

-- Check reservations
SELECT r.reservation_id, c.customer_name, r.time_slot, r.table_number
FROM reservations r
JOIN customers c ON r.customer_id = c.customer_id
ORDER BY r.time_slot;

-- Verify no overbooking
SELECT time_slot, COUNT(*) as tables_booked
FROM reservations
GROUP BY time_slot
HAVING COUNT(*) > 30;
```

---

## Submission Requirements

- **Video Recording:** 5-10 minute demo via Google Drive link
- **PDF:** GitHub repository link
- **GitHub Repo:** Must contain:
  - All source code (frontend and backend)
  - `README.md` (this file)
  - `ai-tooling.md`
  - Add "quantic-grader" as collaborator

---

## AI Tooling

See [`ai-tooling.md`](ai-tooling.md) for a summary of AI tools used in developing this solution.
