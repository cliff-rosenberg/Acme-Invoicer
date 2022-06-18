const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    console.log('base route rendered');
    console.log(User);
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password']},
            order: [['username', 'ASC']],
        });
        console.log(userData);
        const users = userData.map((project) => project.get({ plain: true }));
        console.log(users);
        res.render('homepage', {
            users,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
  });

module.exports = router;