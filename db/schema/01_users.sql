-- Drop and recreate Users table (Example)

-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL
-- );

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone_number INTEGER NOT NULL,
  is_staff BOOLEAN DEFAULT FALSE
)

DROP TABLE IF EXISTS menu;
CREATE TABLE menu (
  id SERIAL PRIMARY KEY NOT NULL,
  item_name TEXT,
  description TEXT,
  price INTEGER,
  url_photo VARCHAR(255)
);

DROP TABLE IF EXISTS orders;
CREATE TABLE order (
  id SERIAL PRIMARY KEY NOT NULL,
  client_id INTEGER REFERENCES users(id),
  status BOOLEAN,
  created_at TIMESTAMP,
  complete_at TIMESTAMP
);

DROP TABLE IF EXISTS menu_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES order(id),
  menu_id INTEGER REFERENCES menu(id),
  quantity INTEGER
);
