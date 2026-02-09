import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ta: { type: String },
    },

    description: {
      en: { type: String, default: "" },
      ta: { type: String, default: "" },
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    image: { type: String },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    type: {
      type: String,
      enum: ["KEVA", "ORGANIC"],
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
