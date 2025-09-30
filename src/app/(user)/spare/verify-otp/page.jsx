"use client";
import Header from "@/components/user/spare/Header";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "@/redux/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";


export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [userId, setUserId] = useState(null);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Get userId from localStorage on component mount
    if (typeof window !== "undefined") {
      const tempUserId = localStorage.getItem("tempUserId");
      setUserId(tempUserId);
      
      // Focus the first input
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  }, []);

  const searchParams = useSearchParams();
  const otps = searchParams.get("otp");

  useEffect(() => {
    if (otps) {
      toast.success(`OTP: ${otps}`, { duration: 7000 });
    }
  }, [otps]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (value !== "" && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && otp[index] === "" && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    console.log("Verifying OTP:", otpValue, "for userId:", userId);
    
    if (otpValue.length !== 6) {
      alert("Please enter a complete 6-digit OTP");
      return;
    }
    
    if (!userId) {
      alert("User ID not found. Please try logging in again.");
      return;
    }
    
    dispatch(verifyOtp({ userId, otp: otpValue }))
      .unwrap()
      .then(() => {
        router.push("/spare/home");
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
      });
  };

  return (
    <div>
      <Header />
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
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                className="w-12 h-12 text-black border rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-200"
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}
          <button
            onClick={handleVerifyOtp}
            disabled={loading || !userId}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          
          {/* Debug info */}
          <div className="mt-4 text-xs text-gray-500">
            UserID: {userId || "Not found"}
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors/>
    </div>
  );
}