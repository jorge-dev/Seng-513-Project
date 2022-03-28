import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    ],
    shippingAddress: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, default: "pending" },
    orderedAt: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
