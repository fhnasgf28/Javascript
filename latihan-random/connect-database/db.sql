CREATE DATABASE inventory;

\c inventory;

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
    quantity INTEGER NOT NULL
)