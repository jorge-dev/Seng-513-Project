import express from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import logger from "../logger/devLogger.js";
import { authenticate } from "../Middleware/HandleAuth.js";
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

// get product review
productRoute.post(
  "/:id/review",
  authenticate,
  asyncHandler(async (req, res) => {
    logger.http(`GET /api/products/${req.params.id} was called`);
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    } else {
      const hasAlreadyReviewed = product.reviews.some(
        (review) => review.user.toString() === req.user._id.toString()
      );
      if (hasAlreadyReviewed) {
        res.status(400);
        throw new Error("You have already reviewed this product");
      } else {
        product.reviews.push({
          name: req.user.name,
          user: req.user._id,
          rating: Number(rating),
          comment,
        });
        product.numberOfReviews += product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, review) => review.rating + acc, 0) /
          product.reviews.length;
        await product.save();
        res.status(201).json({ message: "Review was added", product });
      }
    }
  })
);

export default productRoute;
