import { useState } from "react";
import clientPhoto from "../assets/client.jpg"; // Client photo

export default function AboutPage() {
  const [language, setLanguage] = useState("en");

  const whatsappNumber = "919894036428";
  const whatsappMessage =
    language === "en"
      ? "Hello, I would like to know more about Keva products and services."
      : "வணக்கம், கேவா தயாரிப்புகள் மற்றும் சேவைகள் குறித்து மேலும் அறிய விரும்புகிறேன்.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="bg-green-50 min-h-screen relative">

      {/* ================= LANGUAGE TOGGLE ================= */}
      <button
        onClick={() => setLanguage(language === "en" ? "ta" : "en")}
        className="fixed top-4 right-4 bg-white text-green-800 px-4 py-2 rounded-full shadow-md hover:bg-green-100 z-50"
      >
        {language === "en" ? "தமிழ்" : "English"}
      </button>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

          {/* PHOTO */}
          <img
            src={clientPhoto}
            alt="Keva Director"
            className="w-56 h-56 rounded-full object-cover shadow-lg border-4 border-green-200"
          />

          {/* CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
              {language === "en"
                ? "Meet Our Director"
                : "எங்கள் இயக்குநரை சந்திக்கவும்"}
            </h1>

            <p className="text-lg text-gray-700 mb-4">
              {language === "en"
                ? "Our Director is an Authorized Keva Stock Point Holder with over 10 years of experience in Ayurvedic wellness and healthcare products."
                : "எங்கள் இயக்குநர் 10 ஆண்டுகளுக்கும் மேலான அனுபவம் கொண்ட அங்கீகரிக்கப்பட்ட கேவா ஸ்டாக் பாயிண்ட் ஹோல்டர் ஆவார்."}
            </p>

            <p className="text-lg text-gray-700 mb-4">
              {language === "en"
                ? "Recently appointed as a Director at Keva, ensuring that every product delivered to customers is authentic, safe, and approved."
                : "சமீபத்தில் கேவா நிறுவனத்தின் இயக்குநராக நியமிக்கப்பட்டு, ஒவ்வொரு தயாரிப்பும் நம்பகமானதும் பாதுகாப்பானதும் என்பதை உறுதி செய்கிறார்."}
            </p>

            <p className="text-lg italic text-green-700 mb-6">
              {language === "en"
                ? "“Trust, quality, and natural wellness are the foundation of our service.”"
                : "“நம்பிக்கை, தரம் மற்றும் இயற்கை நலம் என்பதே எங்கள் சேவையின் அடித்தளம்.”"}
            </p>

            {/* WHATSAPP BUTTON */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition shadow-lg"
            >
              📲 {language === "en" ? "Contact on WhatsApp" : "WhatsApp மூலம் தொடர்பு கொள்ளுங்கள்"}
            </a>
          </div>
        </div>
      </section>

      {/* ================= MISSION SECTION ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            {language === "en" ? "Our Mission" : "எங்கள் பணி நோக்கம்"}
          </h2>

          <p className="text-lg text-gray-700">
            {language === "en"
              ? "Our mission is to provide genuine Ayurvedic and healthcare products through trusted Keva channels, focusing on customer well-being, transparency, and long-term health."
              : "நம்பகமான கேவா வழிகளின் மூலம் உண்மையான ஆயுர்வேத மற்றும் சுகாதார தயாரிப்புகளை வழங்கி, வாடிக்கையாளர் நலன் மற்றும் நீண்டகால ஆரோக்கியத்தை உறுதி செய்வதே எங்கள் பணி நோக்கம்."}
          </p>
        </div>
      </section>
    </div>
  );
}
