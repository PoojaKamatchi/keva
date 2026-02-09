import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/contact`).then((res) => setContact(res.data));
  }, []);

  if (!contact) {
    return (
      <p className="text-center mt-32 text-lg">
        Loading contact details...
      </p>
    );
  }

  // ✅ OFFICIAL KEVA KAIPO MAP
  const mapLink = "https://g.page/r/CVdM32M9bfksEAE";
  const embedMap =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.222550522961!2d77.2811368!3d10.9959485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9ab6fa2fb1091:0x2cf96d3d63df4c57!2sKeva%20Kaipo!5e0!3m2!1sen!2sin!4v1700000000000";

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 px-4 py-20">
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-3">
          {contact.title}
        </h1>

        <p className="text-center text-gray-600 mb-12">
          {contact.description}
        </p>

        {/* ================= CONTACT INFO ================= */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">

          {/* 📞 PHONE (CALL OPTION) */}
          <a
            href={`tel:${contact.phone}`}
            className="group flex items-center justify-between p-4 rounded-xl border
                       hover:bg-blue-50 hover:shadow-lg hover:scale-[1.02]
                       transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl group-hover:animate-bounce">📞</span>
              <span className="font-medium text-gray-700">Call Us</span>
            </div>
            <span className="text-blue-600 font-semibold">
              {contact.phone}
            </span>
          </a>

          {/* 💬 WHATSAPP */}
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between p-4 rounded-xl border
                       hover:bg-green-50 hover:shadow-lg hover:scale-[1.02]
                       transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl group-hover:animate-pulse">💬</span>
              <span className="font-medium text-gray-700">WhatsApp</span>
            </div>
            <span className="text-green-600 font-semibold">
              Chat Now
            </span>
          </a>

          {/* 📧 EMAIL */}
          <a
            href={`mailto:${contact.email}`}
            className="group flex items-center justify-between p-4 rounded-xl border
                       hover:bg-purple-50 hover:shadow-lg hover:scale-[1.02]
                       transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl group-hover:rotate-12 transition">📧</span>
              <span className="font-medium text-gray-700">Email</span>
            </div>
            <span className="text-purple-600 font-semibold">
              {contact.email}
            </span>
          </a>

          {/* 📍 ADDRESS (LIKE FOOTER) */}
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between p-4 rounded-xl border
                       hover:bg-red-50 hover:shadow-lg hover:scale-[1.02]
                       transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl group-hover:animate-bounce">📍</span>
              <span className="font-medium text-gray-700">Address</span>
            </div>
            <span className="text-red-600 font-semibold text-right text-sm">
              Keva Kaipo<br />
              Authorized Keva Stock Point
            </span>
          </a>
        </div>

        {/* ================= GOOGLE MAP ================= */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            title="Keva Kaipo Location"
            src={embedMap}
            className="w-full h-96 border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* ================= FLOATING WHATSAPP ================= */}
      <a
        href={`https://wa.me/${contact.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 text-white text-3xl
                   rounded-full flex items-center justify-center shadow-2xl
                   hover:scale-110 hover:rotate-6 transition-all duration-300
                   animate-pulse z-50"
      >
        💬
      </a>
    </div>
  );
}
