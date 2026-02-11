import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";
import { LanguageProvider } from "./context/LanguageContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import SingleProductPage from "./components/SingleProductPage";
import Cart from "./pages/Cart";
import WishlistPage from "./pages/WishlistPage";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/AboutPage";
import Appointment from "./pages/Appointment";
import Machines from "./pages/Machines";

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>

            {/* 🔒 Fixed Navbar */}
            <Navbar />

            {/* 🔽 Offset for fixed navbar height */}
            <div className="pt-16 min-h-screen">
              <Routes>

                {/* Public Routes (No Login Required) */}
                <Route path="/" element={<Home />} />
                <Route path="/machines" element={<Machines />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/product/:id" element={<SingleProductPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/appointment/:machineId" element={<Appointment />} />

                {/* Optional Login Page (still available if needed) */}
                <Route path="/login" element={<Login />} />

              </Routes>
            </div>

            {/* 🔻 Footer */}
            <Footer />

          </Router>
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
