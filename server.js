require('dotenv').config({ silent: true });

const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sass = require('node-sass-middleware');

const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

app.set("view engine", "ejs");
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// Moment API to display time and date in 'MMMM Do YYYY, h:mm:ss a' format
const moment = require("moment");

app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});

app.use('/styles', sass({
  src: __dirname + '/sass',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static('public'));

// Attach helpers to query db
const helpers = require('./helpers/helper_functions.js')(db);
const clientRoutes = require('./routes/clients')(helpers);
const staffRoutes = require('./routes/staff')(helpers);

// Mount all resource routes
app.use('/client', clientRoutes);
app.use('/staff', staffRoutes);

// Home page redirect
app.get('/', (req, res) => {
  res.redirect('/client');
});

app.listen(PORT, () => {
  console.log(`grubbineats app listening on port ${PORT}`);
});
