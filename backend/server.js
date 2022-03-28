import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger/devLogger.js";
import products from "./data/Products.js";
import connectToMongoDB from "./config/MongoDBConnection.js";
import SeedData from "./SeedDB.js";
import productRoute from "./routes/ProductRoute.js";
import { errorHandler, notFoundError } from "./Middleware/HandleErrors.js";
import userRouter from "./routes/UserRoute.js";
import orderRouter from "./routes/OrderRoute.js";

const port = process.env.PORT || 4321;

dotenv.config();

// Connect to MongoDB
connectToMongoDB();

const app = express();
app.use(express.json());
// =====================ENPOINTS====================

//seed the database
app.use("/api/seed", SeedData);

//Products
app.use("/api/products", productRoute);

// Users
app.use("/api/user", userRouter);

// Orders
app.use("/api/orders", orderRouter);

// =====================ERROR HANDLING====================
app.use(errorHandler);
app.use(notFoundError);

// =====================HEALTH CHECK====================
app.get("/health", (req, res) => {
  res.send("Server is up and running");
});

// =====================START SERVER====================
app.listen(port, () => {
  logger.debug(`Current environment: ${process.env.NODE_ENV}`);
  logger.http(`Server started on port http://localhost:${port}`);
});
