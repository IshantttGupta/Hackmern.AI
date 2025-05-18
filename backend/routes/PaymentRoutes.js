const express = require("express");
const { processPayment } = require("../controllers/paymentController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/process", authenticateUser, processPayment);

module.exports = router;
