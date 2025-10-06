"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Heart, ShoppingCart, User, Search } from "lucide-react";
import { searchProducts } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { getcartCount } from "@/redux/slices/cartSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.cart);

  const section = "spare";

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchProducts({ section, search: query }));
      router.push(`/spare/spare-search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    dispatch(getcartCount());
  }, [dispatch]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

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
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="SpareGo Logo" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex flex-1 justify-center px-6">
            <form onSubmit={handleSearch} className="flex w-full max-w-lg">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search entire store here...`}
                className="w-full border text-black border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 rounded-r-md flex items-center justify-center"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
            </form>
          </div>

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

          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-red-600 focus:outline-none"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link href="/spare/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-red-600" />
              {count > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-red-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search in ${section}...`}
                className="w-full border text-black border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 rounded-r-md flex items-center justify-center"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div style={{ backgroundColor: "#333333" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex space-x-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            {/* Mobile User Links */}
            <div className="pt-4 border-t border-gray-700 space-y-1">
              <Link
                href="/spare/wishlist"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <Heart className="h-5 w-5 mr-3" />
                Wishlist
              </Link>
              <Link
                href="/spare/profile"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;