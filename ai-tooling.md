# AI Tooling Documentation — Café Fausse

> Per the project rubric: "A document outlines what AI code generation tools have been used and how."

---

## Tools Considered

The following AI-assisted software development tools were evaluated for this project:

| Tool | Category | Notes |
|---|---|---|
| **Claude Code** | CLI AI Agent | Primary tool used for planning, requirements analysis, documentation, and implementation |
| **Cursor** | AI IDE | Considered for implementation phase |
| **Codex** | Async Agent | Considered for code generation |
| **v0 / Bolt** | Prompt-Only | Evaluated but not suitable for full-stack with PostgreSQL |

Per the project instructions: "You are highly encouraged to utilize leading AI code generation tooling to assist in rapidly producing your Web application."

---

## How AI Was Used

### Phase 1: Requirements Analysis & Planning

**Tool:** Claude Code (CLI AI Agent)

**What was done:**
- Loaded the SRS document into Claude for structured analysis
- Used planning mode to extract and trace every functional requirement (FR-1 through FR-18) and non-functional requirement (NFR-1 through NFR-9)
- Generated user stories with acceptance criteria mapped to SRS requirements
- Created user journey maps with Mermaid diagrams

**What worked well:**
- Claude excelled at structured requirements extraction when given the SRS as input
- Mermaid diagram generation was effective for visualizing user flows
- The traceability matrix ensured no requirement was missed

**What didn't work well:**
- Initial attempts to use Claude for architecture design resulted in fabricating requirements not in the SRS (e.g., inventing operating hours, adding status columns to the database)
- Required manual correction to ground all outputs in the actual SRS text
- Lesson learned: Always verify AI outputs against the canonical source documents

### Phase 2: Database Design

**Tool:** Claude Code (CLI AI Agent)

**What was done:**
- Used Claude to review the SRS database requirements (FR-17, FR-18)
- Generated PostgreSQL DDL grounded in the exact SRS specification
- Created concurrency prevention analysis (UNIQUE constraints for NFR-5)

**What worked well:**
- Claude correctly identified the need for UNIQUE(time_slot, table_number) constraint
- Generated clean DDL matching SRS column requirements exactly

**What didn't work well:**
- Claude initially suggested adding a "status" column and junction table not in the SRS
- Had to manually remove extensions to stay grounded in the baseline requirements

### Phase 3: Documentation

**Tool:** Claude Code (CLI AI Agent)

**What was done:**
- Generated project README with setup instructions
- Created user stories and journey maps
- Built requirements traceability matrix
- Created design standards document grounded in Quantic MSAIE course materials

**What worked well:**
- Fast generation of boilerplate documentation
- Effective at creating Mermaid diagrams for visual documentation

### Phase 4: Implementation

**Tool:** Claude Code (CLI AI Agent)

**What was done:**
- Scaffolded Flask backend with app.py, routes/reservations.py, routes/newsletter.py
- Implemented PostgreSQL connection using psycopg2
- Created reservation endpoint with table availability checking and random table assignment
- Created newsletter subscription endpoint
- Scaffolded React frontend with CRA
- Built Header, Footer, ReservationForm, NewsletterSignup components
- Implemented client-side form validation with error messages
- Created responsive CSS with mobile-first approach
- Wrote 16 backend API tests (pytest)
- Write 23 frontend component tests (Jest + React Testing Library)

**What worked well:**
- Claude generated clean, working Flask routes with proper error handling
- React component generation was fast and followed existing patterns
- Test generation covered happy paths and edge cases
- PostgreSQL integration worked on first attempt after path fix

