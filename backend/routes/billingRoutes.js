const express = require("express");
const {
  addPurchase,
  getPurchaseHistory,
} = require("../controllers/billingController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/purchase", authenticateUser, addPurchase);
router.get("/history/:userId", authenticateUser, getPurchaseHistory);

module.exports = router;
s