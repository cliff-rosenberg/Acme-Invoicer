const router = require('express').Router();
const { User, Inventory } = require('../models');
const {Customer} = require('../models')
const {Invoice} = require('../models')
const withAuth = require('../utils/auth');

// this is the base route when the "homepage.handlebars" loads
router.get('/', withAuth, async (req, res) => {
    console.log('base route rendered');
    try {
        res.render('homepage', {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// this route is for emailing the invoice to customer
// returns the Customer data
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

// this route is for emailing the invoice to customer
// returns the Invoice data
router.get('/invoice', withAuth, async (req, res) => {
    try {
        const invoiceData = await Invoice.findAll({
            include: Customer,
            order: [['invoice_date', 'ASC']],
        });
        const rendered = invoiceData.map((data) => data.get({ plain: true }));
        console.log(rendered);
        res.render('invoice', {
            invoices: rendered,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// this route is for emailing the invoice to customer
// returns the Inventory data for the invoice
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