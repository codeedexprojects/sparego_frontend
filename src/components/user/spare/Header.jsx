"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Heart, ShoppingCart, User } from "lucide-react";
import { searchProducts } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { getcartCount } from "@/redux/slices/cartSlice";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.cart);

  const section = "SpareParts";

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchProducts({ section, search: query }));
      router.push(`/spare/spare-search?q=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    dispatch(getcartCount());
  }, [dispatch]);

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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="SpareGo Logo" className="h-8 w-auto" />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <form onSubmit={handleSearch} className="flex w-full max-w-lg">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search in ${section}...`}
                className="w-full border text-black border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 rounded-r-md flex items-center justify-center"
              >
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
            </form>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/spare/wishlist">
              <Heart className="h-5 w-5 text-gray-700 hover:text-red-600 cursor-pointer" />
            </Link>
            <Link href="/spare/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-red-600 cursor-pointer" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
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
      {/* rest of your code ... */}
    </header>
  );
};

export default Header;
