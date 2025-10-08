"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, adminLogout, clearAdminError } from "../../../redux/slices/adminAuthSlice";
import { useRouter } from "next/navigation";
import { Shield, Lock, Mail, Settings, Database, FileText, Users, BarChart, Wrench, Cog } from "lucide-react";

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useSelector((state) => state.adminAuth);

  // Clear any existing admin authentication on login page load
  useEffect(() => {
    dispatch(adminLogout());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(clearAdminError());
    
    if (!credentials.email || !credentials.password) {
      return;
    }
    
    dispatch(loginAdmin(credentials))
      .unwrap()
      .then(() => {
        router.push("/admin/dashboard");
      })
      .catch((error) => {
        console.error("Admin login failed:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin(e);
    }
  };

  const floatingItems = [
    { Icon: Shield, delay: 0, duration: 25, top: "8%", left: "12%", size: "lg" },
    { Icon: Settings, delay: 3, duration: 28, top: "18%", left: "82%", size: "md", rotate: true },
    { Icon: Database, delay: 6, duration: 22, top: "65%", left: "8%", size: "xl" },
    { Icon: Users, delay: 2, duration: 30, top: "75%", left: "88%", size: "lg" },
    { Icon: FileText, delay: 4, duration: 26, top: "35%", left: "5%", size: "md" },
    { Icon: BarChart, delay: 8, duration: 24, top: "82%", left: "72%", size: "lg" },
    { Icon: Lock, delay: 10, duration: 27, top: "12%", left: "92%", size: "sm" },
    { Icon: Cog, delay: 5, duration: 20, top: "88%", left: "18%", size: "md", rotate: true },
    { Icon: Shield, delay: 7, duration: 29, top: "45%", left: "90%", size: "xl" },
    { Icon: Wrench, delay: 1, duration: 23, top: "25%", left: "15%", size: "lg", rotate: true },
    { Icon: Database, delay: 9, duration: 31, top: "55%", left: "85%", size: "md" },
    { Icon: Settings, delay: 11, duration: 21, top: "92%", left: "45%", size: "sm", rotate: true },
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100">
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
              className={`${getSizeClass(item.size)} text-blue-600 opacity-0 animate-fade-in`}
              style={{
                animationDelay: `${item.delay + 0.5}s`,
              }}
            />
          </div>
        ))}
        
        {/* Additional gradient orbs for depth */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-32 left-40 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card with Glass Effect */}
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/30 transform transition-all duration-300 hover:shadow-3xl animate-slide-up">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full mb-5 shadow-lg animate-bounce-slow">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Admin Portal
              </h2>
              <p className="text-base text-gray-600">
                Sign in to access the dashboard
              </p>
            </div>

            {/* Input Section */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your email address"
                    className="w-full text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-4 py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 group-hover:border-gray-400 text-base"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                    className="w-full text-gray-800 bg-gray-50 border border-gray-300 rounded-xl px-4 py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 group-hover:border-gray-400 text-base"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl flex items-start gap-3 animate-shake">
                  <span className="text-red-500 font-bold mt-0.5">⚠</span>
                  <span className="flex-1">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-800 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Security Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                Restricted access - Admin personnel only
              </p>
            </div>
          </div>

          {/* Additional Security Note */}
          <p className="text-center text-sm text-gray-600 mt-6 px-4">
            By accessing this system, you agree to comply with all security policies
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