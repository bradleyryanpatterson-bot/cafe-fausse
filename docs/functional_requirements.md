# Café Fausse — Functional & Non-Functional Requirements

> **Authority:** Every requirement is extracted verbatim from the SRS document (`docs/SRS.md`). No requirements are invented, assumed, or fabricated.

---

## 1. Functional Requirements

### 3.1.1 Home Page
| ID | SRS Quote |
|---|---|
| FR-1 | "Display Café Fausse's name prominently." |
| FR-2 | "Show contact information and hours: Address: 1234 Culinary Ave, Suite 100, Washington, DC 20002; Phone Number: (202) 555-4567; Hours: Monday–Saturday: 5:00PM – 11:00 PM; Sunday: 5:00 PM – 9:00 PM" |
| FR-3 | "Include high-quality images and a consistent theme." |
| FR-4 | "Provide navigation links to Menu, Reservations, About Us, and Gallery pages." |

### 3.1.2 Menu Page
| ID | SRS Quote |
|---|---|
| FR-5 | "Display the menu segmented into the following categories with specific items and prices:" |

**Required Menu Items:**

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
| ID | SRS Quote |
|---|---|
| FR-6 | "Include a form with the following fields: Time Slot (dropdown or time picker to select date and time); Number of Guests; Customer Name; Email Address; Phone Number (optional)" |
| FR-7 | "Validate that the selected time slot is available and valid." |
| FR-8 | "Integrate with the back-end to assign a random table (from a total of 30) when a slot is available." |
| FR-9 | "Display a success message on booking or an error message if the time slot is fully booked." |

### 3.1.4 About Us Page
| ID | SRS Quote |
|---|---|
| FR-10 | "Provide a detailed history of Café Fausse: Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation. Our mission is to provide an unforgettable dining experience that reflects both quality and creativity." |
| FR-11 | "Include biographies of the founders and information on the restaurant's commitment to unforgettable dining, excellent food and locally sourced ingredients." |

### 3.1.5 Gallery Page
| ID | SRS Quote |
|---|---|
| FR-12 | "Display a collection of high-resolution images that include: The interior ambiance of the restaurant; Dishes from the menu; Special events and behind-the-scenes images" |
| FR-13 | "Implement a lightbox feature for enlarged image viewing." |
| FR-14 | "Feature awards and positive reviews: Awards: Culinary Excellence Award – 2022; Restaurant of the Year – 2023; Best Fine Dining Experience – Foodie Magazine, 2023; Customer Reviews: 'Exceptional ambiance and unforgettable flavors.' – Gourmet Review; 'A must-visit restaurant for food enthusiasts.' – The Daily Bite" |

### 3.1.6 Email Newsletter Signup
| ID | SRS Quote |
|---|---|
| FR-15 | "Provide a form for email signup that includes input validation for proper email format." |
| FR-16 | "Ensure submitted emails are stored in a backend database for future marketing purposes." |

### 3.1.7 Reservation System (Back-end)
| ID | SRS Quote |
|---|---|
| FR-17 | "Develop a PostgreSQL database with the following tables: Customers Table: Customer ID, Customer Name, Email Address, Phone Number, Newsletter Signup. Reservations Table: Reservation ID, Customer ID, Time Slot, Table Number" |
| FR-18 | "Implement Flask-based logic to: Insert new customer records. Check table availability for the selected time slot. Assign a random table (from 30 available) if available. Return confirmation or error messages to the user." |

---

## 2. Non-Functional Requirements

| ID | SRS Quote |
|---|---|
| NFR-1 | "The website should load within 3 seconds on a standard broadband connection." |
| NFR-2 | "Form submissions (reservations and email sign-up) should be processed within 2 seconds." |
| NFR-3 | "The interface must be intuitive and easy to navigate." |
| NFR-4 | "The design should be consistent with the brand's identity and visually appealing." |
| NFR-5 | "The reservation system must maintain data integrity and prevent double or over bookings." |
| NFR-6 | "The website should handle any failures in a user-friendly manner" |
| NFR-7 | "The application must be compatible with major browsers (Chrome, Firefox, Safari, Edge)." |
| NFR-8 | "The design must be responsive for desktops, tablets, and smartphones." |
| NFR-9 | "The code must be modular and well-documented to facilitate future updates." |

---

## 3. Technology Stack (SRS §2.4, §3.3)

| Component | Requirement | Source |
|---|---|---|
| Frontend | React with JSX | SRS §2.4, §3.3.2 |
| CSS | Flexbox or Grid | SRS §2.4, §3.3.1 |
| Backend | Flask | SRS §2.4, §3.3.2 |
| Database | PostgreSQL | SRS §2.4, §3.3.2 |
| Protocol | HTTP/HTTPS, RESTful API | SRS §3.3.3 |
| Browsers | Chrome, Firefox, Safari, Edge | SRS §3.2.4 |
| Devices | Desktops, tablets, smartphones | SRS §3.2.4 |
