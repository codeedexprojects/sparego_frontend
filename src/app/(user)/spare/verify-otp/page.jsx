"use client";

import Header from "@/components/user/spare/Header";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function VerifyOtpPage({ searchParams }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.auth);

  // ✅ get query params from Next.js automatically
  const number = searchParams?.number;
  const sessionId = searchParams?.sessionId;

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  useEffect(() => {
    if (!number || !sessionId) {
      toast.error("Missing required parameters. Please try logging in again.");
      console.error("Missing parameters:", { number, sessionId });
    }
  }, [number, sessionId]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "") && index === 5) {
      handleVerifyOtpAutomatically(newOtp.join(""));
    }
  };

  const handleVerifyOtpAutomatically = (otpValue) => {
    if (!number || !sessionId) {
      toast.error("Missing phone number or session ID. Please try logging in again.");
      return;
    }

    console.log("Sending verification request:", {
      phone: number,
      otp: otpValue,
      sessionId: sessionId,
    });

    dispatch(verifyOtp({ number, otp: otpValue, sessionId }))
      .unwrap()
      .then((res) => {
        if (res.success && res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          toast.success(res.message || "Login successful!");
          router.push("/");
        } else {
          toast.error(res?.message || "Invalid OTP");
        }
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
        toast.error(error || "Invalid OTP");
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter a complete 6-digit OTP");
      return;
    }

    if (!number || !sessionId) {
      toast.error("Missing phone number or session ID. Please try logging in again.");
      return;
    }

    handleVerifyOtpAutomatically(otpValue);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, 6);
      setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
      const nextIndex = Math.min(newOtp.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-0 left-0 bg-yellow-100 text-yellow-800 text-xs p-2">
          Debug: Number: {number}, SessionId: {sessionId}
        </div>
      )}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Verify OTP
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Enter the 6-digit code sent to your phone
              </p>
              {number && (
                <p className="text-gray-800 font-medium mt-2 text-sm sm:text-base">
                  *** *** {number.slice(-3)}
                </p>
              )}
            </div>

            <form onSubmit={handleVerifyOtp} className="mb-6">
              <div className="flex justify-between gap-2 sm:gap-3 mb-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={data}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    onFocus={(e) => e.target.select()}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-gray-900 border-2 border-gray-300 rounded-xl text-center text-xl font-semibold focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-white shadow-sm"
                    disabled={loading}
                  />
                ))}
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center mt-4 bg-red-50 py-2 px-3 rounded-lg border border-red-200">
                  {typeof error === "string"
                    ? error
                    : error.message || "Something went wrong"}
                </p>
              )}

              <button
                type="submit"
                disabled={
                  loading || !number || !sessionId || otp.join("").length !== 6
                }
                className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 mt-6 shadow-lg shadow-red-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white bg-red-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}