-- 3 users
INSERT INTO users (name, email, password_hash, role)
VALUES
    ('Laksh', 'laksh@example.com', 'hash_laksh', 'user'),
    ('Rahul', 'rahul@example.com', 'hash_rahul', 'user'),
    ('Admin User', 'admin@example.com', 'hash_admin', 'admin');


-- 8 products
INSERT INTO products (name, description, price, stock)
VALUES
    ('Laptop', '15-inch business laptop', 55000.00, 10),
    ('Mouse', 'Wireless mouse', 1200.00, 25),
    ('Keyboard', 'Mechanical keyboard', 3500.00, 8),
    ('Monitor', '24-inch Full HD monitor', 12000.00, 4),
    ('Headphones', 'Wireless headphones', 4500.00, 15),
    ('Webcam', 'Full HD webcam', 3000.00, 3),
    ('USB Cable', 'USB-C charging cable', 800.00, 30),
    ('Laptop Stand', 'Adjustable laptop stand', 2500.00, 2);


-- 5 orders
INSERT INTO orders (user_id, total, status)
VALUES
    (1, 56200.00, 'completed'),
    (2, 4700.00, 'completed'),
    (1, 12000.00, 'pending'),
    (3, 58000.00, 'completed'),
    (2, 3800.00, 'shipped');


-- Order items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES
    -- Order 1: Laptop + Mouse
    (1, 1, 1, 55000.00),
    (1, 2, 1, 1200.00),

    -- Order 2: Headphones + USB Cable
    (2, 5, 1, 4500.00),
    (2, 7, 1, 800.00),

    -- Order 3: Monitor
    (3, 4, 1, 12000.00),

    -- Order 4: Laptop + USB Cable + Mouse
    (4, 1, 1, 55000.00),
    (4, 7, 1, 800.00),
    (4, 2, 1, 1200.00),

    -- Order 5: Keyboard + USB Cable
    (5, 3, 1, 3500.00),
    (5, 7, 1, 800.00);