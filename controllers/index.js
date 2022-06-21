const router = require('express').Router();

// set up routes here
const apiRoutes = require("./api")
const homeRoutes = require('./homeRoutes.js');

// the "Home Routes" do not need the "/api" prefix
router.use('/', homeRoutes);

// the "API Routes" need the prefix of "/api" to work
router.use('/api', apiRoutes);

module.exports = router;
