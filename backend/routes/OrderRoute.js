import express from "express";
import asyncHandler from "express-async-handler";
import logger from "../logger/devLogger.js";
import { authenticate, authenticateAdmin } from "../Middleware/HandleAuth.js";
import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";
import slugify from "../utils/slugify.js";

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
      // get user's info
      const user = await User.findById(req.user._id);
      const order = new Order({
        user: user,
        items: req.body.items.map((item) => ({
            ...item,
            slug: slugify(item.name),
            product: item._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingFee: req.body.shippingFee,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
      });
      const newOrder = await order.save();
      res.status(201).send({
        message: `Order has been created for user ${user.name}`,
        newOrder,
      });
    }
  })
);



// get all orders for a user
orderRouter.get(
  "/user",
  authenticate,
  asyncHandler(async (req, res) => {
    logger.debug(`GET /api/orders/user was called`);
    const user = await User.findById(req.user._id);
    logger.debug(`user: ${JSON.stringify(user)}`);
    const orders = await Order.find({ 'user': user._id }).sort({ createdAt: -1 });
    if (!orders) {
      logger.error(`GET /api/orders/user: No orders found for ${req.user.name}`);
      res.status(404);
      throw new Error("No orders found");
    } else {
      const totalOrders = orders.length;
      res.json({
        message: `Success! ${totalOrders} orders were found for ${req.user.name}`,
        numberOfOrders: totalOrders,
        orders,
      });
    }
  })
);



// update order payment status
orderRouter.put(
    "/:id",
    authenticate,
    asyncHandler(async (req, res) => {
        logger.debug(`PUT /api/orders/:id/paid was called`);
        const {status} = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) {
            logger.error(`PUT /api/orders/:id/paid: Order not found`);
            res.status(404);
            throw new Error("Order not found");
        } else {
            // Verify user is the same as the order's user
            if (order.user._id.toString() !== req.user._id.toString()) {
                logger.error(`PUT /api/orders/:id/paid: User not authorized`);
                res.status(401);
                throw new Error("User not authorized to update this order");
      } else {
                order.paymentStatus = status;
        const updatedOrder = await order.save();
        res.json({
          message: `Order ${req.params.id} has been Approved`,
          updatedOrder,
        });
      }
    }
  })
);

// Admin only:get All orders
orderRouter.get(
  "/",
  authenticate,
  authenticateAdmin,
  asyncHandler(async (req, res) => {
    logger.debug(`GET /api/orders for admins was called`);
    const orders = await Order.find({});
    if (!orders) {
      res.status(404);
      throw new Error("No orders were found");
    } else {
      const totalOrders = orders.length;
      res.json({
        message: `Success! ${totalOrders} orders were found`,
        numberOfOrders: totalOrders,
        orders,
      });
    }
  })
);

export default orderRouter;

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
      res.json({ message: `Order found`, order });
    }
  })
);
