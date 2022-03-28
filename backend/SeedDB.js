import express from "express";
import asyncHandler from "express-async-handler";
import products from "./data/Products.js";
import users from "./data/Users.js";
import logger from "./logger/devLogger.js";
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";

const SeedDataRouter = express.Router();

SeedDataRouter.post(
  "/users",
  asyncHandler(async (req, res) => {
    // clean the collection
    await User.deleteMany({});
    logger.debug("cleaned the user collection");
    // seed the collection
    const createUser = await User.insertMany(users);
    res.send({ createUser });
    logger.debug("seeded the collection");
  })
);

SeedDataRouter.post(
  "/products",
  asyncHandler(async (req, res) => {
    // clean the collection
    await Product.deleteMany({});
    logger.debug("cleaned the product collection");
    // seed the collection
    const createProduct = await Product.insertMany(products);
    res.send({ createProduct });
    logger.debug("seeded the collection");
  })
);

export default SeedDataRouter;
