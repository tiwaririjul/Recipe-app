import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

export const userModel = mongoose.model("users", userSchema);
