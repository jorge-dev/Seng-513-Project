import express from "express";
import asyncHandler from "express-async-handler";
import logger from "../logger/devLogger.js";
import authenticate from "../Middleware/HandleAuth.js";

const orderRouter = express.Router();

// Add Order
orderRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    res.send("Add Order");
  })
);

export default orderRouter;
