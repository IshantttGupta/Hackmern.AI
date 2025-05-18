const mealPlannerAi = require('../utils/mealPlannerAi');
const { getRecipeInfo } = require('../services/spoonacularClient');

async function fetchMealPlanController(req, res) {
  try {
    const userInputs = req.body;

    const aiOutput = await mealPlannerAi(userInputs);
    const mealLines = aiOutput.split('\n').filter(line => line.trim());

    const meals = [];

    for (const line of mealLines) {
      const [mealTitle, ...descParts] = line.split(':');
      const description = descParts.join(':').trim();

      const recipe = await getRecipeInfo(mealTitle.trim());

      meals.push({
        title: mealTitle.trim(),
        description,
        recipe: recipe || null,
      });
    }

    res.status(200).json({ meals });
  } catch (err) {
    console.error('Meal plan error:', err);
    res.status(500).json({ error: 'Failed to fetch meal plan.' });
  }
}

module.exports = fetchMealPlanController;
