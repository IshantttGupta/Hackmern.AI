const Purchase = require("../models/Purchase");
const User = require("../models/User");

const addPurchase = async (req, res) => {
  try {
    const { userId, amount, product, date } = req.body;

    const purchase = await Purchase.create({
      user: userId,
      amount,
      product,
      date: date || new Date(),
    });


    res.status(201).json({ success: true, purchase });
  } catch (error) {
    res.status(500).json({ error: "Failed to add purchase" });
  }
};

const getPurchaseHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const purchases = await Purchase.find({ user: userId }).sort({ date: -1 });

    res.json({ purchases });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchases" });
  }
};

module.exports = {
  addPurchase,
  getPurchaseHistory,
};
