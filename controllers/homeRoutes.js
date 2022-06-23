//*
//* These are the 'base' Express routes
//* all of these load witn only the '/' URL
//*
// require all models for Sequelize
const { Customer } = require('../models');
const { Invoice, Inventory } = require('../models');
const { User } = require('../models');
// set up Express router
const router = require('express').Router();
// load 'auth.js' util
const withAuth = require('../utils/auth');

//* this is the base Express route when the "homepage.handlebars" loads
router.get('/', withAuth, async (req, res) => {
    console.log('base route rendered');
    try {
        res.render('homepage', {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a '500 Internal Server Error' response
        res.status(500).json(err);
    }
});

//* Express route for user Login
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' Handlebars template
    res.render('login');
});

//* this Express route is for emailing the invoice to customer
//* returns the Customer data
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
        // returns a '500 Internal Server Error' response
        res.status(500).json(err);
    }
});

//* this Express route is for emailing the invoice to customer
//* returns the Invoice data
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
        // returns a '500 Internal Server Error' response
        res.status(500).json(err);
    }
});

//* this Express route is for emailing the invoice to customer
//* returns the Inventory data for the invoice
router.get('/inventory', withAuth, async (req, res) => {
    try {
        const invoiceData = await Inventory.findAll({
            order: [['item_name', 'ASC']],
        });
        const inventory = invoiceData.map((project) => project.get({ plain: true }));
        res.render('inventory', {
            inventory,
            tblCaption: ' ',
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a '500 Internal Server Error' response
        res.status(500).json(err);
    }
});

module.exports = router;