import Category from "../models/categoryModel.js";

// ✅ Fetch categories for customers by TYPE
export const getPublicCategories = async (req, res) => {
  try {
    const { type } = req.query; // KEVA or ORGANIC

    let filter = {};
    if (type) {
      filter.type = type.toUpperCase();
    }

    const categories = await Category.find(filter).select(
      "name image type"
    );

    res.json(categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};
