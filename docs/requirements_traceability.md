# Café Fausse — Requirements Traceability Matrix

> **Authority:** Every requirement below is extracted verbatim from the SRS document (`docs/SRS.md`). No requirements are invented, assumed, or fabricated.

---

## 1. Functional Requirements Traceability

### 3.1.1 Home Page
| ID | SRS Quote | Verification |
|---|---|---|
| FR-1 | "Display Café Fausse's name prominently." | Name visible on home page |
| FR-2 | "Show contact information and hours: Address: 1234 Culinary Ave, Suite 100, Washington, DC 20002; Phone Number: (202) 555-4567; Hours: Monday–Saturday: 5:00PM – 11:00 PM; Sunday: 5:00 PM – 9:00 PM" | Contact section displays exact address, phone, and hours |
| FR-3 | "Include high-quality images and a consistent theme." | Images present; CSS theme consistent |
| FR-4 | "Provide navigation links to Menu, Reservations, About Us, and Gallery pages." | Navbar with 4 links |

### 3.1.2 Menu Page
| ID | SRS Quote | Verification |
|---|---|---|
| FR-5 | "Display the menu segmented into the following categories with specific items and prices:" | Menu displays exactly as specified below |

**Required Menu Items (verbatim from SRS):**

| Category | Item | Description | Price |
|---|---|---|---|
| Starters | Bruschetta | Fresh tomatoes, basil, olive oil, and toasted baguette slices | $8.50 |
| Starters | Caesar Salad | Crisp romaine with homemade Caesar dressing | $9.00 |
| Main Courses | Grilled Salmon | Served with lemon butter sauce and seasonal vegetables | $22.00 |
| Main Courses | Ribeye Steak | 12 oz prime cut with garlic mashed potatoes | $28.00 |
| Main Courses | Vegetable Risotto | Creamy Arborio rice with wild mushrooms | $18.00 |
| Desserts | Tiramisu | Classic Italian dessert with mascarpone | $7.50 |
| Desserts | Cheesecake | Creamy cheesecake with berry compote | $7.00 |
| Beverages | Red Wine (Glass) | A selection of Italian reds | $10.00 |
| Beverages | White Wine (Glass) | Crisp and refreshing | $9.00 |
| Beverages | Craft Beer | Local artisan brews | $6.00 |
| Beverages | Espresso | Strong and aromatic | $3.00 |

### 3.1.3 Reservations Page
| ID | SRS Quote | Verification |
|---|---|---|
| FR-6 | "Include a form with the following fields: Time Slot (dropdown or time picker to select date and time); Number of Guests; Customer Name; Email Address; Phone Number (optional)" | Form has 5 fields |
| FR-7 | "Validate that the selected time slot is available and valid." | Validation prevents invalid/full slots |
| FR-8 | "Integrate with the back-end to assign a random table (from a total of 30) when a slot is available." | Random table from 30 assigned |
| FR-9 | "Display a success message on booking or an error message if the time slot is fully booked." | Success/error message shown |

### 3.1.4 About Us Page
| ID | SRS Quote | Verification |
|---|---|---|
| FR-10 | "Provide a detailed history of Café Fausse: Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation. Our mission is to provide an unforgettable dining experience that reflects both quality and creativity." | History text matches |
| FR-11 | "Include biographies of the founders and information on the restaurant's commitment to unforgettable dining, excellent food and locally sourced ingredients." | Founder bios present |

### 3.1.5 Gallery Page
| ID | SRS Quote | Verification |
|---|---|---|
| FR-12 | "Display a collection of high-resolution images that include: The interior ambiance of the restaurant; Dishes from the menu; Special events and behind-the-scenes images" | Gallery with 3+ image types |
| FR-13 | "Implement a lightbox feature for enlarged image viewing." | Lightbox works on gallery images |
| FR-14 | "Feature awards and positive reviews: Awards: Culinary Excellence Award – 2022; Restaurant of the Year – 2023; Best Fine Dining Experience – Foodie Magazine, 2023; Customer Reviews: 'Exceptional ambiance and unforgettable flavors.' – Gourmet Review; 'A must-visit restaurant for food enthusiasts.' – The Daily Bite" | Awards and reviews displayed |

### 3.1.6 Email Newsletter Signup
| ID | SRS Quote | Verification |
|---|---|---|
| FR-15 | "Provide a form for email signup that includes input validation for proper email format." | Email format validated |
| FR-16 | "Ensure submitted emails are stored in a backend database for future marketing purposes." | Emails stored in PostgreSQL |

### 3.1.7 Reservation System (Back-end)
| ID | SRS Quote | Verification |
|---|---|---|
| FR-17 | "Develop a PostgreSQL database with the following tables: Customers Table: Customer ID, Customer Name, Email Address, Phone Number, Newsletter Signup. Reservations Table: Reservation ID, Customer ID, Time Slot, Table Number" | Schema matches exactly |
| FR-18 | "Implement Flask-based logic to: Insert new customer records. Check table availability for the selected time slot. Assign a random table (from 30 available) if available. Return confirmation or error messages to the user." | Backend logic implements all 4 functions |

---

## 2. Non-Functional Requirements Traceability

