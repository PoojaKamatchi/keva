import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function SingleProductPage() {
  const { id } = useParams();
  const { lang } = useLanguage();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center py-10">Product not found</p>;
  }

  // ✅ SAFE FALLBACK
  const title =
    lang === "ta"
      ? product.name?.ta || product.name?.en
      : product.name?.en || product.name?.ta;

  const description =
    lang === "ta"
      ? product.description?.ta || product.description?.en
      : product.description?.en || product.description?.ta;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6">

        {/* IMAGE */}
        <img
          src={product.image || "https://via.placeholder.com/500"}
          alt={title}
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* TITLE */}
        <h1 className="mt-6 text-3xl font-bold text-center">
          {title}
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 text-gray-700 text-center text-lg leading-relaxed">
          {description || "No description available"}
        </p>

      </div>
    </div>
  );
}
