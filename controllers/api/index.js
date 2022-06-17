const router = require('express').Router();
const customerRoutes = require("./customerRoutes");
const inventoryRoutes = require("./inventoryRoutes");

router.use("/customer", customerRoutes);
router.use("/inventory", inventoryRoutes);

module.exports = router;