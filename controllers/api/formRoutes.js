//*
//* These are the Express routes to load 
//* various HTML data input forms
//* all routes have the '/api/forms' prefix in the URL
//*
// require Customer and Inventory models
const { Customer, Inventory } = require('../../models');
// set up Express router
const router = require('express').Router();
// load 'auth.js' util
const withAuth = require('../../utils/auth');

//* Express route for Add Customer form
router.get('/customerform', withAuth, async (req, res) => {
    try {
        // render form using Handlebars
        res.render('custCreate', {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a Server error response
        res.status(500).json(err);
    }
});

//* Express route for Delete Customer form
router.get('/delcustomerform', withAuth, async (req, res) => {
    try {
        // search the database for all current Customer data
        const customerData = await Customer.findAll();
        // serialize the Sequelize query return
        const rendered = customerData.map((data) => data.get({ plain: true }));
        //console.log(rendered);
        // render form using Handlebars
        res.render('custDelete', {
            rendered,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a Server error response
        res.status(500).json(err);
    }
});

//* Express route for displaying a single Customer form
router.get('/findcustform', withAuth, async (req, res) => {
    try {
        // search the database for all current Customer data
        // to populate the drop down input selector
        const customerData = await Customer.findAll();
        // format the returned JSON
        const rendered = customerData.map((data) => data.get({ plain: true }));
        //console.log(rendered);
        // render form using Handlebars
        res.render('custFind', {
            rendered,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a Server error response
        res.status(500).json(err);
    }
});

//* Express route for displaying a single Inventory item form
router.get('/findinvform', withAuth, async (req, res) => {
    try {
        // search the database for all current Inventory items
        // to populate the drop down input selector
        const inventoryData = await Inventory.findAll();
        // format the returned JSON
        const rendered = inventoryData.map((data) => data.get({ plain: true }));
        console.log(rendered);
        // render form using Handlebars
        res.render('inventoryFind', {
            rendered,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a Server error response
        res.status(500).json(err);
    }
});

//* Express route for adding an Inventory item form
router.get('/inventoryform', withAuth, async (req, res) => {
    try {
        // render Inventory item input form
        // using Handlebars
        res.render('inventoryCreate', {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a Server error response
        res.status(500).json(err);
    }
});

//* Express route for deleting a single Inventory item form
router.get('/delinventoryform', withAuth, async (req, res) => {
    try {
        // search the database for all current Inventory item data
        // to populate the drop down input selector
        const inventoryData = await Inventory.findAll();
        // format the returned JSON
        const rendered = inventoryData.map((data) => data.get({ plain: true }));
        //console.log(rendered);
        // render form using Handlebars
        res.render('inventoryDel', {
            rendered,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        // returns a Server error response
        res.status(500).json(err);
    }
});

module.exports = router;
