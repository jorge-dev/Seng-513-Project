import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger/devLogger.js";
import testRouter from "./routes/testRouter.js";

const port = process.env.PORT || 4321;

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

const app = express();

// =====================ENPOINTS====================

app.use("/api/test", testRouter);

// health check endpoint
app.get("/health", (req, res) => {
  res.send("Server is up and running");
});

app.listen(port, () => {
  logger.http(`Server started on port http://localhost:${port}`);
});
