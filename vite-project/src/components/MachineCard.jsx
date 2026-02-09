export default function MachineCard({ machine }) {
  const whatsappNumber = "919XXXXXXXXX"; // 🔴 Replace with your WhatsApp number

  const whatsappMessage = `Hello, I would like to book an appointment for ${machine.name}.`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="w-72 bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300">
      <img
        src={machine.image}
        alt={machine.name}
        className="w-full h-44 object-cover rounded-t-xl"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/300x200";
        }}
      />

      <div className="p-4">
        <h3 className="font-bold text-lg text-green-700 mb-2">
          {machine.name}
        </h3>

        <ul className="text-sm text-gray-700 space-y-1 mb-4">
          {machine.benefits.map((benefit, index) => (
            <li key={index}>✔ {benefit}</li>
          ))}
        </ul>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          📲 Book Appointment
        </a>
      </div>
    </div>
  );
}
