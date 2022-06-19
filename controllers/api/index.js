const router = require('express').Router();

const customerRoutes = require("./customerRoutes");
const inventoryRoutes = require("./inventoryRoutes");
const invoiceRoutes = require("./invoiceRoutes");
const userRoutes = require('./userRoutes');
const emailRoutes = require('./emailRoutes');

router.use("/customer", customerRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/invoice", invoiceRoutes);
router.use('/users', userRoutes);
router.use('/emails', emailRoutes);

module.exports = router;