import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
  email: { type: String, required: true },
  paymentIntent: { type: String, required: true },
  paymentIntentSecret: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Purchase = mongoose.model("Purchase", PurchaseSchema);
export default Purchase;
