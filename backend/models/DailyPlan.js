const mongoose = require("mongoose");

const DailyPlanSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: String,
  totalCalories: String,
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
}, { timestamps: true });

module.exports = mongoose.model("DailyPlan", DailyPlanSchema);
