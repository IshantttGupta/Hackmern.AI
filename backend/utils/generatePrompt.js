function generateMealPlanPrompt(user) {
  const {
    age,
    gender,
    weight,
    height,
    goal,
    diet,
    restrictions,
    meals_per_day,
    num_days = 1
  } = user;

  const restrictionText = restrictions.length
    ? ` and avoid ingredients like ${restrictions.join(", ")}`
    : "";

  return `
Create a realistic, personalized ${num_days}-day meal plan for a ${age}-year-old ${gender} who is ${height} cm tall and weighs ${weight} kg. 
Their goal is to ${goal}. They follow a ${diet} diet${restrictionText}. 

The meal plan should contain ${meals_per_day} meals per day (e.g., breakfast, lunch, dinner, and snacks). 

⚠️ IMPORTANT:
1. Use only real recipe names that exist in the Spoonacular database.
2. At the end, return a JSON object with this exact schema:
3. Ensure that each recipe name exists in the Spoonacular database. Do not invent recipe names. You may simplify names if needed to increase match likelihood.
4. If the name might not exist, pick 3-5 core ingredients instead. For any ingredient with common allergens or restrictions, list 1-2 viable substitutes.  

Format:

{
  "days": [
    {
      "day": 1,
      "meals": [
        {
          "type": "Breakfast",
          "name": "Recipe Name",
          "description": "brief but complete description of the recipe",
          "calories: "calories",
          "ingredients": [
            "ingredient A",
            "ingredient B",
            "ingredient C",
          ],
          "substitutes": {
            "ingredient A": ["substitute 1", "substitute 2"],
            "ingredient B": ["substitute X"]
          },
        },
        // …Lunch, Dinner, Snack…
      ]
    },
  ]
}

Do not output any other text.
`.trim();
}

module.exports = {generateMealPlanPrompt};

