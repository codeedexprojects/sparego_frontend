"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !number) return;
    
setLoading(true);
dispatch(registerUser({ name, number }))
  .unwrap()
  .then((res) => {
    if (res.success && res.sessionId && res.userId) {
      toast.success(res.message || "OTP sent successfully");
      router.push(
        `/spare/verify-otp?sessionId=${res.sessionId}&userId=${res.userId}&number=${number}`
      );
    } else {
      toast.error(res?.message || "User already exists");
      router.push("/spare/login");
    }
  })
  .catch((err) => {
    toast.error(err?.message || "Registration failed");
  })
  .finally(() => setLoading(false));
  }

  return (
    <div className="min-h-screen flex flex-col">
     

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Join us today and get started
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-5 sm:space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Mobile Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="text-gray-500 text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-14 pr-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-red-600 hover:text-red-700 underline font-medium">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-red-600 hover:text-red-700 underline font-medium">
                    Privacy Policy
                  </a>
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 sm:py-3.5 rounded-lg font-semibold hover:bg-red-700 active:bg-red-800 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-sm sm:text-base text-gray-600">
                Already have an account?{" "}
                <a 
                  href="/spare/login" 
                  className="text-red-600 hover:text-red-700 font-semibold hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>

         
        </div>
      </main>

      {/* Footer */}
      
    </div>
  );
}