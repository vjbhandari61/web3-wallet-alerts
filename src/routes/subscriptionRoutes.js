const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

router.post("/subscribe", subscriptionController.subscribe);
router.post("/unsubscribe", subscriptionController.unsubscribe);

module.exports = router;