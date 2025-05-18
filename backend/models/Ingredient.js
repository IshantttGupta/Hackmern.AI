const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
}, { _id: false }); // embed inside Meal

module.exports = IngredientSchema;
