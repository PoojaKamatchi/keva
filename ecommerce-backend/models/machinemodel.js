import mongoose from "mongoose";

const machineSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // uploads/filename.jpg
  },
  { timestamps: true }
);

const Machine = mongoose.model("Machine", machineSchema);
export default Machine;
