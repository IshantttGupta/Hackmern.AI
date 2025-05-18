require('dotenv').config();
const axios = require('axios');
const stringSimilarity = require('string-similarity');

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

async function searchRecipe(name, ingredients = [], fallbackJson = null) {
  let recipe = await searchByName(name);

  if (!recipe && ingredients.length > 0) {
    console.log(`❌ '${name}' not found. Trying ingredient fallback...`);
    recipe = await searchByIngredients(ingredients);
  }

   if (!recipe && fallbackJson) {
    console.log(`⚠️ Recipe not found. Using fallback JSON.`);
    recipe = {
      id: null,
      title: name,
      nutrition: fallbackJson.nutrition || { calories: "Unknown" },
      image: fallbackJson.image || null,
      fallbackIngredients: fallbackJson.ingredients || [],
      isFallback: true,
    };
  }

  return recipe;
}

async function searchByName(query) {
  const url = `${BASE_URL}/recipes/complexSearch`;
  const response = await axios.get(url, {
    params: {
      query,
      number: 5,
      addRecipeNutrition: true,
      apiKey: API_KEY,
    },
  });

  if (!response.data.results.length) return null;

  // Choose the closest match
  const bestMatch = stringSimilarity.findBestMatch(
    query.toLowerCase(),
    response.data.results.map(r => r.title.toLowerCase())
  );

  const index = bestMatch.bestMatchIndex;
  const match = response.data.results[index];

  return {
    id: match.id,
    title: match.title,
    nutrition: match.nutrition,
    image: match.image,
  };
}

async function searchByIngredients(ingredients) {
  const url = `${BASE_URL}/recipes/findByIngredients`;
  const response = await axios.get(url, {
    params: {
      ingredients: ingredients.join(','),
      number: 1,
      ranking: 2, // maximize matching ingredients
      ignorePantry: true,
      apiKey: API_KEY,
    },
  });

  if (!response.data.length) return null;

  const recipe = response.data[0];

  // Fetch full information including nutrition
  const infoUrl = `${BASE_URL}/recipes/${recipe.id}/information`;
  const infoResponse = await axios.get(infoUrl, {
    params: {
      includeNutrition: true,
      apiKey: API_KEY,
    },
  });

  return {
    id: recipe.id,
    title: recipe.title,
    nutrition: infoResponse.data.nutrition,
    image: recipe.image,
  };
}


async function getRecipeIngredients(recipeId) {
  const url = `${BASE_URL}/recipes/${recipeId}/ingredientWidget.json`;
  const response = await axios.get(url, {
    params: { apiKey: API_KEY },
  });

  return response.data.ingredients.map(i => ({
    name: i.name,
    amount: i.amount.metric,
  }));
}

async function getRecipeInstructions(recipeId) {
  const url = `${BASE_URL}/recipes/${recipeId}/analyzedInstructions`;
  const response = await axios.get(url, {
    params: { apiKey: API_KEY },
  });

  const instructions = response.data[0]?.steps.map(
    step => `${step.number}. ${step.step}`
  );

  return instructions || ["Instructions not available."];
}

module.exports = {
  searchRecipe,
  getRecipeIngredients,
  getRecipeInstructions,
};
