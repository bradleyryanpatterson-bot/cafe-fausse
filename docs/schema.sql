-- ============================================================
-- Café Fausse — PostgreSQL DEVELOPMENT/DEMO DDL
-- Grounded in SRS §3.1.7 FR-17 and FR-18
-- ============================================================

-- WARNING: These statements permanently delete application data. Use only on a
-- disposable development database; do not run this file against production.
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- ============================================================
-- Table: customers
-- SRS FR-17: "Customer ID, Customer Name, Email Address,
--            Phone Number, Newsletter Signup"
-- ============================================================
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    newsletter_signup BOOLEAN NOT NULL DEFAULT FALSE
);

-- ============================================================
-- Table: reservations
-- SRS FR-17: "Reservation ID, Customer ID, Time Slot,
--            Table Number"
-- SRS FR-18: "Assign a random table (from 30 available)"
-- ============================================================
CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    time_slot TIMESTAMP NOT NULL,
    table_number INTEGER NOT NULL,

    -- SRS FR-18: "from a total of 30"
    CONSTRAINT chk_table_number
        CHECK (table_number BETWEEN 1 AND 30),

    -- SRS NFR-5: "prevent double or over bookings"
    CONSTRAINT uq_time_slot_table
        UNIQUE (time_slot, table_number),

    -- SRS FR-17: "Customer ID" references Customers table
    CONSTRAINT fk_reservation_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers (customer_id)
        ON DELETE CASCADE
);

-- Index for availability checks (SRS FR-18)
CREATE INDEX idx_reservations_time_slot ON reservations (time_slot);
