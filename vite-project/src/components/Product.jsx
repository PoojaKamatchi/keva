import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";

export default function ProductPage() {
  const { id } = useParams(); // category id
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`${API_URL}/api/products/category/${id}`)
      .then(res => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p className="text-center mt-20">Loading products...</p>;

  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;

  if (!products.length)
    return <p className="text-center mt-20">No products 😢</p>;

  const categoryName =
    lang === "ta"
      ? products[0]?.category?.name?.ta
      : products[0]?.category?.name?.en;

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
        {categoryName || "Products"}
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {products.map(product => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="cursor-pointer bg-white rounded-xl shadow-lg p-4 w-72 hover:scale-105 transition"
          >
            <img
              src={product.image}
              alt={lang === "ta" ? product.name?.ta : product.name?.en}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="mt-3 font-semibold text-lg text-center">
              {lang === "ta"
                ? product.name?.ta
                : product.name?.en}
            </h3>

            {/* ✅ DESCRIPTION NOW SHOWS */}
            <p className="text-sm text-gray-600 mt-2 text-center">
              {lang === "ta"
                ? product.description?.ta
                : product.description?.en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
