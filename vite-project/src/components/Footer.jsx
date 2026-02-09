import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // WhatsApp
  const whatsappNumber = "919894036428";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  // ✅ Exact Keva Kaipo map
  const mapLink = "https://g.page/r/CVdM32M9bfksEAE";

  // ✅ SAME LOGIC AS NAVBAR
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
  };

  return (
    <footer className="bg-[#0b1220] text-gray-300 pt-14">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Keva Kaipo</h3>
          <p className="text-sm leading-relaxed">
            Authorized Keva Stock Point offering genuine Ayurvedic products,
            wellness solutions, and health checkup services.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">

            <li
              className="cursor-pointer hover:text-green-400"
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className="cursor-pointer hover:text-green-400"
              onClick={() => goToSection("categories")}
            >
              Categories
            </li>

            <li
              className="cursor-pointer hover:text-green-400"
              onClick={() => goToSection("health")}
            >
              Health Checkup
            </li>

            <li
              className="cursor-pointer hover:text-green-400"
              onClick={() => navigate("/about")}
            >
              About Us
            </li>

            <li
              className="cursor-pointer hover:text-green-400"
              onClick={() => goToSection("contact")}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="text-white font-semibold mb-3">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Ayurvedic Medicines</li>
            <li>Herbal & Organic Products</li>
            <li>Full Body Health Analyzer</li>
            <li>Detox & Wellness Services</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm hover:text-green-400 mb-2"
          >
            📲 WhatsApp: +91 98940 36428
          </a>

          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm hover:text-green-400 mb-2"
          >
            📍 Keva Kaipo – View on Google Maps
          </a>

          <p className="text-sm text-gray-400">
            Authorized Keva Stock Point – India
          </p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Keva Kaipo. All rights reserved.
      </div>
    </footer>
  );
}
