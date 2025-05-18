const Meal = require("../models/Meal");
const DailyPlan = require("../models/DailyPlan");
const { mealPlannerSchema } = require("../validators/mealPlannerSchema");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const result = response.data.choices[0].message.content;
    const generated = JSON.parse(result);

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
