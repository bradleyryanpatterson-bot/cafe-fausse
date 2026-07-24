# Café Fausse — Project Instructions & Rubric

> **Source:** Quantic MSAIE Web Application & Interface Design Project Brief

---

## Project Description

You have been provided both with a copy of the:
- software requirements specification for this project, and
- a collection of images for you to use.

You are highly encouraged to utilize leading AI code generation tooling to assist in rapidly producing your Web application, being sure to describe in broad terms how you made use of them.

### AI Code Generation Tooling Options
- **Cursor**, an AI-based IDE, including agentic capabilities (https://cursor.com/)
- **Codex** (https://chatgpt.com/) — if your git and GitHub skills are already up to speed
- **Claude Code** (https://code.claude.com/docs/en/overview) — if your command line interface, git and GitHub skills are already up to speed
- **Another tool of your choice**

### Hint
Start by loading the software requirements specification document into your AI tool or model of choice, optionally in planning mode, and then enhance, test and modify your code using your selected AI-assisted software development tooling.

---

## Fundamental Site Functions

- Contact information: Address, phone number, hours
- Menu, broken up by categories
- "About Us" page highlighting the owners
- Email sign-up for a newsletter
- Photo gallery page, and judicious use of photos throughout the site
- Something showcasing awards and positive reviews
- Ability to make a table reservation via the website

---

## Reservation System Requirements

- Select specific timeslots
- Input number of guests
- Assign a name to the reservation
- Require email address and optional phone number
- Store this information in the system
- Check to ensure the timeslot is not fully occupied

### Database Requirements
- PostgreSQL database with at minimum: Reservations and Customers tables
- **Customers:** Customer ID, Customer Name, Customer Email, Phone Number, Newsletter Signup
- **Reservations:** Reservation ID, Customer ID, Time Slot (date and time), Table Number
- Backend logic: add customer info, assign random available table (30 tables total), confirm or return error

---

## Minimum Five Pages
- Main (index) page
- Menu
- Reservations
- About Us
- Gallery

---

## Email Newsletter Signup
- Utilize form elements
- Include basic verification on input fields
- Store sign-ups in a backend database

---

## Testing
- Test all links work and behavior is intended
- Verify it can operate on multiple browsers and platforms
- Consider using a mobile emulator tool (e.g., Chrome's mobile simulator)

---

## Images
- Team can use additional photographs/images but ensure they are royalty free
- Can alternatively make use of additional AI-generated images

---

## Hosting
- Either locally (localhost) or on an accessible staging server

---

## Presentation Requirements

- Presentation submitted via a recording where you are present and visible on-screen AND your presentation is recorded on your screen
- Individuals must submit their presentation recording
- Groups must submit a single presentation; all group members enable video cameras; all members must speak at least once
- Demo presentation should last around 5-10 minutes and demonstrate all site functionality:
  - Each of the five (or more) pages and navigation between them
  - The email signup for the newsletter
  - A correctly functioning reservations system
  - The correct effects of reservations and newsletter signup on the state of the backend database (shown in the database itself, not via a site admin page)
  - Discussion of the implementation decisions you have made

---

## Submission Guidelines

Submit both a Google Drive link to your video recording and a PDF file:
1. Video Recording: Submit a link to your recorded demo presentation
2. PDF file should include:
   - A link to your GitHub repository
   - For a group: links to each group member's GitHub repository

### Each GitHub repository must contain:
- You must add "quantic-grader" as a collaborator to your private repo (Settings > Collaborators > Add people)
- All source code used for your site (frontend and backend)
- **README.md** — describes your solution, its design, and how to run it locally
- **ai-tooling.md** — summary of any AI tooling used and how generally it was used (what worked well, what didn't)
- **Optional:** staging.md — link to staging version (if created) or indicate only run locally

---

## Project Rubric

**Score 5** — Addresses ALL project requirements:
- Minimum five pages built using React and JSX
- All requirements in the SRS have been implemented
- Website maintains good appearance and evidences excellent UI and UX design
- Appropriate use of Flexbox or Grid approaches for high quality UX
- Forms correctly implemented and working
- Back-end Flask app and database correctly integrated with React front-end
- Meeting requirements for reservation and newsletter signup system
- Demo presentation presents all required elements, including correct effect of reservations and newsletter signups on the backend database and **sophisticated reservations logic**
- Document outlines what AI code generation tools have been used and how
