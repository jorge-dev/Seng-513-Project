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
import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid';


const port = process.env.PORT || 4321;
const secretKey = process.env.STRIPE_SECRET_KEY;
console.log(secretKey);
dotenv.config();
const stripe2 = new Stripe(`${secretKey}`, {
  apiVersion: "2020-03-02",
  typescript: true,
});
// Connect to MongoDB
connectToMongoDB();

const app = express();
app.use(express.json());
// add a delay to simulate a slow server
// app.use((req, res, next) => {
//   setTimeout(() => {
//     next();
//   }, 5000);
// });

// =====================ENPOINTS====================

app.post("/api/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { order, token } = req.body;

    const customer = await stripe2.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuidv4();
    const charge = await stripe2.charges.create(
      {
        amount: Math.ceil(order.itemsPrice) * 100,
        currency: "cad",
        customer: customer.id,


      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "Paid";
    error = "";
  } catch (err) {
    console.error("Error:", err);
    error = err.message;
    status = "Declined";
  }

  res.json({ status, error });
});

//seed the database
app.use("/api/seed", SeedData);

//Products
app.use("/api/products", productRoute);

// Users
app.use("/api/users", userRouter);

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
