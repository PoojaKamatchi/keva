import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Scroll to section (works from any page)
  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  // Go home
  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  const navBtn =
    "relative font-medium text-gray-700 hover:text-green-700 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all hover:after:w-full";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <div
            onClick={goHome}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.IuN_4dsVXld3OupCmJusBAHaHa?pid=Api&P=0&h=180"
              alt="Keva Kaipo"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-bold text-lg text-green-700">
              Keva Kaipo
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={goHome} className={navBtn}>
              Home
            </button>

            <button onClick={() => goToSection("categories")} className={navBtn}>
              Categories
            </button>

            {/* ✅ FIXED: Health Checkup scrolls to HOME section */}
            <button onClick={() => goToSection("health")} className={navBtn}>
              Health Checkup
            </button>

            <button onClick={() => navigate("/about")} className={navBtn}>
              About
            </button>

            <button onClick={() => goToSection("contact")} className={navBtn}>
              Contact
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col px-6 py-4 gap-4 font-medium">
            <button onClick={goHome} className="hover:text-green-700">
              Home
            </button>

            <button
              onClick={() => goToSection("categories")}
              className="hover:text-green-700"
            >
              Categories
            </button>

            {/* ✅ FIXED HERE ALSO */}
            <button
              onClick={() => goToSection("health")}
              className="hover:text-green-700"
            >
              Health Checkup
            </button>

            <button
              onClick={() => navigate("/about")}
              className="hover:text-green-700"
            >
              About
            </button>

            <button
              onClick={() => goToSection("contact")}
              className="hover:text-green-700"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
