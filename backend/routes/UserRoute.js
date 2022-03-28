import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import generateAuthToken from "../authUtil/generateAuthToken.js";
import logger from "../logger/devLogger.js";
import authenticate from "../Middleware/HandleAuth.js";
import User from "../models/UserModel.js";

const userRouter = express.Router();

// /Login
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    logger.http(`POST /api/users/login was called`);
    logger.debug(`req.body: ${JSON.stringify(req.body)}`);
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400);
      throw new Error("Username not found");
    } else if (user && !(await user.matchPassword(password))) {
      res.status(400);
      throw new Error("Invalid username or password");
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateAuthToken(user._id),
      });
    }
  })
);

// Account
userRouter.get(
  "/account",
  authenticate,
  asyncHandler(async (req, res) => {
    logger.http(`POST /api/users/account was called`);
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    }
  })
);

// Create Account
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    logger.http(`POST /api/users was called`);
    const { name, username, email, password } = req.body;
    // check if username is already taken
    const user = await User.findOne({ username });
    if (user) {
      res.status(400);
      throw new Error("Username already taken");
    } else {
      // create a new user
      const newUser = await User.create({
        name,
        username,
        email,
        password,
      });
      if (!newUser) {
        res.status(400);
        throw new Error(
          "User not created. Please make sure data entered is valid"
        );
      } else {
        res.json({
          _id: newUser._id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: generateAuthToken(newUser._id),
          createdAt: newUser.createdAt,
        });
      }
    }
  })
);

// Update account
userRouter.put(
  "/account",
  authenticate,
  asyncHandler(async (req, res) => {
    logger.http(`POST /api/users/account was called`);
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    } else {
      user.name = req.body.name || user.name;
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      if (!updatedUser) {
        res.status(400);
        throw new Error("Something Went Wrong. User not updated");
      } else {
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateAuthToken(updatedUser._id),
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt,
        });
      }
    }
  })
);

export default userRouter;
