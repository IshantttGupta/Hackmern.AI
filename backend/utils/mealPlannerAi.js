const {getMealPlanFromCohere} = require("../api/CohereClient");
const {generateMealPlanPrompt} = require("./generateprompt");

async function generateMealPlan(input) {
    const formattedUser = {
  ...input,
  restrictions: input.allergies?.split(",").map(a => a.trim()) || [],
  meals_per_day: input.meals
};

  const prompt = generateMealPlanPrompt(formattedUser);
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
