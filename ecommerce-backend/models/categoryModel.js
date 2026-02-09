import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ta: { type: String, required: true },
    },
    image: {
      type: String,
    },
    // ✅ NEW FIELD
    type: {
      type: String,
      enum: ["KEVA", "ORGANIC"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
