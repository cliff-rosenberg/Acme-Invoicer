// set up to use ENV file
require('dotenv').config();

const path = require('path');
// Express and Handlebars modules
const express = require('express');
const exphbs = require('express-handlebars');
// Import express-session module
const session = require('express-session');


// require for all Express routes
const routes = require('./controllers');

//const helpers = require('./utils/helpers');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sequelize setup
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

// Set up sessions with cookies
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

// set up Express 'body-parser'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// sets 'static' routes for Express here
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
