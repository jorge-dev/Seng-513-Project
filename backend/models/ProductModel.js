import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
      name: {type: String, required: false, default: "Anonymous"},
      user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
      rating: {type: Number, required: true, min: 0, max: 5, default: 0},
      comment: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    vendor: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    inStock: { type: Boolean, required: true, default: true },
    rating: { type: Number, required: true, default: 0, min: 0, max: 5 },
    numberOfReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
