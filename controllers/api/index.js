const router = require('express').Router();

const customerRoutes = require("./customerRoutes");
const inventoryRoutes = require("./inventoryRoutes");
const invoiceRoutes = require("./invoiceRoutes");
const userRoutes = require('./user-routes');

router.use("/customer", customerRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/invoice", invoiceRoutes);
router.use('/users', userRoutes);

module.exports = router;
