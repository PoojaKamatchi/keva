import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Appointment() {
  const { machineId } = useParams();

  const [machine, setMachine] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    api.get(`/api/machines/${machineId}`)
      .then(res => setMachine(res.data))
      .catch(() => toast.error("Machine not found"));
  }, [machineId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/appointments", {
        ...form,
        machine: machineId,
      });

      toast.success("Appointment booked successfully!");
      setForm({ name: "", phone: "", date: "", time: "" });
    } catch {
      toast.error("Booking failed");
    }
  };

  if (!machine) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="bg-[#f6fbf7] min-h-screen py-16">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Book Appointment
        </h2>

        <p className="mb-6 text-gray-600">
          Machine: <strong>{machine.name}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded">
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
