import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

const AddProduct = ({ onProductAdded }) => {
  const [form, setForm] = useState({
    nameEn: "",
    nameTa: "",
    stock: "",
    category: "",
    type: "",
    description: "",
    imageFile: null,
    imageUrl: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/admin/category`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageFile") {
      const file = files[0];
      setForm({ ...form, imageFile: file, imageUrl: "" });
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else if (name === "imageUrl") {
      setForm({ ...form, imageUrl: value, imageFile: null });
      setImagePreview(value || null);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nameEn", form.nameEn);
      formData.append("nameTa", form.nameTa);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      formData.append("type", form.type);
      formData.append("description", form.description);

      if (form.imageFile) {
        formData.append("image", form.imageFile);
      } else if (form.imageUrl) {
        formData.append("imageUrl", form.imageUrl);
      }

      await axios.post(
        `${API_URL}/api/auth/admin/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product added successfully");

      setForm({
        nameEn: "",
        nameTa: "",
        stock: "",
        category: "",
        type: "",
        description: "",
        imageFile: null,
        imageUrl: "",
      });
      setImagePreview(null);

      onProductAdded && onProductAdded();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="nameEn"
          value={form.nameEn}
          onChange={handleChange}
          placeholder="Product Name (English)"
          className="w-full p-3 border rounded"
          required
        />

        <ReactTransliterate
          value={form.nameTa}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, nameTa: text }))
          }
          lang="ta"
          placeholder="பொருள் பெயர் (தமிழ்)"
          className="w-full p-3 border rounded"
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-3 border rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name?.en} / {cat.name?.ta}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Product Type</option>
          <option value="KEVA">KEVA</option>
          <option value="ORGANIC">ORGANIC</option>
        </select>

        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="w-full p-3 border rounded"
        />

        <input
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-40 h-40 object-cover rounded"
          />
        )}

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default AddProduct;
