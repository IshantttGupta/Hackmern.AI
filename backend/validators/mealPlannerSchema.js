const Joi = require("joi");

const mealPlannerSchema = Joi.object({
  age: Joi.number().min(1).max(100).required(),
  goal: Joi.string().valid("weight_loss", "muscle_gain", "maintenance").required(),
  meals: Joi.number().min(2).max(12).required(),
  gender: Joi.string().valid("male", "female").required(),
  diet: Joi.string().valid("vegan", "vegetarian", "non_veg").required(),
  weight: Joi.number().min(1).max(400).optional(),
  height: Joi.number().min(1).max(400).optional(),
  weightUnit: Joi.string().valid("kg", "lb").default("kg").optional(),
  heightUnit: Joi.string().valid("cm", "in").default("cm").optional(),
  allergies: Joi.string().allow("").optional(),
});

module.exports = {
  mealPlannerSchema,
};
