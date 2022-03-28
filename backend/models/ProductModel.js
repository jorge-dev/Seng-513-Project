import mongoose from "mongoose";
import logger from "../logger/devLogger.js";
// Product schema template
// {
//     _id: 1,
//     name: "Logitech DESK MAT Studio Series",
//     vendor: "Logitech",
//     price: 29.99,
//     description:
//       "Beautiful and comfortable desk mat with anti-slip base and spill-resistant design",
//     image:
//       "https://res.cloudinary.com/cloud-513/image/upload/v1648356541/compfest/Accesories/deskMats/LogitechDESKMAT_tsw0vt.webp",
//     mainCategory: "accessories",
//     subCategory: "deskMats",
//     quantity: 0,
//     rating: 0,
//     numberOfReviews: 0,
//   },

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    vendor: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    quantity: { type: Number, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    numberOfReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
