"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ShoppingCart, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // ✅ get current route

  const navItems = [
    { name: "HOME", href: "/spare/home" },
    { name: "SHOP", href: "/spare/category1" },
    { name: "BLOG", href: "/spare/blog" },
    { name: "ABOUT US", href: "/spare/aboutus" },
    { name: "CONTACT US", href: "/spare/contactus" },
    { name: "MY ORDERS", href: "/spare/orders" },
  ];

  return (
    <header className="w-full shadow">
      {/* Top White Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="SpareGo Logo" className="h-8 w-auto" />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="flex w-full max-w-lg">
              <input
                type="text"
                placeholder="Search entire store here"
                className="w-full border text-black border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none"
              />
              <button className="bg-red-600 hover:bg-red-700 px-4 rounded-r-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/spare/wishlist">
              <Heart className="h-5 w-5 text-gray-700 hover:text-red-600 cursor-pointer" />
            </Link>
            <Link href="/spare/cart">
              <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-red-600 cursor-pointer" />
            </Link>
            <Link href="/spare/profile">
              <User className="h-5 w-5 text-gray-700 hover:text-red-600 cursor-pointer" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-red-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Dark Navigation Bar */}
      <div style={{ backgroundColor: "#333333" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex space-x-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href; // ✅ dynamic check
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="space-y-1 px-2 py-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Mobile Icons */}
            <div className="flex justify-around py-2 border-t border-gray-700 mt-2">
              <Link href="/wishlist">
                <Heart className="h-6 w-6 text-gray-300 hover:text-red-600" />
              </Link>
              <Link href="/cart">
                <ShoppingCart className="h-6 w-6 text-gray-300 hover:text-red-600" />
              </Link>
              <Link href="/account">
                <User className="h-6 w-6 text-gray-300 hover:text-red-600" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
