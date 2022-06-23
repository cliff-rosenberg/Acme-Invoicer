//*
//* These are the Express routes to load 
//* various routes related to user login security
//* all routes have the '/api/users' prefix in the URL
//*
// require User model
const { User } = require('../../models');
// set up Express router
const router = require('express').Router();

//* Express route to CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;
      // return SUCCESS status
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    // returns a Server error response
    res.status(500).json(err);
  }
});

//* Express route to do user Login
router.post('/login', async (req, res) => {
  try {
    // look up user in database
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // if no match, return '400 Bad Request' and error message
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    // check password in database to see if entered passowrd matches
    const validPassword = await dbUserData.checkPassword(req.body.password);
    // if not a match, return '400 Bad Request' and error message
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    console.log('logging in...');
    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;
      // return '200 OK' response
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    // returns a 'Internal Server Error' response
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // return '204 No Content' response
      res.status(204).end();
    });
  } else {
    // return '404 Not Found'
    res.status(404).end();
  }
});

module.exports = router;
