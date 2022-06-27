//*
//* This is the main body of the application
//* all setup and config is started here
//*

// set up to use ENV file
require('dotenv').config();

// set up path here
// The Path module provides a way of working with directories and file paths
// see https://nodejs.org/api/path.html for more information
// used below to set up Express static paths
const path = require('path');

// Express and Handlebars modules
const express = require('express');
const exphbs = require('express-handlebars');

// Import express-session module for session data
// see https://expressjs.com/en/resources/middleware/session.html
// for more information
const session = require('express-session');

// require for all Express routes
const routes = require('./controllers');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sequelize setup for session data storage
// see https://www.npmjs.com/package/connect-session-sequelize
// for more information
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// set up connection for Sequelize
const sequelize = require('./config/connection');

// Set up session storage with Sequelize
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds 
    // (86400000 ms === 1 day)
    // (3600000 ms === 1 hour)
    maxAge: 3600000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// more Handlebars setup
const hbs = exphbs.create({});
// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// add Handlebars custom helpers here
Handlebars.registerHelper('costTotal', function(value1, value2){
  // Make sure if passed in as a string 
  // that we convert to an actual numeric value
  // before we do the math
  const number1 = parseFloat(value1).toFixed(2);
  const number2 = parseFloat(value2).toFixed(2);
  let total = number1 * number2;
  return total;
});

// set up all Express built-in middleware methods here
// 'express.urlencoded([options])' is a built-in middleware function in Express
// It parses incoming requests with urlencoded payloads and is based on 'body-parser'
app.use(express.urlencoded({ extended: true }));
// 'express.json([options])' is a built-in middleware function in Express
// It parses incoming requests with JSON payloads and is based on 'body-parser'
app.use(express.json());
// sets 'static' routes for Express here
// 'express.static(root, [options])' is a built-in middleware function in Express
// It serves static files and is based on 'serve-static'
// also uses the Node module 'path' here, which is set up in above code
app.use(express.static(path.join(__dirname, 'public')));

// more Express route setup here
app.use(require('./controllers/homeRoutes'));
app.use(routes);

// start up the application and open the PORT listener
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
