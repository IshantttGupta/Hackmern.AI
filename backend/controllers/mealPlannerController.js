const Meal = require("../models/Meal");
const DailyPlan = require("../models/DailyPlan");
const { mealPlannerSchema } = require("../validators/mealPlannerSchema");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getMealPlan = async (req, res) => {
  const { error } = mealPlannerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const prompt = `
      Generate a 1-day meal plan for:
      ${JSON.stringify(req.body)}
      Format the response as a JSON object with:
      - title (string)
      - totalCalories (number)
      - meals: array of meals. Each meal should include:
        - name, mealType (breakfast/lunch/dinner/snack)
        - calories, protein, carbs, fat
        - ingredients: array of { name, quantity, calories, protein, carbs, fat }
        - instructions: array of strings
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const generated = JSON.parse(text);

    // Save all meals
    const savedMeals = await Promise.all(
      generated.meals.map(async (mealData) => {
        const meal = await Meal.create(mealData);
        return meal._id;
      })
    );

    // Save daily plan with meal references
    const mealPlan = await DailyPlan.create({
      email: req.user.email,
      title: generated.title,
      totalCalories: generated.totalCalories,
      meals: savedMeals,
    });

    res.status(201).json({ id: mealPlan._id });
  } catch (err) {
    console.error("Error generating meal plan:", err.message);
    res.status(500).json({ error: "Failed to generate meal plan" });
  }
};

module.exports = {
  getMealPlan,
};