| ID | SRS Quote | Verification |
|---|---|---|
| NFR-1 | "The website should load within 3 seconds on a standard broadband connection." | Load time < 3s |
| NFR-2 | "Form submissions (reservations and email sign-up) should be processed within 2 seconds." | Submission time < 2s |
| NFR-3 | "The interface must be intuitive and easy to navigate." | Navigation is clear |
| NFR-4 | "The design should be consistent with the brand's identity and visually appealing." | Consistent CSS theme |
| NFR-5 | "The reservation system must maintain data integrity and prevent double or over bookings." | No overbooking |
| NFR-6 | "The website should handle any failures in a user-friendly manner" | Error messages shown |
| NFR-7 | "The application must be compatible with major browsers (Chrome, Firefox, Safari, Edge)." | Tested in 4 browsers |
| NFR-8 | "The design must be responsive for desktops, tablets, and smartphones." | Responsive CSS |
| NFR-9 | "The code must be modular and well-documented to facilitate future updates." | Code is modular |

---

## 3. Technology Stack (from SRS §2.4 and §3.3)

| Component | Requirement | Source |
|---|---|---|
| Frontend | React with JSX | SRS §2.4, §3.3.2 |
| CSS | Flexbox or Grid | SRS §2.4, §3.3.1 |
| Backend | Flask | SRS §2.4, §3.3.2 |
| Database | PostgreSQL | SRS §2.4, §3.3.2 |
| Protocol | HTTP/HTTPS, RESTful API | SRS §3.3.3 |
| Browsers | Chrome, Firefox, Safari, Edge | SRS §3.2.4 |
| Devices | Desktops, tablets, smartphones | SRS §3.2.4 |

---

## 4. Operating Hours (Exact from SRS §3.1.1 FR-2)

| Day | Hours |
|---|---|
| Monday – Saturday | 5:00 PM – 11:00 PM |
| Sunday | 5:00 PM – 9:00 PM |

---

## 5. Contact Information (Exact from SRS §3.1.1 FR-2)

| Field | Value |
|---|---|
| Address | 1234 Culinary Ave, Suite 100, Washington, DC 20002 |
| Phone | (202) 555-4567 |

---

## 6. About Us Content (Exact from SRS §3.1.4 FR-10)

> "Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation. Our mission is to provide an unforgettable dining experience that reflects both quality and creativity."

---

## 7. Awards (Exact from SRS §3.1.5 FR-14)

| Award | Year |
|---|---|
| Culinary Excellence Award | 2022 |
| Restaurant of the Year | 2023 |
| Best Fine Dining Experience – Foodie Magazine | 2023 |

---

## 8. Customer Reviews (Exact from SRS §3.1.5 FR-14)

| Review | Source |
|---|---|
| "Exceptional ambiance and unforgettable flavors." | Gourmet Review |
| "A must-visit restaurant for food enthusiasts." | The Daily Bite |

---

## 9. Test Coverage

### Backend Tests (`backend/tests/test_api.py`)

**Latest verified result:** 22 passed against the configured local PostgreSQL development database.

| Test | Requirement | Status |
|------|-------------|--------|
| `test_health_returns_ok` | API connectivity | ✅ |
| `test_valid_date_returns_slots` | FR-18 availability check | ✅ |
| `test_missing_date_returns_400` | FR-18 validation | ✅ |
| `test_invalid_date_format_returns_400` | FR-18 validation | ✅ |
| `test_create_reservation_success` | FR-6/FR-18 booking with guest-count validation | ✅ |
| `test_missing_name_returns_400` | FR-18 validation | ✅ |
| `test_invalid_email_returns_400` | FR-18 validation | ✅ |
| `test_missing_date_returns_400` | FR-18 validation | ✅ |
| `test_missing_time_returns_400` | FR-18 validation | ✅ |
| `test_sunday_outside_hours_returns_400` | FR-2 hours / server-side validation | ✅ |
| `test_empty_body_returns_400` | FR-18 validation | ✅ |
| `test_newsletter_signup_on_reservation` | FR-15 newsletter | ✅ |
| `test_subscribe_success` | FR-15 newsletter | ✅ |
| `test_invalid_email_returns_400` | FR-15 validation | ✅ |
| `test_missing_email_returns_400` | FR-15 validation | ✅ |
| `test_already_subscribed_returns_200` | FR-15 idempotency | ✅ |
| `test_health_sets_security_headers` | Security response policy | ✅ |
| `test_missing_guest_count_returns_400` | FR-6 server-side validation | ✅ |
| `test_invalid_guest_count_returns_400` | FR-6 bounds validation | ✅ |
| `test_past_date_returns_400` | FR-7 server-side validation | ✅ |
| `test_non_json_body_returns_415` | API input boundary | ✅ |

### Frontend Tests (`frontend/src/`)

**Latest verified result:** 26 passed. This includes a regression test confirming that, if the availability request fails on a Sunday, the fallback list excludes 9:00 PM and 10:00 PM.

| Test File | Tests | Coverage |
|-----------|-------|----------|
| `Header.test.js` | 3 | Logo, nav links, menu toggle |
| `Footer.test.js` | 4 | Address, hours, phone, copyright |
| `ReservationForm.test.js` | 8 | Form fields, guest input, disabled state, help text, and Sunday fallback hours after an availability failure |
| `NewsletterSignup.test.js` | 4 | Heading, input, button, required |
| `App.test.js` | 6 | Home content plus the reservation form on its `/reservations` route |
| `GalleryLightbox.test.js` | 1 | Accessible open/close behavior |