**What didn't work well:**
- Claude initially used `date.replace(hour=hour)` which fails because `date` objects don't have `replace()` — had to fix to `datetime.combine()`
- Frontend test imports had wrong relative paths from `__tests__/` directory — required manual correction
- Had to add `export PATH="/Library/PostgreSQL/18/bin:$PATH"` for psycopg2 to find pg_config during installation
- Claude fabricated operating hours (11 PM–11 PM instead of SRS's 5 PM–11 PM) — required manual correction

---

## What I Learned

1. **AI tools are most valuable for structured extraction and formatting** — not for inventing requirements
2. **Always ground AI outputs in canonical source documents** — the SRS, not AI-generated content, is the authority
3. **Manual verification is essential** — AI can fabricate plausible-sounding requirements that aren't in the spec
4. **Planning mode is powerful** — loading the SRS into AI planning mode produces better structured output than ad-hoc prompting
5. **Test your code** — AI-generated code often works on first pass but edge cases need manual verification
6. **Path issues are common** — PostgreSQL binaries and test imports often need path corrections
7. **Security requires explicit review** — secrets must be runtime configuration, and every public API boundary needs server-side validation, parameterized queries, origin controls, and abuse protections.

---

## Representative Prompts

1. *"Given the SRS document for Café Fausse, extract every explicitly stated functional and non-functional requirement with its source citation."*
2. *"Draft user stories following 'As a... I want... so that...' format for a restaurant reservation and newsletter website."*
3. *"Create user journey maps for the reservation booking flow, newsletter signup, and grader verification workflow using Mermaid diagrams."*
4. *"Save the SRS document and rebuild all requirements documentation grounded in this exact text."*
5. *"Validate that the database schema matches SRS FR-17 exactly — no additional columns, no separate tables."*
6. *"Build a Flask backend with reservation and newsletter endpoints that connect to PostgreSQL."*
7. *"Create React components for Header, Footer, ReservationForm, and NewsletterSignup with form validation."*
8. *"Write pytest tests for the Flask API endpoints covering validation and error cases."*

---

## Academic Integrity Statement

We certify that:
1. All AI-generated content was reviewed, verified against the SRS, and manually corrected before integration
2. No fabricated requirements were accepted without cross-referencing the canonical source documents
3. The database schema and business logic are derived explicitly from the Café Fausse SRS
4. This document records both where AI was helpful AND where it required manual correction

---

## Final Remediation & Presentation Preparation

**Tool:** Codex (AI coding agent)

**What was done:**
- Compared the implementation against the SRS, project rubric, and requirements traceability materials.
- Corrected SRS gaps in routing/pages, exact menu content, About content, gallery awards/reviews, accessible lightbox behavior, and guest-count validation without changing the mandated database schema.
- Performed a focused security review and added runtime-only configuration guidance, parameterized-query verification, API validation, CSRF protection, CORS restrictions, request limits, rate limits, and security response headers.
- Updated the README, design, database, traceability, user-journey, security, and presentation documentation.

**Verification discipline:** AI suggestions were reviewed against the canonical SRS. The final demo script requires local execution of the full frontend, Flask, PostgreSQL, and test flows; no credentials are included in source code or presentation materials.

---

## VibeSpec Lite Review and Final Validation

**Tool:** Codex (AI coding agent), with human review and approval

**What was done:**
- Applied the VibeSpec Lite C1–C6 review: readability, functional correctness, edge cases, security, dependencies, and reference verification.
- Added a course Entity Diagram and a standalone data dictionary based only on SRS FR-17 and the approved PostgreSQL schema.
- Documented the database's explicit de-duplication boundaries: unique normalized customer email and unique `(time_slot, table_number)`; no ORM is used.
- Corrected the reservation-form network-failure fallback so Sunday options match the Flask API's Sunday hours, and added a regression test.
- Replaced time-sensitive backend test dates with dynamically generated future dates.

**Human verification performed:**
- Backend integration suite: 22 passed against the configured local PostgreSQL development database.
- Frontend suite: 26 passed.

**Lesson retained:** A database enforces only declared constraints; it does not automatically infer all business-level duplicates. Every AI-generated change was reviewed against the SRS, the schema, and the relevant automated tests before integration.
