import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ayurImg from "../assets/ayur.jpg";
import contactImg from "../assets/contact.jpg";
import categoryImg from "../assets/category.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ================= STATIC HEALTH MACHINES ================= */
const healthMachines = [
  {
    id: 1,
    name: {
      en: "Full Body Analyzer",
      ta: "முழு உடல் பகுப்பாய்வாளர்",
    },
    image: "https://m.media-amazon.com/images/I/714ZeMOkHdL.jpg",
    benefits: {
      en: [
        "Detects overall health condition in minutes",
        "Identifies vitamin & mineral deficiencies",
        "Monitors organ health & body balance",
        "Helps in early disease prevention",
        "Non-invasive & painless health check",
      ],
      ta: [
        "நிமிடங்களில் முழு உடல் ஆரோக்கிய நிலையை கண்டறிகிறது",
        "வைட்டமின் & கனிம குறைபாடுகளை அடையாளம் காண்கிறது",
        "உறுப்பு ஆரோக்கியம் மற்றும் உடல் சமநிலை கண்காணிப்பு",
        "முன்கூட்டிய நோய் தடுப்பு உதவி",
        "வலியின்றி மற்றும் அபாயமில்லாத சோதனை",
      ],
    },
  },
  {
    id: 2,
    name: {
      en: "Detox Machine",
      ta: "டிடாக்ஸ் இயந்திரம்",
    },
    image: "https://m.media-amazon.com/images/I/51BH5dRsc8L._AC_SL1000_.jpg",
    benefits: {
      en: [
        "Removes toxins from the body",
        "Boosts metabolism and energy levels",
        "Supports weight management",
        "Improves skin clarity and digestion",
        "Enhances overall immunity",
      ],
      ta: [
        "உடலிலிருந்து விஷங்களை அகற்றுகிறது",
        "உடல் சீரமைப்பு மற்றும் சக்தி நிலைகளை மேம்படுத்துகிறது",
        "எடை நிர்வகிப்புக்கு உதவுகிறது",
        "சருமத் தெளிவையும் ஜீரணத்தை மேம்படுத்துகிறது",
        "முழுமையான நோய் எதிர்ப்பு சக்தியை வலுப்படுத்துகிறது",
      ],
    },
  },
];

