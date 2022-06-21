const router = require('express').Router();
const withAuth = require('../../utils/auth');

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

module.exports = router;