import { useEffect, useState } from "react";
import api from "../services/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const res = await api.get("/api/appointments/admin");
    setAppointments(res.data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>

      <div className="space-y-4">
        {appointments.map((a) => (
          <div
            key={a._id}
            className="bg-white p-4 shadow rounded"
          >
            <p><b>Name:</b> {a.name}</p>
            <p><b>Phone:</b> {a.phone}</p>
            <p><b>Machine:</b> {a.machine?.name}</p>
            <p><b>Date:</b> {a.date}</p>
            <p><b>Time:</b> {a.time}</p>
            <p><b>Status:</b> {a.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
