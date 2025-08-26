"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FaFacebookF, FaApple, FaGoogle, FaTwitter } from "react-icons/fa";
import Header from "@/components/user/spare/Header";

export default function LoginPage() {
    const [showNumber, setShowNumber] = useState(false);

    return (
        <div>
            <Header></Header>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg">
                    {/* Title */}
                    <h2 className="text-2xl font-semibold mb-6 text-black">Log in</h2>
    
    
    
                    {/* Mobile number */}
                    <div className="mb-4 relative">
                        <label className="block text-sm mb-2 text-black">Enter your Mobile number</label>
                        <input
                            type={showNumber ? "text" : "password"}
                            className="w-full text- border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
    
                    </div>
    
    
                    {/* Terms */}
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
    
                    {/* Login Button */}
                    <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition">
                        Log in
                    </button>
    
    
                    <div className="text-center mt-2 text-sm text-black">
                        Don’t have an account?{" "}
                        <a href="#" className="underline">
                            Sign up
                        </a>
                    </div>
    
                    {/* Divider */}
    
                </div>
            </div>
        </div>
    );
}
