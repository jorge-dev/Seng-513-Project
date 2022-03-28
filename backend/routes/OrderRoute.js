import express from "express";
import asyncHandler from "express-async-handler";
import logger from "../logger/devLogger.js";
import { authenticate } from "../Middleware/HandleAuth.js";
import Order from "../models/OrderModel.js";

const orderRouter = express.Router();

// Add Order
orderRouter.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    logger.debug(`POST /api/orders was called`);
    // check for body to not be empty
    logger.debug(`req.body: ${JSON.stringify(req.body)}`);
    if (Object.keys(req.body).length === 0) {
      logger.error(`POST /api/orders: req.body is empty`);
      res.status(400);
      throw new Error("Request body is missing");
    } else if (req.body.items === undefined || req.body.items.length === 0) {
      logger.error(`POST /api/orders: req.body.orderItems is empty`);
      logger.debug(`req.body: ${JSON.stringify(req.body)}`);
      res.status(400);
      throw new Error("There appears to be no items in the order");
    } else {
      const order = new Order({
        user: req.user._id,
        items: req.body.items.map((item) => ({
          ...item,
          product: item.product,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
      });
      const newOrder = await order.save();
      res.status(201).send({ message: "Order has been created", newOrder });
    }
  })
);

// Get Order
orderRouter.get(
  "/:id",
  authenticate,
  asyncHandler(async (req, res) => {
    logger.debug(`GET /api/orders/:id was called`);
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name username email"
    );
    if (!order) {
      logger.error(`GET /api/orders/:id: Order not found`);
      res.status(404);
      throw new Error("Order not found");
    } else {
      res.json(order);
    }
  })
);

// update order apyment status
orderRouter.put(
  "/:id/payed",
  authenticate,
  asyncHandler(async (req, res) => {
    logger.debug(`PUT /api/orders/:id/paid was called`);
    const order = await Order.findById(req.params.id);
    if (!order) {
      logger.error(`PUT /api/orders/:id/paid: Order not found`);
      res.status(404);
      throw new Error("Order not found");
    } else {
      order.paymentStatus = "Approved";
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    }
  })
);

export default orderRouter;
