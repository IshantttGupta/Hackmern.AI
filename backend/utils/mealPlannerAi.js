const {generateMealPlanPrompt} = require("./generatePrompt");
const {getMealPlanFromCohere} = require("../api/CohereClient");


async function generateMealPlan(input) {
  const prompt = generateMealPlanPrompt(input);
  const responseText = await getMealPlanFromCohere(prompt);

  if (!responseText) {
    return { error: "Failed to generate meal plan from Cohere." };
  }

  return {
    promptUsed: prompt,
    mealPlanRawText: responseText
  };
}

module.exports = {generateMealPlan};
