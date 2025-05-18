const express = require("express");
const {generateMealPlanController} = require("../controllers/mealPlannerController");
const authenticateUser = require("../middleware/authMiddleware");
const DailyPlan = require("../models/DailyPlan");
const DietPlan = require('../models/DietPlan')
const Meal = require("../models/Meal");

const router = express.Router();

// For generating a plan
router.post("/generate", authenticateUser, generateMealPlanController);

router.get("/plans", authenticateUser, async (req, res) => {
  try {
    const plans = await DailyPlan.find({ email: req.user.email }).populate("meals");
    res.json(plans);
  } catch (err) {
    console.error("Error fetching plans:", err.message);
    res.status(500).json({ error: "Could not fetch plans" });
  }
});

// Fetch a specific meal by ID
router.get("/meals/:id", authenticateUser, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.json(meal);
  } catch (err) {
    console.error("Error fetching meal:", err.message);
    res.status(500).json({ error: "Could not fetch meal" });
  }
});

// Delete a daily plan and all its meals
router.delete("/plans/:id", authenticateUser, async (req, res) => {
  try {
    const plan = await DailyPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    // Check if user owns this plan
    if (plan.email !== req.user.email)
      return res.status(403).json({ error: "Unauthorized" });

    // Delete related meals
    await Meal.deleteMany({ _id: { $in: plan.meals } });

    // Delete the plan
    await plan.remove();

    res.json({ message: "Plan and its meals deleted" });
  } catch (err) {
    console.error("Error deleting plan:", err.message);
    res.status(500).json({ error: "Could not delete plan" });
  }
});

router.get('/dietplans', authenticateUser, async(req, res) => {
  console.log("HI")
  try{
    const dietplans = await DietPlan.find({userId: req.user.id});
    res.status(200).json({dietplans});
  } catch (err){
    console.error(err);
    res.status(500).json({message: "Could not recall diet plans"});
  }
})


module.exports = router;
