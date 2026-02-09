// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../assets/logo Ecom.jpg";
import bgVideo from "../assets/video.mp4";

export default function Login() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [mode, setMode] = useState("login"); // login | register | verify | forgot | otp | reset
  const [otpTimer, setOtpTimer] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    userId: "",
    newPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ===================== AUTH HANDLER ===================== */
  const handleAuth = async () => {
    try {
      /* ---------- LOGIN ---------- */
      if (mode === "login") {
        const res = await axios.post(`${API_URL}/api/users/login`, {
          email: form.email,
          password: form.password,
        });

        // ✅ Save data in the correct keys for Layout.jsx
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userEmail", res.data.user.email);

        toast.success("Login successful");
        navigate("/");
        window.dispatchEvent(new Event("storage")); // update Layout.jsx
      }

      /* ---------- REGISTER ---------- */
      if (mode === "register") {
        const res = await axios.post(`${API_URL}/api/users/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        toast.success("OTP sent to your email");
        setForm({ ...form, userId: res.data.userId });
        setOtpTimer(120);
        setMode("verify");
      }

      /* ---------- VERIFY REGISTER OTP ---------- */
      if (mode === "verify") {
        await axios.post(`${API_URL}/api/users/verify-register-otp`, {
          userId: form.userId,
          otp: form.otp,
        });

        toast.success("Registration successful! Please login");
        setOtpTimer(0);
        setMode("login");
      }

      /* ---------- FORGOT PASSWORD ---------- */
      if (mode === "forgot") {
        const res = await axios.post(`${API_URL}/api/users/forgot-password`, {
          email: form.email,
        });

        toast.success("OTP sent to your email");
        setForm({ ...form, userId: res.data.userId });
        setOtpTimer(120);
        setMode("otp");
      }

      /* ---------- VERIFY OTP (FOR RESET) ---------- */
      if (mode === "otp") {
        await axios.post(`${API_URL}/api/users/verify-otp`, {
          userId: form.userId,
          otp: form.otp,
        });

        toast.success("OTP verified");
        setOtpTimer(0);
        setMode("reset");
      }

      /* ---------- RESET PASSWORD ---------- */
      if (mode === "reset") {
        await axios.put(`${API_URL}/api/users/reset-password`, {
          userId: form.userId,
          otp: form.otp,
          newPassword: form.newPassword,
        });

        toast.success("Password reset successful");
        setOtpTimer(0);
        setMode("login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  /* ===================== OTP TIMER ===================== */
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  // Stop OTP timer if we leave OTP/verify mode
  useEffect(() => {
    if (mode !== "otp" && mode !== "verify") {
      setOtpTimer(0);
    }
  }, [mode]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  /* ===================== RESEND OTP ===================== */
  const handleResendOtp = async () => {
    try {
      const type = mode === "verify" ? "register" : "reset";
      await axios.post(`${API_URL}/api/users/resend-otp`, {
        userId: form.userId,
        type,
      });
      toast.success("OTP resent successfully");
      setOtpTimer(120);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  /* ===================== UI ===================== */
  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover brightness-[0.45]"
      />

      <ToastContainer />

      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* LEFT */}
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-bold text-center mb-6">
              {mode === "login" && "Welcome Back"}
              {mode === "register" && "Create Account"}
              {mode === "verify" && "Verify OTP"}
              {mode === "forgot" && "Forgot Password"}
              {mode === "otp" && "Verify OTP"}
              {mode === "reset" && "Reset Password"}
            </h2>

            <div className="flex flex-col gap-4">
              {mode === "register" && <input name="name" placeholder="Name" onChange={handleChange} />}
              {mode !== "otp" && mode !== "reset" && <input name="email" placeholder="Email" onChange={handleChange} />}
              {(mode === "login" || mode === "register") && <input type="password" name="password" placeholder="Password" onChange={handleChange} />}
              {(mode === "otp" || mode === "reset" || mode === "verify") && <input name="otp" placeholder="OTP" onChange={handleChange} />}
              {mode === "reset" && <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} />}

              {otpTimer > 0 && <p className="text-sm">Expires in {formatTime(otpTimer)}</p>}

              {otpTimer <= 0 && (mode === "otp" || mode === "verify") && (
                <button onClick={handleResendOtp} className="text-sm text-blue-400 underline">
                  Resend OTP
                </button>
              )}

              <button onClick={handleAuth} className="py-3 bg-blue-600 rounded-lg hover:bg-blue-700">Submit</button>
            </div>

            <div className="mt-4 text-center space-y-1">
              <p onClick={() => setMode("login")} className="cursor-pointer">Login</p>
              <p onClick={() => setMode("register")} className="cursor-pointer">Register</p>
              <p onClick={() => setMode("forgot")} className="cursor-pointer">Forgot Password?</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center">
            <img src={logo} className="w-36 h-36 rounded-full mb-4" />
            <h1 className="text-3xl font-bold text-center">Life Gain Herbal Products</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
