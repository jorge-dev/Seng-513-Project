import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger/devLogger.js";
import products from "./data/Products.js";
import connectToMongoDB from "./config/MongoDBConnection.js";
import SeedData from "./SeedDB.js";
import productRoute from "./routes/ProductRoute.js";
import { errorHandler, notFoundError } from "./Middleware/HandleErrors.js";

const port = process.env.PORT || 4321;

dotenv.config();

// Connect to MongoDB
connectToMongoDB();

const app = express();

// =====================ENPOINTS====================

//seed the database
app.use("/api/seed", SeedData);

//get all products
app.use("/api/products", productRoute);

// =====================ERROR HANDLING====================
app.use(errorHandler);
app.use(notFoundError);

// =====================HEALTH CHECK====================
app.get("/health", (req, res) => {
  res.send("Server is up and running");
});

// =====================START SERVER====================
app.listen(port, () => {
  logger.http(`Server started on port http://localhost:${port}`);
});
