import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import nodemailer from "nodemailer";

/* ===================== EMAIL SETUP ===================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS, // app password
  },
});

const sendOtpEmail = async (email, otp, purpose) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Your OTP for ${purpose}`,
    text: `Your OTP is ${otp}. It will expire in 2 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

/* ================= REGISTER (SEND OTP) ================= */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.create({
    name,
    email,
    password,
    registerOtp: otp,
    registerOtpExpire: Date.now() + 2 * 60 * 1000, // 2 minutes
    isVerified: false,
  });

  // send email
  await sendOtpEmail(email, otp, "Registration");

  res.status(201).json({
    message: "OTP sent for registration",
    userId: user._id,
  });
};

/* ================= VERIFY REGISTER OTP ================= */
export const verifyRegisterOtp = async (req, res) => {
  const { userId, otp } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.registerOtp !== otp || Date.now() > user.registerOtpExpire)
    return res.status(400).json({ message: "Invalid or expired OTP" });

  user.isVerified = true;
  user.registerOtp = null;
  user.registerOtpExpire = null;
  await user.save();

  res.json({
    message: "Registration successful",
    token: generateToken(user._id),
  });
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.isVerified)
    return res.status(401).json({ message: "Please verify OTP first" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email },
  });
};

/* ================= FORGOT PASSWORD (SEND OTP) ================= */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetOtp = otp;
  user.resetOtpExpire = Date.now() + 2 * 60 * 1000; // 2 minutes
  await user.save();

  // send email
  await sendOtpEmail(email, otp, "Password Reset");

  res.json({ message: "OTP sent", userId: user._id });
};

/* ================= VERIFY OTP (FOR RESET) ================= */
export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.resetOtp !== otp || Date.now() > user.resetOtpExpire)
    return res.status(400).json({ message: "Invalid or expired OTP" });

  res.json({ message: "OTP verified" });
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  const { userId, otp, newPassword } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.resetOtp !== otp || Date.now() > user.resetOtpExpire)
    return res.status(400).json({ message: "Invalid or expired OTP" });

  user.password = newPassword; // pre-save will hash
  user.resetOtp = null;
  user.resetOtpExpire = null;

  await user.save();
  res.json({ message: "Password reset successful" });
};

/* ================= RESEND OTP ================= */
export const resendOtp = async (req, res) => {
  const { userId, type } = req.body; // type = "register" or "reset"

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  if (type === "register") {
    user.registerOtp = otp;
    user.registerOtpExpire = Date.now() + 2 * 60 * 1000;
    await sendOtpEmail(user.email, otp, "Registration");
  } else if (type === "reset") {
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 2 * 60 * 1000;
    await sendOtpEmail(user.email, otp, "Password Reset");
  } else {
    return res.status(400).json({ message: "Invalid type" });
  }

  await user.save();

  res.json({ message: "OTP resent successfully" });
};
