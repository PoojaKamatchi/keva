import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";
import { LanguageProvider } from "./context/LanguageContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

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

                {/* 🔓 Public Route */}
                <Route path="/login" element={<Login />} />

                {/* 🔐 Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/machines"
                  element={
                    <ProtectedRoute>
                      <Machines />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/category/:id"
                  element={
                    <ProtectedRoute>
                      <CategoryPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/product/:id"
                  element={
                    <ProtectedRoute>
                      <SingleProductPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute>
                      <WishlistPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/contact"
                  element={
                    <ProtectedRoute>
                      <ContactPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/about"
                  element={
                    <ProtectedRoute>
                      <AboutPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/appointment/:machineId"
                  element={
                    <ProtectedRoute>
                      <Appointment />
                    </ProtectedRoute>
                  }
                />

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
