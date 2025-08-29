"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/user/spare/Header";
import Footer from "@/components/landing/Footer";
import { loginUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!number) return;
    dispatch(loginUser({ number }))
      .unwrap()
      .then(() => {
        // Redirect after the action is completed
        router.push("/spare/verify-otp");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-black">Log in</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4 relative">
              <label className="block text-sm mb-2 text-black">
                Enter your Mobile number
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full text-black border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition"
            >
              {loading ? "Sending OTP..." : "Log in"}
            </button>
          </form>
          <div className="text-center mt-2 text-sm text-black">
            Don't have an account?{" "}
            <a href="/spare/register" className="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}