import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "user",
    },

    profilePic: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },

    // ✅ REGISTER OTP (for signup verification)
    registerOtp: {
      type: String,
    },
    registerOtpExpire: {
      type: Date,
    },

    // ✅ FORGOT PASSWORD OTP
    resetOtp: {
      type: String,
    },
    resetOtpExpire: {
      type: Date,
    },

    // ✅ Email verified or not
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 🔐 Hash password automatically
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
