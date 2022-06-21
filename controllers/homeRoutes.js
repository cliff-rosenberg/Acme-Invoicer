const router = require('express').Router();
const { User, Inventory } = require('../models');
const {Customer} = require('../models')
const {Invoice} = require('../models')
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

router.get('/customers', withAuth, async (req, res) => {
    try {
        const customerData = await Customer.findAll({
            order: [['company_name', 'ASC']],
        });
        const customers = customerData.map((project) => project.get({ plain: true }));
        res.render('customers', {
            customers,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/invoice', withAuth, async (req, res) => {
    try {
        const invoiceData = await Invoice.findAll({
            order: [['invoice_date', 'ASC']],
        });
        const invoices = invoiceData.map((project) => project.get({ plain: true }));
        res.render('invoice', {
            invoices,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/inventory', withAuth, async (req, res) => {
    try {
        const invoiceData = await Inventory.findAll({
            order: [['item_name', 'ASC']],
        });
        const inventory = invoiceData.map((project) => project.get({ plain: true }));
        res.render('inventory', {
            inventory,
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