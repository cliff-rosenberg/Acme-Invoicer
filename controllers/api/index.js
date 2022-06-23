//*
//* This is the setup for the '/api/' routes
//*
// set up Express router
const router = require('express').Router();

// set up route files
const customerRoutes = require("./customerRoutes");
const inventoryRoutes = require("./inventoryRoutes");
const invoiceRoutes = require("./invoiceRoutes");
const userRoutes = require('./userRoutes');
const emailRoutes = require('./emailRoutes');
const formRoutes = require('./formRoutes');

// set up Express router with all routes
router.use('/customer', customerRoutes);
router.use('/inventory', inventoryRoutes);
router.use("/invoice", invoiceRoutes);
router.use('/users', userRoutes);
router.use('/emails', emailRoutes);
router.use('/forms', formRoutes);

// export
module.exports = router;
