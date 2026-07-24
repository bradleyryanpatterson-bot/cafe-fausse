# Café Fausse — User Stories

> **Authority:** Every story and acceptance criterion is grounded in the SRS document.

---

## 1. Customer Stories

| ID | Story | Acceptance Criteria | SRS Reference |
|---|---|---|---|
| US-C01 | As a customer, I want to see the restaurant name, address, phone, and hours on the home page so that I can contact or visit Café Fausse. | Home page displays name prominently; shows address "1234 Culinary Ave, Suite 100, Washington, DC 20002"; shows phone "(202) 555-4567"; shows hours "Mon-Sat 5PM-11PM, Sun 5PM-9PM" | FR-1, FR-2 |
| US-C02 | As a customer, I want to navigate to Menu, Reservations, About Us, and Gallery pages from any page so that I can explore the restaurant. | Navigation links present on all pages | FR-4 |
| US-C03 | As a customer, I want to view the menu organized by categories (Starters, Main Courses, Desserts, Beverages) with descriptions and prices so that I can decide what to order. | Menu page shows 11 items across 4 categories with exact names, descriptions, and prices from SRS | FR-5 |
| US-C04 | As a customer, I want to see high-quality images and a consistent theme so that the site feels professional. | Images present; consistent CSS across pages | FR-3 |
| US-C05 | As a customer, I want to read about Café Fausse's history and founders so that I understand the restaurant. | About Us page shows founding story (2010, Chef Antonio Rossi, Maria Lopez) and mission statement | FR-10, FR-11 |
| US-C06 | As a customer, I want to view a gallery of restaurant images including interior, dishes, and events so that I can see what to expect. | Gallery shows interior ambiance, menu dishes, special events images | FR-12 |
| US-C07 | As a customer, I want to click on a gallery image and see it enlarged so that I can view details. | Lightbox feature works on gallery images | FR-13 |
| US-C08 | As a customer, I want to see awards and positive reviews so that I feel confident visiting. | Awards displayed: Culinary Excellence Award 2022, Restaurant of the Year 2023, Best Fine Dining Experience Foodie Magazine 2023; Reviews displayed from Gourmet Review and The Daily Bite | FR-14 |
| US-C09 | As a customer, I want to book a table by selecting a time slot, number of guests, and providing my name and email (phone optional) so that I have a reservation. | Form has 5 fields: time slot, number of guests, customer name, email, phone (optional); success message on booking; error if slot is full | FR-6, FR-7, FR-8, FR-9 |
| US-C10 | As a customer, I want the system to check availability and assign me a random table from 30 so that I get a confirmed spot. | Backend checks availability; assigns random table from 30; confirms or shows error | FR-8, FR-18 |
| US-C11 | As a customer, I want to subscribe to the newsletter by entering my email so that I receive updates. | Newsletter form with email validation; email stored in database | FR-15, FR-16 |

---

## 2. Owner Stories

| ID | Story | Acceptance Criteria | SRS Reference |
|---|---|---|---|
| US-O01 | As an owner, I want the system to prevent double or overbooking so that operations run smoothly. | No table is booked twice for the same time slot | NFR-5 |
| US-O02 | As an owner, I want the site to be responsive across desktops, tablets, and smartphones so that all customers can access it. | Site works on all device sizes | NFR-8 |
| US-O03 | As an owner, I want the site to load within 3 seconds and form submissions within 2 seconds so that users have a good experience. | Performance meets NFR-1 and NFR-2 | NFR-1, NFR-2 |

---

## 3. Grader Stories

| ID | Story | Acceptance Criteria | SRS Reference |
|---|---|---|---|
| US-G01 | As a grader, I want to see reservation data in the database so that I can verify backend logic works. | SQL queries return customer and reservation records | FR-17, FR-18 |
| US-G02 | As a grader, I want to see the application works in Chrome, Firefox, Safari, and Edge so that I can verify compatibility. | Site loads and functions in all 4 browsers | NFR-7 |
| US-G03 | As a grader, I want to follow README.md instructions to run the app locally so that I can verify the setup. | README has clear setup steps | SRS §4 |
