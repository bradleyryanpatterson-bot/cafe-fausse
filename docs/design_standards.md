# Café Fausse Design & Engineering Standards

**Grounded in:** Quantic MSAIE Web Application & Interface Design course materials, SRS (v1.0.0), SSOT v2

---

## Table of Contents

1. [Jakob's 10 Usability Heuristics](#1-jakobs-10-usability-heuristics)
2. [5 Aspects of Interaction Design](#2-5-aspects-of-interaction-design)
3. [Error Handling Principles](#3-error-handling-principles)
4. [Accessibility Requirements](#4-accessibility-requirements)
5. [Tooltip Strategy](#5-tooltip-strategy)
6. [Form Design Patterns](#6-form-design-patterns)
7. [Frontend Design Patterns](#7-frontend-design-patterns)
8. [Backend Architecture Patterns](#8-backend-architecture-patterns)
9. [Database Design Standards](#9-database-design-standards)
10. [Responsive Design](#10-responsive-design)

---

## 1. Jakob's 10 Usability Heuristics

> Reference: Quantic MSAIE – UX & Interaction Design module → "Jakob's 10 Usability Heuristics"

Every screen in the Café Fausse application must be auditable against these ten principles.

### 1.1 Visibility of System Status
- **SRS FR-18:** Reservation form must show feedback within **5 seconds**
- **SRS NFR-3:** Pages must load in under **3 seconds** on standard hardware
- **SRS NFR-6:** Confirmation/error messages must appear **within 2 seconds**
- **Implementation:** Loading spinners for async operations (reservation submission, newsletter signup); disabled submit buttons during submission; status messages with explicit success/error states

### 1.2 Match Between System and Real World
- **SRS FR-2:** Operating hours, phone, and address must be **accurate** — not fabricated
- Use language customers understand (e.g., "Dinner" not "Meal Period 1")
- **SRS FR-6:** "About Us" must use **consistent voice and style**

### 1.3 User Control and Freedom
- "Clear" / "Reset" buttons on all forms (SRS FR-18)
- Navigation links on every page (SRS FR-12, FR-13)
- Back button / breadcrumb support

### 1.4 Consistency and Standards
- **SRS FR-4:** "The application should be written in HTML, CSS, and JavaScript."
- **SRS FR-12/13:** All pages share the same nav bar, hero, footer
- Consistent button styles, spacing, and color across all pages
- **SRS NFR-1:** Cross-browser compatibility

### 1.5 Error Prevention
- Input validation on both frontend (real-time) and backend (on submit)
- Phone number format hint before user types
- Email format validation inline
- Time slot selector prevents invalid combinations
- **SRS FR-18:** Check table availability before confirming

### 1.6 Recognition Rather Than Recall
- Display operating hours on every relevant screen
- Pre-fill reservation form with detected time slot (if user clicked from "Make a Reservation")
- Show table availability status before submission
- Use familiar icons (clock for hours, phone for contact, calendar for reservations)

### 1.7 Flexibility and Efficiency of Use
- **SRS NFR-2:** "User interface shall be simple and intuitive"
- One-click reservation for returning users (if email already in DB)
- Newsletter checkbox pre-checked on reservation form for efficiency

### 1.8 Aesthetic and Minimalist Design
- **SRS FR-3:** "The homepage shall display the restaurant's interior image"
- **SRS FR-6:** "Minimalist, elegant design"
- No clutter — every element has a purpose
- Visual hierarchy: hero → content → footer

### 1.9 Help Users Recognize, Diagnose, and Recover from Errors
- **SRS FR-18:** "If a time slot is unavailable, display an error message"
- **SRS NFR-6:** Error messages within 2 seconds
- **SRS NFR-8:** "Display clear error messages with suggested solutions"
- Specific error text: "That time slot is unavailable. Please choose another."
- Not: "Error 400" or "Something went wrong"

### 1.10 Help and Documentation
- **SRS FR-2:** Contact information readily accessible
- **SRS FR-7:** "Contact information must be accurate"
- Tooltips explaining complex fields (e.g., "Choose an available start time during our operating hours")

---

## 2. 5 Aspects of Interaction Design

> Reference: Quantic MSAIE – Interaction Design module → "5 Aspects of Interaction Design"

### 2.1 Users (Who?)
- **Persona 1:** Alex – new diner wanting to reserve (FR-18)
- **Persona 2:** Jamie – returning customer signing up for newsletter (FR-15)
- **Persona 3:** Sam – grader evaluating technical implementation
- All users should find the interface intuitive without instructions

### 2.2 Tasks (What?)
- Browse menu (FR-10)
- Make a reservation (FR-18)
- Subscribe to newsletter (FR-15)
- Find contact info (FR-2, FR-7)
- View about us (FR-6)
- View gallery (FR-9)

### 3.3 Appearance (How should it look?)
- **SRS FR-6:** "Elegant visual design consistent with upscale dining"
- **Color palette:**
  - Primary: Deep emerald green (#2d5016) — elegance, fine dining
  - Secondary: Warm gold (#d4a574) — luxury accent
  - Accent: Cream (#f5f0e6) — soft, inviting
  - Text: Dark charcoal (#2c2c2c) — readability
  - Background: White (#ffffff) — clean, minimal
- **Typography:**
  - Headings: Playfair Display (serif) — elegance
  - Body: Inter (sans-serif) — readability
- **Imagery:** Restaurant interior hero, food gallery, elegant food icons

### 4.4 Behavior (How should it work?)
- Smooth transitions between sections (CSS transitions, not page reloads)
- Form submissions with loading states
- Hover effects on buttons and links
- Scroll-triggered animations for gallery

### 4.5 Feel (How should it feel?)
- Premium, calm, trustworthy
- No jarring animations or loud colors
- Confidence-inspiring feedback (success checkmarks, clear confirmations)

---

## 3. Error Handling Principles

> Reference: Quantic MSAIE – Events and Forms module → "Error Handling Patterns"

### 3.1 Core Principle: Errors Are UX Events, Not Exceptions

> "Errors aren't bugs — they are part of the UX."

### 3.2 Five Principles

| Principle | Implementation |
|-----------|---------------|
| **Be precise** | "Invalid email format" not "Invalid input" |
| **Don't blame the user** | "That time slot is full" not "You selected wrong" |
| **Suggest a fix** | "Try 6:00 PM or 7:00 PM" when 5:00 PM is full |
| **Be consistent** | Same error styling across all forms |
| **Don't expose internals** | Never show stack traces or SQL errors |

### 3.3 Error Display Strategy

```
┌─────────────────────────────────────────┐
│ ⚠️  That time slot is unavailable.     │
│     Please choose another time.         │
│     Available: 6 PM, 7 PM, 8 PM        │
└─────────────────────────────────────────┘
```

- Inline error messages below each field (not alert boxes)
- Red border on invalid field
- Error icon + text in consistent color (#dc3545)
- Success messages in green (#28a745)
- Toast notifications for transient messages (reservation confirmed, newsletter subscribed)

### 3.4 Error Types

| Type | Example | Handling |
|------|---------|----------|
| **Validation** | Missing name, bad email | Inline, per-field |
| **Availability** | Time slot taken | Suggest alternatives |
| **Server** | API down | Friendly fallback message |
| **Network** | No connection | "Check your connection and try again" |

---

## 4. Accessibility Requirements

> Reference: Quantic MSAIE – Events and Forms module → "Accessibility Guidelines"

### 4.1 WCAG 2.1 AA Compliance

| Guideline | Implementation |
|-----------|---------------|
| **Color contrast** | All text passes 4.5:1 ratio minimum |
| **Keyboard navigation** | All interactive elements focusable via Tab |
| **Screen readers** | ARIA labels on all form fields and buttons |
| **Alt text** | All images have descriptive alt text |
| **Semantic HTML** | Use `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>` |
| **Focus indicators** | Visible focus rings on all interactive elements |
| **Form labels** | Every input has an associated `<label>` |

### 4.2 Semantic Structure

```html
<header role="banner">
  <nav aria-label="Main navigation">...</nav>
</header>
<main role="main">
  <section aria-labelledby="reservations-heading">
    <h2 id="reservations-heading">Make a Reservation</h2>
    <form aria-label="Reservation form">...</form>
  </section>
</main>
<footer role="contentinfo">...</footer>
```

### 4.3 Form Accessibility

```html
<label for="customer-name">Full Name *</label>
<input
  id="customer-name"
  type="text"
  required
  aria-required="true"
  aria-describedby="name-help"
  autocomplete="name"
/>
<span id="name-help">Enter your full name as it appears on your ID.</span>
```

---

## 5. Tooltip Strategy

> Reference: Quantic MSAIE – Events and Forms module → "Tooltips"

### 5.1 When to Use Tooltips

| Context | Tooltip Content |
|---------|----------------|
| Time Slot selector | "Choose an available start time during our operating hours." |
| Phone number field | "Format: (555) 555-5555" |
| Newsletter checkbox | "We'll send you monthly updates about events and specials." |
| Table number display | "Your table will be assigned upon arrival." |
| Gallery images | Brief description of the dish or scene |

### 5.2 Tooltip Design Rules

- Appear on hover (desktop) and tap (mobile)
- Position: above or below the element (not covering content)
- Max width: 250px
- Background: dark (#333) with white text
- Dismissable: disappear on mouse leave
- Not critical info — tooltips supplement, don't replace labels

---

## 6. Form Design Patterns

> Reference: Quantic MSAIE – Events and Forms module → "Forms and Events"
> Reference: Quantic MSAIE – Backends module → "Handling Forms with Flask"

### 6.1 Reservation Form

```
┌─────────────────────────────────────────┐
│         Make a Reservation              │
│                                         │
│  Full Name *                            │
│  ┌─────────────────────────────┐        │
│  │                             │        │
│  └─────────────────────────────┘        │
│                                         │
│  Email Address *                        │
│  ┌─────────────────────────────┐        │
│  │                             │        │
│  └─────────────────────────────┘        │
│                                         │
│  Phone Number                           │
│  ┌─────────────────────────────┐        │
│  │                             │        │
│  └─────────────────────────────┘        │
│                                         │
│  Preferred Date *                       │
│  ┌─────────────────────────────┐        │
│  │                             │        │
│  └─────────────────────────────┘        │
│                                         │
│  Preferred Time *                       │
│  ┌─────────────────────────────┐        │
│  │  5:00 PM  ▼                 │        │
│  └─────────────────────────────┘        │
│  ℹ️ Reservations are in 2-hour blocks   │
│                                         │
│  ☐ Sign me up for the newsletter        │
│  ℹ️ Monthly updates about events        │
│                                         │
│  [Submit Reservation]                   │
│                                         │
│  ✅ Reservation confirmed! Table #12    │
│     See you on July 20 at 6:00 PM       │
└─────────────────────────────────────────┘
```

### 6.2 Newsletter Signup Form

```
┌─────────────────────────────────────────┐
│    Subscribe to Our Newsletter          │
│                                         │
│  Email Address *                        │
│  ┌─────────────────────────────┐        │
│  │                             │        │
│  └─────────────────────────────┘        │
│                                         │
│  [Subscribe]                            │
│                                         │
│  ✅ You're subscribed! Welcome aboard.  │
└─────────────────────────────────────────┘
```

### 6.3 Validation Rules

| Field | Required | Format | Error Message |
|-------|----------|--------|---------------|
| Full Name | Yes | Alpha + spaces | "Please enter your full name." |
| Email | Yes | user@domain.ext | "Please enter a valid email address." |
| Phone | No | (XXX) XXX-XXXX | "Please enter a valid phone number." |
| Date | Yes | Future date | "Please select a future date." |
| Time | Yes | 5-9 PM (Sun), 5-11 PM (Mon-Sat) | "Please select a valid time slot." |
| Number of Guests | Yes | Integer 1–30; validated but not persisted | "Please select between 1 and 30 guests." |

---

## 7. Frontend Design Patterns

> Reference: Quantic MSAIE – Frontend Libraries module → "Frontend Frameworks and Libraries" (React)
> Reference: Quantic MSAIE – Frontend Libraries module → "Import/Export"

### 7.1 Component Architecture

```
src/
├── components/
│   ├── Header.jsx          # Shared header with nav (FR-12)
│   ├── Footer.jsx          # Shared footer (FR-13)
│   ├── ReservationForm.jsx # FR-18: reservation form
│   ├── NewsletterSignup.jsx # FR-15: newsletter form
│   ├── MenuDisplay.jsx     # FR-10: menu display
│   ├── GallerySection.jsx  # FR-9: image gallery
│   ├── ContactSection.jsx  # FR-7: contact info
│   ├── AboutSection.jsx    # FR-6: about us
│   ├── HoursDisplay.jsx    # FR-2: operating hours
│   ├── Toast.jsx           # Success/error notifications
│   └── Tooltip.jsx         # Reusable tooltip
├── App.jsx                 # Main app, routing
├── index.js                # Entry point (CRA default)
└── styles/
    └── global.css          # CSS variables, base styles
```

### 7.2 Component Rules

- Each component is a single responsibility
- Use React hooks (useState, useEffect) for state and side effects
- No class components — functional only
- Props destructured at function signature
- CSS modules or global CSS (no inline styles except dynamic)

### 7.3 State Management

```jsx
// Simple state — no Redux needed for this scope
const [reservation, setReservation] = useState({
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  newsletter: false
});
```

### 7.4 API Communication (Axios)

> Reference: Quantic MSAIE – Frontend Libraries module → "React and Axios"

```jsx
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// POST /api/reservations
const submitReservation = async (data) => {
  const response = await axios.post(`${API_BASE}/api/reservations`, data);
  return response.data;
};
```

---

## 8. Backend Architecture Patterns

> Reference: Quantic MSAIE – Backends module → "Backends with Flask"
> Reference: Quantic MSAIE – Backends module → "Building Backends"

### 8.1 MVC Pattern

```
backend/
├── app.py                 # Flask application (Controller)
├── models.py              # SQLAlchemy models (Model) — not yet implemented
├── routes/
│   ├── reservations.py    # /api/reservations endpoints
│   ├── newsletter.py      # /api/newsletter endpoints
│   └── menu.py            # /api/menu endpoints
├── schema.sql             # PostgreSQL DDL
├── seed.sql               # Sample data (20 records)
└── requirements.txt       # Python dependencies
```

### 8.2 API Endpoints

| Method | Endpoint | Body | Response | SRS Ref |
|--------|----------|------|----------|---------|
| GET | `/api/reservations/availability` | — | `{ available_slots: [...] }` | FR-18 |
| POST | `/api/reservations` | `{ name, email, phone, guest_count, date, time, newsletter }` | `{ reservation_id, table_number }` or `{ error }` | FR-6, FR-18 |
| POST | `/api/newsletter` | `{ email }` | `{ message }` | FR-15 |

### 8.3 Flask App Structure

```python
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    data = request.get_json()
    # Validate input
    # Check table availability
    # Assign random table (1-30)
    # Insert customer if new
    # Insert reservation
    # Return confirmation
    return jsonify({'confirmation_id': id, 'table_number': table}), 201
```

### 8.4 Error Response Format

```json
{
  "error": "That time slot is unavailable. Please choose another.",
  "available_slots": ["6:00 PM", "7:00 PM", "8:00 PM"]
}
```

---

## 9. Database Design Standards

> Reference: Quantic MSAIE – Database Fundamentals module → "Database Fundamentals"
> Reference: Quantic MSAIE – Relational Databases module → "PostgreSQL"

### 9.1 Schema (SRS FR-17)

```sql
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    newsletter_signup BOOLEAN DEFAULT FALSE
);

CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
    time_slot TIMESTAMP NOT NULL,
    table_number INTEGER NOT NULL CHECK (table_number >= 1 AND table_number <= 30),
    UNIQUE(time_slot, table_number)
);
```

### 9.2 Design Principles

- **Normalization:** 2NF (no partial dependencies) — per Quantic MSAIE Database Fundamentals module
- **Referential integrity:** FK constraint on customer_id
- **Constraints:** CHECK on table_number, UNIQUE on (time_slot, table_number)
- **Naming:** snake_case, descriptive names (customer_name, not name)

---

## 10. Responsive Design

> Reference: Quantic MSAIE – Frontend Libraries module → "Responsive Design"

### 10.1 Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 768px | Phones |
| Tablet | 768px – 1024px | iPads |
| Desktop | > 1024px | Laptops/desktops |

### 10.2 Mobile-First Approach

```css
/* Base: mobile */
.hero { padding: 2rem; }

/* Tablet */
@media (min-width: 768px) {
  .hero { padding: 4rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero { padding: 6rem; }
}
```

### 10.3 Navigation Pattern

- **Mobile:** Hamburger menu (☰) with full-screen overlay
- **Tablet/Desktop:** Horizontal nav bar with all links visible
- **Consistent:** Same nav items on all breakpoints

---

## References

| Document | Location |
|----------|----------|
| SRS v1.0.0 | `docs/SRS.md` |
| Single Source of Truth | `docs/SSOT.md` |
| Requirements Traceability | `docs/requirements_traceability.md` |
| Functional Requirements | `docs/functional_requirements.md` |
| Database Design | `docs/database_design.md` |
| User Stories | `docs/user_stories.md` |
| User Journeys | `docs/user_journeys.md` |
| Quantic MSAIE Course | Web Application & Interface Design program |
