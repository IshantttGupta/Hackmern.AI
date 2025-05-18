const express = require("express");
const {
  getTokens,
  addTokens,
  spendTokens,
} = require("../controllers/tokenController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateUser, getTokens);
router.post("/add", authenticateUser, addTokens);
router.post("/spend", authenticateUser, spendTokens);

module.exports = router;
