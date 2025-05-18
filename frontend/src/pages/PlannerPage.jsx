import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MealPlannerForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    meals: "",
    gender: "Male",
    goal: "To be Healthy",
    diet: "Any",
    allergies: "",
    weight: "",
    height: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const token = localStorage.getItem("token"); 

      const res = await fetch("http://localhost:5000/api/meal/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data.error);
        alert("Error: " + data.error);
      } else {
        console.log("Meal Plan:", data);
        // Optionally store meal plan in context or localStorage here
        navigate("/generated-plan", {
        state: {
          ...data
        }});
      }
    } catch (err) {
      console.error("Submit error:", err.message);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Start Your Health Journey
        </h2>

        {/* Age & Meals */}
        <div className="flex gap-4 mb-4">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-1/2 p-2 rounded bg-zinc-800 border border-zinc-700"
          />
          <input
            type="number"
            name="meals"
            placeholder="Number of meals"
            value={formData.meals}
            onChange={handleChange}
            className="w-1/2 p-2 rounded bg-zinc-800 border border-zinc-700"
          />
        </div>

        {/* Gender & Goal */}
        <div className="flex gap-4 mb-4">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-1/2 p-2 rounded bg-zinc-800 border border-zinc-700"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-1/2 p-2 rounded bg-zinc-800 border border-zinc-700"
          >
            <option>To be Healthy</option>
            <option>To Lose Weight</option>
            <option>To Gain Muscle</option>
          </select>
        </div>

        {/* Diet */}
        <div className="mb-4">
          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          >
            <option>Any</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Keto</option>
          </select>
        </div>

        {/* Allergies */}
        <div className="mb-4">
          <textarea
            name="allergies"
            placeholder="Some allergies or food that you don't like"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
          />
        </div>

        {/* Weight & Height */}
        <div className="flex gap-4 mb-4">
          <input
            type="number"
            name="weight"
            placeholder="Weight (KG)"
            value={formData.weight}
            onChange={handleChange}
            className="w-1/2 p-2 rounded bg-zinc-800 border border-zinc-700"
          />
          <input
            type="number"
            name="height"
            placeholder="Height (CM)"
            value={formData.height}
            onChange={handleChange}
            className="w-1/2 p-2 rounded bg-zinc-800 border border-zinc-700"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold"
        >
          ✅ Get your meal plan!
        </button>
      </form>
    </div>
  );
};

export default MealPlannerForm;
