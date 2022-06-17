const router = require('express').Router();
const customerRoutes = require("./customerRoutes");
const inventoryRoutes = require("./inventoryRoutes");
const invoiceRoutes = require("./invoiceRoutes");

router.use("/customer", customerRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/invoice", invoiceRoutes);

module.exports = router;