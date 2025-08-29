"use client";
import { useState } from "react";
import Header from "@/components/user/spare/Header";
import Footer from "@/components/landing/Footer";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !number) return;
    
    dispatch(registerUser({ name, number }))
      .unwrap()
      .then(() => {
        router.push("/spare/verify-otp");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-black">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-black">Enter your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-black border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-sm mb-2 text-black">Enter your Mobile number</label>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full text-black border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              
            </div>
            <p className="text-xs text-gray-600 mb-6 text-black">
              By continuing, you agree to the{" "}
              <a href="#" className="underline">
                Terms of use
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy.
              </a>
            </p>
            
            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition disabled:bg-gray-400"
            >
              {loading ? "Sending OTP..." : "Register"}
            </button>
          </form>
          <div className="text-center mt-2 text-sm text-black">
            Already have an account?{" "}
            <a href="/spare/login" className="underline">
              Sign In
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}