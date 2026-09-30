-- A. All orders with user's name
SELECT
    orders.id AS order_id,
    users.name AS user_name,
    orders.total,
    orders.status,
    orders.created_at
FROM orders
JOIN users
    ON orders.user_id = users.id;

    -- B. Items of order 1 with product names
SELECT
    order_items.id,
    order_items.order_id,
    products.name AS product_name,
    order_items.quantity,
    order_items.price
FROM order_items
JOIN products
    ON order_items.product_id = products.id
WHERE order_items.order_id = 1;


-- C. Total spent per user
SELECT
    users.id,
    users.name,
    COALESCE(SUM(orders.total), 0) AS total_spent
FROM users
LEFT JOIN orders
    ON users.id = orders.user_id
GROUP BY users.id, users.name
ORDER BY total_spent DESC;


-- D. Top 3 best-selling products
SELECT
    products.id,
    products.name,
    SUM(order_items.quantity) AS total_sold
FROM products
JOIN order_items
    ON products.id = order_items.product_id
GROUP BY products.id, products.name
ORDER BY total_sold DESC
LIMIT 3;


-- E. Products with stock under 5
SELECT
    id,
    name,
    price,
    stock
FROM products
WHERE stock < 5
ORDER BY stock ASC;

-- F. Users who never placed an order
SELECT
    users.id,
    users.name,
    users.email
FROM users
LEFT JOIN orders
    ON users.id = orders.user_id
WHERE orders.id IS NULL;

-- G. Product search with ILIKE and pagination
SELECT
    id,
    name,
    description,
    price,
    stock
FROM products
WHERE name ILIKE '%lap%'
ORDER BY name ASC
LIMIT 5
OFFSET 0;