export default function Home() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedType, setSelectedType] = useState("KEVA");
  const [contact, setContact] = useState(null);
  const [contactLoading, setContactLoading] = useState(true);
  const [language, setLanguage] = useState("en"); // en or ta

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories?type=${selectedType}`)
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error("Category fetch error:", err));
  }, [selectedType]);

  /* ================= FETCH CONTACT ================= */
  useEffect(() => {
    axios
      .get(`${API_URL}/api/contact`)
      .then((res) => setContact(res.data))
      .catch((err) => console.error("Contact fetch error:", err))
      .finally(() => setContactLoading(false));
  }, []);

  const handleHeroClick = (type) => {
    setSelectedType(type);
    setTimeout(() => {
      document
        .getElementById("categories")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ta" : "en"));
  };

  return (
    <div className="bg-[#f6fbf7] relative">

      {/* ================= LANGUAGE TOGGLE TOP-RIGHT ================= */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="bg-white text-green-800 px-4 py-2 rounded-full shadow-lg hover:bg-green-100 transition"
        >
          {language === "en" ? "தமிழ்" : "English"}
        </button>
      </div>

      {/* ================= HERO ================= */}
    {/* ================= HERO ================= */}
<section
  className="relative min-h-[65vh] flex items-center bg-cover bg-center"
  style={{ backgroundImage: `url(${ayurImg})` }}
>
  <div className="absolute inset-0 bg-green-900/40"></div>

  <div className="relative z-10 max-w-4xl mx-auto text-center px-6 text-white">
    <h1 className="text-3xl sm:text-5xl font-bold mb-4">
      {language === "en" ? "Welcome to Keva Kaipo" : "கேவா கைப்போவில் வரவேற்கிறோம்"}
    </h1>
    <p className="text-md sm:text-lg mb-6 sm:mb-8">
      {language === "en"
        ? "Trusted Ayurvedic Products & Health Services"
        : "நம்பகமான ஆயுர்வேத தயாரிப்புகள் மற்றும் சுகாதார சேவைகள்"}
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
      <button
        onClick={() => handleHeroClick("KEVA")}
        className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 hover:bg-green-700 rounded-full font-semibold shadow-lg text-sm sm:text-base"
      >
        {language === "en" ? "Keva Products" : "கேவா தயாரிப்புகள்"}
      </button>

      <button
        onClick={() => handleHeroClick("ORGANIC")}
        className="px-6 sm:px-8 py-2 sm:py-3 bg-yellow-500 hover:bg-yellow-600 rounded-full font-semibold shadow-lg text-sm sm:text-base"
      >
        {language === "en" ? "Organic Products" : "ஆர்கானிக் தயாரிப்புகள்"}
      </button>
    </div>
  </div>
</section>


      {/* ================= CATEGORIES ================= */}
      <section
        id="categories"
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${categoryImg})` }}
      >
        <div className="absolute inset-0 bg-green-900/25"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            {selectedType === "KEVA"
              ? language === "en"
                ? "Keva Product Categories"
                : "கேவா தயாரிப்பு வகைகள்"
              : language === "en"
                ? "Organic Product Categories"
                : "ஆர்கானிக் தயாரிப்பு வகைகள்"}
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
            {categories.length ? (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => navigate(`/category/${cat._id}`)}
                  className="cursor-pointer bg-white/80 p-6 rounded-xl shadow hover:scale-105 transition text-center"
                >
                  <h3 className="text-lg font-semibold text-green-800">
                    {language === "en" ? cat.name?.en || cat.name : cat.name?.ta || cat.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {language === "en" ? "View products →" : "தயாரிப்புகளை பார்க்க →"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-white col-span-full">
                {language === "en" ? "No categories available" : "எந்த வகைகளும் கிடைக்கவில்லை"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= HEALTH MACHINES ================= */}
      <section id="health" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
            {language === "en" ? "Health Checkup Services" : "சுகாதார பரிசோதனை சேவைகள்"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {healthMachines.map((machine) => {
              const whatsappNumber = "919894036428";
              const message =
                language === "en"
                  ? `Hello, I want to book an appointment for ${machine.name.en}`
                  : `வணக்கம், நான் ${machine.name.ta} க்கான சந்திப்பை பதிவு செய்ய விரும்புகிறேன்`;
              const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

              return (
                <div
                  key={machine.id}
                  className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition"
                >
                  <img
                    src={machine.image}
                    alt={language === "en" ? machine.name.en : machine.name.ta}
                    className="w-full h-56 object-cover"
                    onError={(e) =>
                      (e.currentTarget.src = "https://via.placeholder.com/400x250")
                    }
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-green-700 mb-3">
                      {language === "en" ? machine.name.en : machine.name.ta}
                    </h3>

                    <ul className="text-sm text-gray-700 space-y-1 mb-5">
                      {(language === "en" ? machine.benefits.en : machine.benefits.ta).map((b, i) => (
                        <li key={i}>✔ {b}</li>
                      ))}
                    </ul>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
                    >
                      {language === "en" ? "📲 Book Appointment" : "📲 சந்திப்பை பதிவு செய்யவும்"}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: `url(${contactImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-white px-6">
          <h2 className="text-4xl font-bold text-center mb-10">
            {contact?.title || (language === "en" ? "Contact Us" : "எங்களை தொடர்பு கொள்ளவும்")}
          </h2>

          {contactLoading && (
            <p className="text-center">{language === "en" ? "Loading contact info..." : "தொடர்பு தகவல் ஏற்றுகிறது..."}</p>
          )}

          {!contactLoading && contact && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* PHONE */}
              <a
                href={`tel:${contact.phone}`}
                className="bg-white/10 p-6 rounded-xl backdrop-blur hover:bg-white/20 transition"
              >
                <div className="text-3xl mb-3">📞</div>
                <p className="font-semibold">{language === "en" ? "Phone" : "தொலைபேசி"}</p>
                <p>{contact.phone}</p>
              </a>

              {/* EMAIL */}
              <a
                href={`mailto:${contact.email}`}
                className="bg-white/10 p-6 rounded-xl backdrop-blur hover:bg-white/20 transition"
              >
                <div className="text-3xl mb-3">✉️</div>
                <p className="font-semibold">{language === "en" ? "Email" : "மின்னஞ்சல்"}</p>
                <p>{contact.email}</p>
              </a>

              {/* ADDRESS */}
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-6 rounded-xl backdrop-blur hover:bg-white/20 transition"
              >
                <div className="text-3xl mb-3">📍</div>
                <p className="font-semibold">{language === "en" ? "Address" : "முகவரி"}</p>
                <p className="whitespace-pre-line">{contact.address}</p>
              </a>

              {/* EXTRA INFO */}
              <div className="md:col-span-3 bg-white/10 p-6 rounded-xl backdrop-blur text-left">
                <p><strong>{language === "en" ? "Description" : "விபரம்"}:</strong> {contact.description}</p>
                <p><strong>{language === "en" ? "Timings" : "நேரம்"}:</strong> {contact.timings}</p>
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" className="underline">
                    {contact.whatsapp}
                  </a>
                </p>
                <p><strong>{language === "en" ? "Emergency" : "அவசரநிலை"}:</strong> {contact.emergency}</p>
                <p>
                  <strong>{language === "en" ? "Services" : "சேவைகள்"}:</strong>{" "}
                  {contact.services?.length ? contact.services.join(", ") : language === "en" ? "Not available" : "கிடைக்கவில்லை"}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
            {/* ================= FLOATING WHATSAPP ================= */}
      {contact?.whatsapp && (
       <a
  href={`https://wa.me/${contact?.whatsapp || "919894036428"}`}
  target="_blank"
  rel="noreferrer"
  className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 text-white text-3xl rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
>
  💬
</a>

      )}


    </div>
  );
}
