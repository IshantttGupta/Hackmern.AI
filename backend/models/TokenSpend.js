import mongoose from "mongoose";

const TokenSpendSchema = new mongoose.Schema({
  email: { type: String, required: true },
  action: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TokenSpend = mongoose.model("TokenSpend", TokenSpendSchema);
export default TokenSpend;
