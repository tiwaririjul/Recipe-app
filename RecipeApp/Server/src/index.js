import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipe.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

mongoose
  .connect(
    "mongodb+srv://tiwaririjul7:rijul2277@recipe.eabuya1.mongodb.net/?retryWrites=true&w=majority&appName=recipe"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.listen(3001, () => {
  console.log("Server started");
});
