const { generateMealPlan } = require("../utils/mealPlannerAi");
const DietPlan = require("../models/DietPlan");

const generateMealPlanController = async (req, res) => {
  try {
    const userInput = req.body;
    const userId = req.user.id; // adjust based on your auth setup

    console.log(userInput);

    const result = await generateMealPlan(userInput);

    if (result.error) {
      return res.status(500).json({ error: result.error });
    }

    console.log("RAW RESPONSE FROM COHERE:", result.mealPlanRawText);

    let parsed;
    try {
      let cleanedText = result.mealPlanRawText.trim();

      // Remove trailing non-JSON text
      const jsonEnd = cleanedText.lastIndexOf("}");
      if (jsonEnd !== -1) {
        cleanedText = cleanedText.substring(0, jsonEnd + 1);
      }

      // Replace "~350" with "350"
      cleanedText = cleanedText.replace(/~\s*(\d+)/g, "$1");

      try {
        parsed = JSON.parse(cleanedText);
      } catch (err) {
        return res.status(400).json({
          error: "Failed to parse meal plan. Ensure prompt returns valid JSON.",
          raw: cleanedText,
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: "Failed to parse meal plan. Ensure prompt returns valid JSON.",
        raw: result.mealPlanRawText,
      });
    }

    const savedPlan = await DietPlan.create({
      userId,
      userInput,
      promptUsed: result.promptUsed,
      mealPlan: parsed,
    });

    return res.status(200).json({
      success: true,
      promptUsed: result.promptUsed,
      mealPlan: parsed,
      planId: savedPlan._id,
    });
  } catch (error) {
    console.error("Error generating meal plan:", error);
    return res
      .status(500)
      .json({ error: "Server error generating meal plan." });
  }
};

module.exports = { generateMealPlanController };
