import express from "express";
import { recipeModel } from "../Models/Recipe.js";
import { userModel } from "../Models/User.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const resp = await recipeModel.find({});
    console.log("res ", resp);
    res.json(resp);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const recipe = new recipeModel(req.body);
  try {
    const response = await recipe.save();
    console.log(response);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);

    user.savedRecipes.push(recipe);

    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedrecipes/ids/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);

    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});
router.get("/savedrecipes/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    const savedRecipes = await recipeModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

router;

export { router as recipeRouter };
