const { generateMealPlan } = require('../utils/mealPlannerAi');

const generateMealPlanController = async (req, res) => {
  try {
    const userInput = req.body;
    console.log(userInput);

    const result = await generateMealPlan(userInput);

    if (result.error) {
      return res.status(500).json({ error: result.error });
    }

    let parsed;
    try {
      parsed = JSON.parse(result.mealPlanRawText);
    } catch (err) {
      return res.status(400).json({
        error: 'Failed to parse meal plan. Ensure prompt returns valid JSON.',
        raw: result.mealPlanRawText,
      });
    }

    
    return res.status(200).json({
      success: true,
      promptUsed: result.promptUsed,
      mealPlan: parsed,
    });

  } catch (error) {
    console.error("Error generating meal plan:", error);
    return res.status(500).json({ error: 'Server error generating meal plan.' });
  }
};

module.exports = { generateMealPlanController };
