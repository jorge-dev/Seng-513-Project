import mongoose from "mongoose";
import logger from "../logger/devLogger.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false, default: "Anonymous" },
    username: { type: String, required: true, unique: true, },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Login method
userSchema.methods.matchPassword = async function (pwd) {
  return await bcrypt.compare(pwd, this.password);
};

// Register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
