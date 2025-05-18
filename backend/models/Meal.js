const mongoose = require("mongoose");
const IngredientSchema = require("./Ingredient");

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  ingredients: [IngredientSchema],
  mealType: { type: String, enum: ["breakfast", "lunch", "dinner", "snack"] },
  instructions: [String],
});

module.exports = mongoose.model("Meal", MealSchema);
