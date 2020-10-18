# USER STORIES
## CORE
1. As a client, I want to see the menu and the prices of each item so that I can choose what to order.
2. As a client, I want to know the time remaining for my order to be ready so that I can prepare for pick up.
3. As a client, I want to receive a notification so that I can know when my order is ready for pick up.
4. As the restaurant staff, I want to see the client's order so that I can prepare it.
5. As the restaurant staff, I want to accept the client's order and provide an estimated time for pick up so that the client can be made aware.
6. As the restaurant staff, I want to notify the client of the estimated time it takes to prepare the food so that the client can be informed.

## STRETCH
1. As a client / the restaurant staff, I want to register, log in, and log out to view my orders and make new ones.

# ERD
- users
  - id (PK)
  - name
  - phone_number
  - is_staff

- menu
  - id (PK)
  - name
  - description
  - price
  - url_photo

- orders
  - id (PK)
  - client_id (FK)
  - status
  - created_at
  - completed_at

- menu_orders
  - id (PK)
  - menu_id (FK)
  - order_id (FK)
  - quantity

# APIS
## Server Framework
- Express
- Node
- pg
## Front End
- jQuery
## UI
- Bootstrap
## SMS
- Twilio
## Deployment
- Heroku

# Routes
- /staff -- dashboard
  - /staff/order/:id -- view an order (staff-side)
- /client -- dashboard
  - /client/order -- place an order
  - /client/order/:id -- view an order (client-side)

# Wireframe
- Avvai's design to be uploaded to /docs (DONE)

# ERD Diagrams
- Avvai's ERDs to be uploaded to /docs (DONE)

# Find Seeds
- Avvai pushing seeds to branch and merging with master (DONE)

# Feature/Branch/Task Assignments
- Branch Name Template: <feature>-<name>
- Feature/Branches:
  - Basic template of pages - Avvai
  - Adding colors and fonts and fix spacings
  - Client and staff homepage dashboard display and updating
  - Placing orders and calculating and updating total - Josh
  - Staff accepting orders (FE form and BE POST route) - Ayushi
  - Displaying individual order details (2 routes)
  - Texting API - Josh & Ayushi

