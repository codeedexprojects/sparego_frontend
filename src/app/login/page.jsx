"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../redux/slices/adminAuthSlice";
import { useRouter } from "next/navigation";
import { adminLogout, clearAdminError } from "../../redux/slices/adminAuthSlice";

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
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(clearAdminError());
    
    if (!credentials.email || !credentials.password) {
      dispatch(clearAdminError({ error: "Please fill all fields" }));
      return;
    }
    
    dispatch(loginAdmin(credentials))
      .unwrap()
      .then(() => {
        router.push("/dashboard");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Portal</h1>
          <p className="text-gray-600 mt-2">Sign in to access the dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : "Sign in"}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Restricted access - Admin personnel only</p>
        </div>
      </div>
    </div>
  );
}