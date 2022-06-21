const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Customer } = require('../../models');

// add Customer form
router.get('/customerform', withAuth, async (req, res) => {
    try {
        res.render('custCreate', {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a Customer form
router.get('/delcustomerform', withAuth, async (req, res) => {
    try {
        const customerData = await Customer.findAll();
            //res.status(200).json(customerData);
            // serialize the Sequelize query return
            const rendered = customerData.map((data) => data.get({ plain: true }));
            console.log(rendered);
        res.render('custDelete', {
            rendered,
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// add Inventory item form
router.get('/inventoryform', withAuth, async (req, res) => {
    try {
        res.render('inventoryCreate', {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/delinventoryform', withAuth, async (req, res) => {
    try {
        res.render('inventoryCreate', {
            logged_in: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;