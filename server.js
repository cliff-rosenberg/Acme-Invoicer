require('dotenv').config();

const path = require('path');
const express = require('express');
// Import express-session
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const routes = require('./controllers');
const sequelize = require('./config/connection');
//const helpers = require('./utils/helpers');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// sets 'static' routes for Express here
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/homeRoutes'));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
