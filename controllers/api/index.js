const router = require('express').Router();
const customerRoutes = require("./customerRoutes")

router.use("/customer", customerRoutes)

module.exports = router;