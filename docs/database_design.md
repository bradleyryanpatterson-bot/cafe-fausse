# Café Fausse — Database Design Specification

> **Authority:** Every column, constraint, and design decision is grounded in SRS FR-17 and FR-18. No extensions or inventions.

---

## 1. Database Mission Statement

The database serves as the persistent, relational repository for customer identity, newsletter subscriptions, and table reservations for Café Fausse. It supports the SRS-mandated goal of processing table bookings, checking availability, and assigning random tables from a pool of 30 (SRS §3.1.7 FR-18).

---

## 2. Schema Requirements (SRS §3.1.7 FR-17)

The SRS explicitly defines two tables:

For course submission, the same schema is presented visually in [entity_diagram.md](entity_diagram.md) and field-by-field in [data_dictionary.md](data_dictionary.md).

### 2.1 Customers Table (SRS FR-17)

| Column | Data Type | Constraints | SRS Reference |
|---|---|---|---|
| customer_id | SERIAL | PRIMARY KEY | "Customer ID" |
| customer_name | VARCHAR(100) | NOT NULL | "Customer Name" |
| customer_email | VARCHAR(255) | UNIQUE, NOT NULL | "Email Address" |
| phone_number | VARCHAR(20) | NULL | "Phone Number" |
| newsletter_signup | BOOLEAN | DEFAULT FALSE | "Newsletter Signup" |

### 2.2 Reservations Table (SRS FR-17)

| Column | Data Type | Constraints | SRS Reference |
|---|---|---|---|
| reservation_id | SERIAL | PRIMARY KEY | "Reservation ID" |
| customer_id | INTEGER | NOT NULL, FK → customers | "Customer ID" |
| time_slot | TIMESTAMP | NOT NULL | "Time Slot" |
| table_number | INTEGER | NOT NULL, CHECK (1-30) | "Table Number" |

---

## 3. Design Decisions

### 3.1 No "Status" Column
The SRS does not mention a status column on the reservations table. The baseline requirement is to "assign a random table (from a total of 30) when a slot is available" and "display a success message on booking or an error message if the time slot is fully booked" (SRS FR-8, FR-9). No status tracking is required.

### 3.2 No Junction Table
The SRS specifies a single `table_number` column on the reservations table (SRS FR-17). No many-to-many relationship is described.

### 3.3 No Separate Newsletter Table
The SRS places `newsletter_signup` as a column on the Customers table (SRS FR-17). No separate newsletter_subscribers table is described.

### 3.4 No "tables" Inventory Table
The SRS specifies "30 available" tables as a fixed constant (SRS FR-8, FR-18). No tables inventory table is described.

### 3.5 30 Tables Total
SRS FR-8: "assign a random table (from a total of 30)"
SRS FR-18: "Assign a random table (from 30 available) if available."

### 3.6 Random Assignment
SRS FR-8: "assign a random table"
SRS FR-18: "Assign a random table"

### 3.7 No Duration Tiers
The SRS does not mention reservation duration, turnover times, or buffer periods.

### 3.8 No Operating Hours Validation in Database
The SRS defines operating hours for display purposes (FR-2: Monday–Saturday 5:00PM – 11:00 PM; Sunday 5:00 PM – 9:00 PM). No validation rule is specified for database-level enforcement.

### 3.9 Guest Count Is Validated, Not Persisted
The reservation form and API require a guest count from 1 through 30, as required by FR-6. FR-17 explicitly defines the reservation-table columns and does not include guest count, so the baseline schema remains unchanged. The value is validated for the booking request and is intentionally not stored.

---

## 4. Concurrency Prevention (SRS NFR-5)

NFR-5 requires: "The reservation system must maintain data integrity and prevent double or over bookings."

Implementation: `UNIQUE (time_slot, table_number)` constraint on the reservations table ensures no table can be booked twice for the same time slot.

---

## 5. Verification

### 5.1 Check Customers
```sql
SELECT customer_id, customer_name, customer_email, phone_number, newsletter_signup
FROM customers ORDER BY customer_id;
```

### 5.2 Check Reservations
```sql
SELECT r.reservation_id, c.customer_name, r.time_slot, r.table_number
FROM reservations r
JOIN customers c ON r.customer_id = c.customer_id
ORDER BY r.time_slot;
```

### 5.3 Verify No Overbooking
```sql
SELECT time_slot, COUNT(*) as tables_booked
FROM reservations
GROUP BY time_slot
HAVING COUNT(*) > 30;
-- Should return 0 rows
```

## 6. Self-Hosted Database Safety

`schema.sql` begins with `DROP TABLE` statements to make a classroom/demo reset reproducible. It must only run against a disposable development database. Production uses a least-privilege application role, a runtime-supplied `DATABASE_URL`, backups, and migration tooling that does not destroy live data. See [`security.md`](security.md).
