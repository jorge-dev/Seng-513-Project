import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger/devLogger.js";

const app = express();

const port = process.env.PORT || 8000;
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Successfully connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB", err);
  });

// health check endpoint
app.get("/health", (req, res) => {
  res.send("Server is up and running");
});

app.listen(port, () => {
  logger.http(`Server started on port http://localhost:${port}`);
});
