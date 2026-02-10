import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { ReactTransliterate } from "react-transliterate";
import "react-toastify/dist/ReactToastify.css";
import "react-transliterate/dist/index.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nameEn: "",
    nameTa: "",
    stock: "",
    category: "",
    type: "", // ✅ REQUIRED
    description: "",
    imageUrl: "",
    imageFile: null,
  });

  const token = localStorage.getItem("adminToken");

  // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data || []);
    } catch (err) {
      toast.error("❌ Failed to load products");
    }
  };

  // ---------------- FETCH CATEGORIES ----------------
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/admin/category`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data || []);
    } catch {
      toast.error("❌ Failed to load categories");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Admin login required");
      return;
    }
    fetchProducts();
    fetchCategories();
  }, []);

  // ---------------- IMAGE SOURCE ----------------
  const getImageSource = (p) => {
    if (p.image?.startsWith("http")) return p.image;
    if (p.image) return `${API_URL}${p.image}`;
    return "https://via.placeholder.com/200x150";
  };

  // ---------------- EDIT ----------------
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nameEn: product.name?.en || "",
      nameTa: product.name?.ta || "",
      stock: product.stock || "",
      category: product.category?._id || product.category || "",
      type: product.type || "", // ✅ IMPORTANT
      description: product.description || "",
      imageUrl: product.image?.startsWith("http") ? product.image : "",
      imageFile: null,
    });
    setImagePreview(getImageSource(product));
  };

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageFile" && files?.length > 0) {
      const file = files[0];
      setFormData((p) => ({ ...p, imageFile: file, imageUrl: "" }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
      if (name === "imageUrl") setImagePreview(value);
    }
  };

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("nameEn", formData.nameEn);
      data.append("nameTa", formData.nameTa);
      data.append("stock", formData.stock);
      data.append("category", formData.category);
      data.append("type", formData.type); // ✅ REQUIRED
      data.append("description", formData.description);

      if (formData.imageFile) {
        data.append("image", formData.imageFile);
      } else if (formData.imageUrl) {
        data.append("imageUrl", formData.imageUrl);
      }

      await axios.put(
        `${API_URL}/api/auth/admin/products/${editingProduct._id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Product updated");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await axios.delete(`${API_URL}/api/auth/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("🗑️ Deleted");
      fetchProducts();
    } catch {
      toast.error("❌ Delete failed");
    }
  };

  return (
    <div className="p-10 bg-gradient-to-br from-blue-100 to-indigo-200 min-h-screen">
      <ToastContainer autoClose={2000} />

      <h1 className="text-4xl font-bold text-center mb-10">🛍️ Products</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <motion.div key={p._id} className="bg-white p-5 rounded-xl shadow">
            <img src={getImageSource(p)} className="h-40 w-full rounded mb-2" />
            <h2 className="font-bold">{p.name?.en}</h2>
            <p className="text-sm">{p.name?.ta}</p>
            <p>📦 Stock: {p.stock}</p>
            <p>🏷️ Type: {p.type}</p>

            <div className="flex justify-between mt-3">
              <button onClick={() => handleEdit(p)} className="bg-yellow-400 px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(p._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <input name="nameEn" value={formData.nameEn} onChange={handleChange} className="w-full border p-2 mb-2" />

            <ReactTransliterate
              value={formData.nameTa}
              onChangeText={(t) => setFormData((p) => ({ ...p, nameTa: t }))}
              lang="ta"
              className="w-full border p-2 mb-2"
            />

            <select name="type" value={formData.type} onChange={handleChange} className="w-full border p-2 mb-2">
              <option value="">Select Type</option>
              <option value="KEVA">KEVA</option>
              <option value="ORGANIC">ORGANIC</option>
            </select>

            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 mb-2" />

            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full border p-2 mb-2" />

            <input type="file" name="imageFile" onChange={handleChange} />

            {imagePreview && <img src={imagePreview} className="h-24 mt-2" />}

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setEditingProduct(null)} className="bg-gray-400 px-4 py-2 rounded text-white">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-blue-600 px-4 py-2 rounded text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
