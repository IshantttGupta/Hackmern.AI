import DailyPlan from "../models/DailyPlan";
import { Meal } from "../models/Meal";
import { Ingredient } from "../models/Ingredient";
import { z } from "zod";
import { mealPlanSchema } from "../schemas/mealPlanSchema";

export const addDailyPlanAndMeals = async (
  data: z.infer<typeof mealPlanSchema>,
  email: string
) => {
  const { title, totalCalories } = data;

  const dailyPlan = await DailyPlan.create({
    email,
    title,
    totalCalories,
  });

  for (let index = 0; index < data.meals.length; index++) {
    const meal = data.meals[index];

    const newMeal = await Meal.create({
      title: meal.title,
      calories: meal.calories,
      dailyPlanId: dailyPlan._id,
      protein: meal.protein,
      carb: meal.carb,
      fat: meal.fat,
      mealOrder: index + 1,
    });

    await Ingredient.insertMany(
      meal.ingredients.map((ingredient) => ({
        ...ingredient,
        mealId: newMeal._id,
      }))
    );
  }

  return dailyPlan._id;
};
