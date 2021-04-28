# GrubbinEats Project

GrubbinEats is a full stack web application designed to allow its customers to place orders for pick-up at a local restaurant while notifying and allowing the restaurant staff to accept the orders and provide time estimates to users via SMS.

## Final Product

### Customer Dashboard
!["Screenshot of customer dashboard"](https://github.com/joshtantan/grubbineats/blob/master/docs/customer_dashboard.png?raw=true) 
### Menu Page
!["Screenshot of page where customer places an order"](https://github.com/joshtantan/grubbineats/blob/master/docs/customer_ordering_page.png?raw=true) 
### Staff Dashboard
!["Screenshot of the restaurant dashboard and where they accept orders"](https://github.com/joshtantan/grubbineats/blob/master/docs/restaurant_dashboard.png?raw=true)

## Dependencies

- Node
- Express
- EJS
- Twilio
- Body-Parser
- Dotenv
- PG
- Moment
- Morgan
- Chalk
- Node SASS middleware

## Runtime Uses

> All commands are run from the project root directory
1. Install all dependencies before first use
```shell
$ npm i
```
2. Ensure `psql` is installed and create a new database.
3. Use the `.env.example` file to fill in the necessary credentials. Some default values have been left there that may be customized to your preferences.
4. Rename `.env.example` to `.env` for use.
- Start the web server
```shell
$ npm start
```
- Start the web server with `nodemon` for auto-refresh on any code changes
```shell
$ npm run local
```
- Reset the database (with seeding)
```shell
$ npm run db:reset
```
- Reset the database (without seeding)
```shell
$ npm run db:setup
```

## Image Credits

- Grubbin' Eats brand icon created by Luis Prado from Noun Project
- Website photos by Zamurovic Brothers from Noun Project
