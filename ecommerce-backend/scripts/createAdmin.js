import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/adminModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  await Admin.create({
    name: "Main Admin",
    email: "admin@gmail.com",
    password: "admin123", // will auto-hash
  });

  console.log("✅ Admin created successfully");
  process.exit();
};

createAdmin();
