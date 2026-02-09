import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CATEGORY_TITLES = {
  keva: "Keva Products",
  organic: "Organic Products",
};

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/category/${id}`)
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        {CATEGORY_TITLES[id] || "Products"}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <img
                src={p.image || "https://via.placeholder.com/300"}
                alt={p.name?.en}
                className="h-48 w-full object-cover rounded"
              />

              <h2 className="mt-3 font-semibold text-center text-lg">
                {p.name?.en}
              </h2>

              <p className="mt-2 text-sm text-gray-600 text-center line-clamp-3">
                {p.description?.en}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
