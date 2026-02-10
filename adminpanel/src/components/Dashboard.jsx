import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const cards = [
    {
      title: "Products",
      description: "Manage your product list",
      path: "/admin/products",
      icon: "🛍️",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Add Category",
      description: "Create product categories",
      path: "/admin/add-category",
      icon: "📂",
      color: "from-teal-500 to-green-600",
    },
    {
      title: "Add Product",
      description: "Add new medical products",
      path: "/admin/products/add",
      icon: "➕",
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Contact Page",
      description: "Edit contact details",
      path: "/admin/contact",
      icon: "📞",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className={`bg-gradient-to-br ${card.color} text-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 hover:-translate-y-2 transition-all duration-300`}
          >
            <div className="text-6xl mb-4">{card.icon}</div>
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="text-sm opacity-90 mt-2">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
