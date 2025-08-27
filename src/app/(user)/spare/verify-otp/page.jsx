"use client";
import Header from "@/components/user/spare/Header";
import { useState } from "react";

export default function page() {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    
    if (element.value !== "" && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div>
        <Header></Header>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-6 text-black">Verify OTP</h2>
            <label className="block text-sm text-left mb-2 text-black">Enter your OTP</label>
            <div className="flex justify-between mb-8">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-12 text-black border rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-200"
                />
              ))}
            </div>
            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition">
              Log in
            </button>
          </div>
        </div>
    </div>
  );
}
