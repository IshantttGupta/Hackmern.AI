import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const GeneratedPlan = () => {
  const { state } = useLocation();
  const mealPlan = state?.mealPlan;

  if (!mealPlan)
    return (
      <div className="p-6 text-center text-red-500">
        No meal plan found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navbar />
      <div className="p-6 md:p-10 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center tracking-tight">
          Your <span className="text-green-400">Meal Plan</span>
        </h1>

        {mealPlan.days.map((day) => (
          <div key={day.day} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-green-300">
              Day {day.day}
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              {day.meals.map((meal, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg transition-transform duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold text-green-400 mb-2">
                    {meal.type}: {meal.name}
                  </h3>
                  <p className="italic mb-2 text-gray-300">{meal.description}</p>
                  <p className="mb-2">
                    <strong>Calories:</strong> {meal.calories}
                  </p>
                  <div className="mb-2">
                    <p className="font-medium">Ingredients:</p>
                    <ul className="list-disc list-inside text-gray-300">
                      {meal.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                  {meal.substitutes && typeof meal.substitutes === "object" && (
                    <div className="mt-2">
                      <p className="font-medium">Substitutes:</p>
                      <ul className="list-disc list-inside text-gray-300">
                        {Object.entries(meal.substitutes).map(([ing, subs]) => (
                          <li key={ing}>
                            {ing}:{" "}
                            {Array.isArray(subs)
                              ? subs.join(", ")
                              : String(subs)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedPlan;
