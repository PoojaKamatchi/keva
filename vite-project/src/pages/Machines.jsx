import MachineCard from "../components/MachineCard";

export default function Machines() {
  const machines = [
    {
      id: 1,
      name: "Physiotherapy Therapy Machine",
      image: "https://m.media-amazon.com/images/I/714ZeMOkHdL.jpg",
      benefits: [
        "Reduces muscle pain and stiffness",
        "Improves blood circulation",
        "Speeds up injury recovery",
        "Relieves joint and back pain",
      ],
    },
    {
      id: 2,
      name: "Electric Muscle Stimulator",
      image: "https://m.media-amazon.com/images/I/51BH5dRsc8L._AC_SL1000_.jpg",
      benefits: [
        "Strengthens weak muscles",
        "Improves muscle flexibility",
        "Reduces nerve and muscle pain",
        "Ideal for physiotherapy treatment",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-8 text-green-700">
        Physiotherapy Machines
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </div>
  );
}
