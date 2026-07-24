# Café Fausse — User Journey Maps

> **Authority:** All journeys are grounded in the SRS functional requirements.

---

## 1. Reservation Journey (SRS FR-6, FR-7, FR-8, FR-9, FR-18)

```mermaid
flowchart TD
    A["👤 Customer visits Reservations page"] --> B["📋 Fills form:\nTime Slot\nNumber of Guests (1–30)\nCustomer Name\nEmail Address\nPhone (optional)"]
    B --> C{"Frontend validates\nall required fields"}
    C -->|"Missing/Invalid"| D["❌ Inline error shown"]
    D --> B
    C -->|"Valid"| E["POST JSON to Flask API\n/api/reservations"]
    E --> F{"Backend validates\nSRS FR-7"}
    F -->|"Invalid input/slot"| G["❌ Error: fixable validation\nor availability message"]
    G --> B
    F -->|"Valid"| H["SRS FR-18:\nCheck table availability\nfor selected time slot"]
    H --> I{"Tables available\n(from 30 total)?"}
    I -->|"No"| J["SRS FR-9:\nError: time slot\nfully booked"]
    J --> B
    I -->|"Yes"| K["SRS FR-18:\nAssign random table\nfrom 30 available"]
    K --> L["Insert customer record\nInsert reservation record"]
    L --> M["SRS FR-9:\nSuccess message\nwith table number"]
    M --> N["✅ Customer has\nconfirmed reservation"]
```

---

## 2. Newsletter Journey (SRS FR-15, FR-16)

```mermaid
flowchart TD
    A["👤 Customer locates\nnewsletter form"] --> B["📋 Enters email address"]
    B --> C{"SRS FR-15:\nValidate email format"}
    C -->|"Invalid"| D["❌ Error: invalid email"]
    D --> B
    C -->|"Valid"| E["POST to Flask API\n/api/newsletter"]
    E --> F{"Backend processes"}
    F --> G["SRS FR-16:\nStore email in\nbackend database"]
    G --> H["✅ Success message"]
```

---

## 3. Full Site Browsing Journey (SRS FR-1 through FR-14)

```mermaid
flowchart LR
    HP["🏠 Home Page\nFR-1: Name\nFR-2: Contact/Hours\nFR-3: Images/Theme\nFR-4: Navigation"] --> MENU["📋 Menu Page\nFR-5: 4 categories\n11 items with\nprices"]
    HP --> ABOUT["👨‍🍳 About Us\nFR-10: History\nFR-11: Founder bios"]
    HP --> GALLERY["🖼️ Gallery\nFR-12: Images\nFR-13: Lightbox\nFR-14: Awards/Reviews"]
    HP --> RESERVE["📅 Reservations\nFR-6: Form fields\nFR-7: Validation\nFR-8: Random table\nFR-9: Confirmation"]
    HP --> NEWSLETTER["📧 Newsletter\nFR-15: Email validation\nFR-16: Store in DB"]
```

---

## 4. Grader Verification Journey (SRS §4)

```mermaid
flowchart TD
    A["📥 Grader receives\nsubmission"] --> B["Clones GitHub repo"]
    B --> C["Reads README.md\nfor setup instructions"]
    C --> D["Sets up PostgreSQL\nCreates database"]
    D --> E["Runs Flask backend\nRuns React frontend"]
    E --> F["Makes reservation\nvia the website"]
    F --> G["Signs up for\nnewsletter"]
    G --> H["Opens psql/pgAdmin"]
    H --> I["Runs verification queries"]
    I --> J{"Data matches\nwebsite interactions?"}
    J -->|"Yes"| K["✅ Backend correctly\npersists data"]
    J -->|"No"| L["❌ Investigate"]
```
