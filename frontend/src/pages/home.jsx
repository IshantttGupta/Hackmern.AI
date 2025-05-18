import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/meal/dietplans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Adjust based on your backend route
        if (!res.ok) {
          throw new Error("Failed to fetch plans");
        }
        const data = await res.json();
        console.log(data);
        setPlans(data.dietplans || []); // Expected: { plans: [...] }
      } catch (error) {
        console.error("Error fetching past plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handleGenerate = () => {
    navigate("/planner"); // Redirect to your plan generation form page
  };

  const handleViewPlan = (plan) => {
    navigate("/generated-plan", { state: { mealPlan: plan } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navbar />
      <div className="p-6 md:p-10 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
          Welcome to <span className="text-green-400">NutriAI</span>
        </h1>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleGenerate}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition duration-300"
          >
            Generate New Plan
          </button>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-green-300 text-center">
          Past Plans
        </h2>

        {plans.map((plan, index) => (
          <div
            key={index}
            onClick={() => handleViewPlan(plan.mealPlan)}
            className="cursor-pointer bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-lg hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-4">
              Plan {index + 1}
            </h3>

            {plan.mealPlan?.days?.[0]?.meals?.map((meal, i) => (
              <p key={i} className="text-gray-300">
                🍽️ <span className="font-semibold text-white">{meal.type}</span>
                : {meal.name}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
