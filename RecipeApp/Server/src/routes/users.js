import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../Models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;

  const user = await userModel.findOne({ userName });

  if (user) {
    return res.json({ message: "User already exist!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    userName: userName,
    password: hashedPassword,
  });

  await newUser.save();

  res.json({ message: "User Registered Sucesfully" });
});
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const user = await userModel.findOne({ userName });

  if (!user) {
    return res.json({ message: "User doen't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "USername or password is Incorrect!" });
  }

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ message: "user Loged in", token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
