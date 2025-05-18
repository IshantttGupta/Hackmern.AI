// models/DietPlan.js
const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userInput: { type: Object, required: true },
  promptUsed: { type: String },
  mealPlan: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DietPlan', DietPlanSchema);
