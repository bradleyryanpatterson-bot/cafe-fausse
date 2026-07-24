-- ============================================================
-- Café Fausse — Seed Data
-- 20 customer records + 14 reservations
-- ============================================================

INSERT INTO customers (customer_name, customer_email, phone_number, newsletter_signup) VALUES
    ('Alice Johnson', 'alice.johnson@email.com', '(202) 555-0101', TRUE),
    ('Bob Williams', 'bob.williams@email.com', '(202) 555-0102', FALSE),
    ('Carol Davis', 'carol.davis@email.com', '(202) 555-0103', TRUE),
    ('David Martinez', 'david.martinez@email.com', '(202) 555-0104', FALSE),
    ('Eva Rodriguez', 'eva.rodriguez@email.com', '(202) 555-0105', TRUE),
    ('Frank Chen', 'frank.chen@email.com', '(202) 555-0106', FALSE),
    ('Grace Kim', 'grace.kim@email.com', '(202) 555-0107', TRUE),
    ('Henry Patel', 'henry.patel@email.com', '(202) 555-0108', FALSE),
    ('Iris Thompson', 'iris.thompson@email.com', '(202) 555-0109', TRUE),
    ('Jack Wilson', 'jack.wilson@email.com', '(202) 555-0110', FALSE),
    ('Karen Lee', 'karen.lee@email.com', '(202) 555-0111', TRUE),
    ('Leo Garcia', 'leo.garcia@email.com', '(202) 555-0112', FALSE),
    ('Mia Anderson', 'mia.anderson@email.com', '(202) 555-0113', TRUE),
    ('Noah Brown', 'noah.brown@email.com', '(202) 555-0114', FALSE),
    ('Olivia Taylor', 'olivia.taylor@email.com', '(202) 555-0115', TRUE),
    ('Paul Hernandez', 'paul.hernandez@email.com', '(202) 555-0116', FALSE),
    ('Quinn Moore', 'quinn.moore@email.com', '(202) 555-0117', TRUE),
    ('Riley Jackson', 'riley.jackson@email.com', '(202) 555-0118', FALSE),
    ('Sophia White', 'sophia.white@email.com', '(202) 555-0119', TRUE),
    ('Tyler Harris', 'tyler.harris@email.com', '(202) 555-0120', FALSE);

INSERT INTO reservations (customer_id, time_slot, table_number) VALUES
    (1, '2026-07-20 17:00:00-04', 5),
    (2, '2026-07-20 18:00:00-04', 12),
    (3, '2026-07-20 19:00:00-04', 8),
    (4, '2026-07-21 17:00:00-04', 3),
    (5, '2026-07-21 18:00:00-04', 15),
    (6, '2026-07-21 19:00:00-04', 22),
    (7, '2026-07-22 17:00:00-04', 7),
    (8, '2026-07-22 18:00:00-04', 1),
    (9, '2026-07-22 19:00:00-04', 18),
    (10, '2026-07-23 17:00:00-04', 10),
    (11, '2026-07-23 18:00:00-04', 25),
    (12, '2026-07-23 19:00:00-04', 14),
    (13, '2026-07-24 17:00:00-04', 9),
    (14, '2026-07-24 18:00:00-04', 20);
