-- 1. Get all products
SELECT *
FROM products
ORDER BY id;

-- 2. Search products
SELECT *
FROM products
WHERE name ILIKE '%lap%';

-- 3. Products with stock below 5
SELECT *
FROM products
WHERE stock < 5;

-- 4. Orders with users
SELECT
    orders.id,
    users.name,
    users.email,
    orders.total,
    orders.status,
    orders.created_at
FROM orders
JOIN users
    ON orders.user_id = users.id;

-- 5. Order items with product names
SELECT
    order_items.order_id,
    products.name,
    order_items.quantity,
    order_items.price
FROM order_items
JOIN products
    ON order_items.product_id = products.id;

-- 6. Users who have no orders
SELECT
    users.id,
    users.name,
    users.email
FROM users
LEFT JOIN orders
    ON users.id = orders.user_id
WHERE orders.id IS NULL;

-- 7. Explain product query
EXPLAIN
SELECT *
FROM products
WHERE stock < 5;