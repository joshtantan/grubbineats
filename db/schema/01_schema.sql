-- Drop and recreate midterm tables
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS menu CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS menu_orders CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  is_staff BOOLEAN DEFAULT FALSE
);

CREATE TABLE menu (
  id SERIAL PRIMARY KEY NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  url_photo VARCHAR(255)
);


CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  client_id INTEGER REFERENCES users(id),
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP,
  accepted_at TIMESTAMP,
  ready_at TIMESTAMP
);

CREATE TABLE menu_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  menu_id INTEGER REFERENCES menu(id) NOT NULL,
  quantity INTEGER NOT NULL
);


