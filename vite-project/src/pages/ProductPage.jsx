import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductPage() {
  const { id } = useParams(); // product id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center py-10">Product not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6">

        {/* IMAGE */}
        <img
          src={product.image || "https://via.placeholder.com/500"}
          alt={product.name?.en}
          className="w-full h-96 object-cover rounded-lg"
        />

        {/* TITLE */}
        <h1 className="mt-6 text-3xl font-bold text-center">
          {product.name?.en}
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 text-gray-700 text-center leading-relaxed">
          {product.description?.en}
        </p>

      </div>
    </div>
  );
}
