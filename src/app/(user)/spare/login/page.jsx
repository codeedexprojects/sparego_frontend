"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Watch, Wrench, Microwave, Car, Smartphone, Tv, Cog, Refrigerator, Monitor, Laptop } from "lucide-react";

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
      .then((res) => {
        if (res?.success) {
          if (res.sessionId && res.userId) {
            toast.success(res.message || "OTP sent successfully");
            
            // Encode the parameters to handle special characters
            const params = new URLSearchParams({
              sessionId: res.sessionId,
              userId: res.userId,
              number: number
            });
            
            router.push(`/spare/verify-otp?${params.toString()}`);
          } else {
            toast.error("Session information missing. Please try again.");
          }
        } else {
          toast.error(res?.message || "User already exists, please login instead");
          router.push("/spare/register");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast.error(error?.message || "User already exists, please login instead");
        router.push("/spare/register");

      });
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin();
    }
  };

  const floatingItems = [
    { Icon: Watch, delay: 0, duration: 25, top: "8%", left: "12%", size: "lg" },
    { Icon: Wrench, delay: 3, duration: 28, top: "18%", left: "82%", size: "md", rotate: true },
    { Icon: Microwave, delay: 6, duration: 22, top: "65%", left: "8%", size: "xl" },
    { Icon: Car, delay: 2, duration: 30, top: "75%", left: "88%", size: "lg" },
    { Icon: Smartphone, delay: 4, duration: 26, top: "35%", left: "5%", size: "md" },
    { Icon: Tv, delay: 8, duration: 24, top: "82%", left: "72%", size: "lg" },
    { Icon: Watch, delay: 10, duration: 27, top: "12%", left: "92%", size: "sm" },
    { Icon: Cog, delay: 5, duration: 20, top: "88%", left: "18%", size: "md", rotate: true },
    { Icon: Refrigerator, delay: 7, duration: 29, top: "45%", left: "90%", size: "xl" },
    { Icon: Laptop, delay: 1, duration: 23, top: "25%", left: "15%", size: "lg" },
    { Icon: Monitor, delay: 9, duration: 31, top: "55%", left: "85%", size: "md" },
    { Icon: Wrench, delay: 11, duration: 21, top: "92%", left: "45%", size: "sm", rotate: true },
  ];

  const getSizeClass = (size) => {
    switch(size) {
      case "sm": return "w-8 h-8 md:w-10 md:h-10";
      case "md": return "w-10 h-10 md:w-14 md:h-14";
      case "lg": return "w-12 h-12 md:w-16 md:h-16";
      case "xl": return "w-14 h-14 md:w-20 md:h-20";
      default: return "w-12 h-12 md:w-16 md:h-16";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-50 via-white to-red-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingItems.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.rotate ? 'animate-float-rotate' : 'animate-float'}`}
            style={{
              top: item.top,
              left: item.left,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
            }}
          >
            <item.Icon 
              className={`${getSizeClass(item.size)} text-red-600 opacity-0 animate-fade-in`}
              style={{
                animationDelay: `${item.delay + 0.5}s`,
              }}
            />
          </div>
        ))}
        
        {/* Additional gradient orbs for depth */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-32 left-40 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-md">
          {/* Card with Glass Effect */}
          <div className="bg-white/95 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-2xl border border-white/30 transform transition-all duration-300 hover:shadow-3xl animate-slide-up">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full mb-4 shadow-lg animate-bounce-slow">
                <Car className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Sign in to continue to your account
              </p>
            </div>

            {/* Input Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <div className="relative group">
                  <input
                    type="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your mobile number"
                    className="w-full text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 md:py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 group-hover:border-gray-400"
                  />
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-red-500" />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg flex items-start gap-2 animate-shake">
                  <span className="text-red-500 font-bold">⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 md:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6 md:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">New here?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <a
                href="/spare/register"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm md:text-base transition-colors duration-200 group"
              >
                Create a new account
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Security Note */}
          <p className="text-center text-xs md:text-sm text-gray-600 mt-6 px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.12;
          }
          25% {
            transform: translateY(-15px) translateX(10px) scale(1.05);
            opacity: 0.18;
          }
          50% {
            transform: translateY(-25px) translateX(-5px) scale(1.1);
            opacity: 0.1;
          }
          75% {
            transform: translateY(-10px) translateX(15px) scale(1.05);
            opacity: 0.15;
          }
        }

        @keyframes float-rotate {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
            opacity: 0.12;
          }
          25% {
            transform: translateY(-15px) translateX(10px) rotate(90deg) scale(1.05);
            opacity: 0.18;
          }
          50% {
            transform: translateY(-25px) translateX(-5px) rotate(180deg) scale(1.1);
            opacity: 0.1;
          }
          75% {
            transform: translateY(-10px) translateX(15px) rotate(270deg) scale(1.05);
            opacity: 0.15;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-float-rotate {
          animation: float-rotate ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }

        @media (max-width: 640px) {
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.08;
            }
            50% {
              transform: translateY(-15px) translateX(-5px) scale(1.05);
              opacity: 0.06;
            }
          }

          @keyframes float-rotate {
            0%, 100% {
              transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
              opacity: 0.08;
            }
            50% {
              transform: translateY(-15px) translateX(-5px) rotate(180deg) scale(1.05);
              opacity: 0.06;
            }
          }
        }
      `}</style>
    </div>
  );
}