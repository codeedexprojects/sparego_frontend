"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Heart, ShoppingCart, User, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getcartCount } from "@/redux/slices/cartSlice";
import { searchProductsBySection } from "@/redux/slices/productSlice";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); 
    const dispatch = useDispatch();
  const { count } = useSelector((state) => state.cart)
 const [sectionId, setSectionId] = useState(null); 
 const router = useRouter();

 const [searchText, setSearchText] = useState("");

const handleSearch = () => {
  const storedSectionId = localStorage.getItem("sectionId") || "";
  dispatch(
    searchProductsBySection({ search: searchText, sectionId: storedSectionId })
  );
  router.push(`/homeappliances/search-products?q=${encodeURIComponent(searchText)}`);
};


  useEffect(() => {
    dispatch(getcartCount());
  }, [dispatch]);

    useEffect(() => {
    const id = localStorage.getItem("sectionId");
    setSectionId(id);
    dispatch(getcartCount());
  }, [dispatch]);

  const navItems = [
    { name: "HOME", href: sectionId ? `/homeappliances/home/${sectionId}` : "/homeappliances/home" },
    { name: "SHOP", href: "/homeappliances/products" },
    { name: "BLOG", href: "/homeappliances/blog" },
    { name: "ABOUT US", href: "/homeappliances/aboutus" },
    { name: "CONTACT US", href: "/homeappliances/contactus" },
    { name: "MY ORDERS", href: "/homeappliances/orders" },
  ];

  return (
    <header className="w-full shadow">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="SpareGo Logo" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="flex w-full max-w-lg">
            <input
  type="text"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  placeholder="Search entire store here"
  className="w-full border text-black border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none"
/>
<button
  onClick={handleSearch}
  className="bg-red-600 hover:bg-red-700 px-4 rounded-r-md flex items-center justify-center"
>
  <Search className="h-5 w-5 text-white" />
</button>
            </div>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/homeappliances/wishlist">
              <Heart className="h-5 w-5 text-gray-700 hover:text-red-600 cursor-pointer" />
            </Link>
           <Link href="/homeappliances/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-red-600 cursor-pointer" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <Link href="/homeappliances/profile">
              <User className="h-5 w-5 text-gray-700 hover:text-red-600 cursor-pointer" />
            </Link>
          </div>

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
