const dotenv = require("dotenv");
dotenv.config();

const { CohereClient } = require("cohere-ai");

const client = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

async function getMealPlanFromCohere(prompt) {
  try {
    const response = await client.generate({
      model: "command",
      prompt,
      max_tokens: 600,
      temperature: 0.6,
    });

    return response.generations[0].text;
  } catch (error) {
    console.error("Cohere API Error:", error.message);
    throw error;
  }
}

module.exports = { getMealPlanFromCohere };
