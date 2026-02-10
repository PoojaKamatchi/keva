import { useState } from "react";
import axios from "axios";

export default function Machines() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    await axios.post("http://localhost:5000/api/machines", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Machine added successfully");
    setName("");
    setDescription("");
    setImage(null);
  };

  return (
    <form onSubmit={submitHandler} className="p-6 max-w-md mx-auto">
      <input
        placeholder="Machine Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-3"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-3"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Machine
      </button>
    </form>
  );
}
