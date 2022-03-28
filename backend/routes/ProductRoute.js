import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import logger from "../logger/devLogger.js";
import Product from "../models/ProductModel.js";

const productRoute = express.Router();

// get all products
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    logger.http(`GET /api/products was called`);
    const products = await Product.find({});
    res.json(products);
  })
);

// get a single product
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    logger.http(`GET /api/products/${req.params.id} was called`);
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    } else {
      res.json(product);
    }
  })
);

export default productRoute;
