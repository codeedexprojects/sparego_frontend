"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Image,
  Tag,
  BadgeCheck,
  LayoutGrid,
  Star,
  Car,
  ChevronDown,
  ChevronRight,
  FileText,
  Loader2
} from "lucide-react";

import { getHomeCards } from "@/redux/slices/adminHomeCardSlice";

// Base menu items structure
const baseMenuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  {
    name: "Products",
    icon: Package,
    children: [
      { name: "Spare Products", path: "/admin/spare-product" },
      // Dynamic "Other Products" will be added here
    ],
  },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Users", icon: Users, path: "/admin/users" },
  {
    name: "Category",
    icon: FolderTree,
    children: [
      { name: "Category", path: "/admin/categories" },
      { name: "Sub Category", path: "/admin/sub-categories" },
      { name: "Sub Sub Category", path: "/admin/sub-sub-categories" },
    ],
  },
  {
    name: "Carousel",
    icon: Image,
    children: [
      { name: "Main Carousel", path: "/admin/main-carousel" },
      { name: "Bottom Carousel", path: "/admin/bottom-carousel" },
      { name: "Home Carousel", path: "/admin/home-carousel" },
    ],
  },
  { name: "Deal Banner", icon: Tag, path: "/admin/deal-banner" },
  { name: "Brand", icon: BadgeCheck, path: "/admin/brand" },
  { name: "Home Cards", icon: LayoutGrid, path: "/admin/home-cards" },
  { name: "Reviews", icon: Star, path: "/admin/reviews" },
  { name: "Vehicles", icon: Car, path: "/admin/vehicles" },
  { name: "Blog", icon: FileText, path: "/admin/blog" },
];

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuItems, setMenuItems] = useState(baseMenuItems);
  const pathname = usePathname();
  
  const dispatch = useDispatch();
  const { homeCards, loading, error } = useSelector(state => state.adminHomeCard);

  useEffect(() => {
    dispatch(getHomeCards());
  }, [dispatch]);

  useEffect(() => {
    if (homeCards && homeCards.length > 0) {
      // Create dynamic product items from home cards
      const dynamicProductItems = homeCards.map(card => {
        const cardId = card._id || card.id;
        const path = cardId ? `/admin/product/${cardId}` : "/admin/home-cards";
        
        // In your Sidebar component, when creating dynamic product links:
return {
  name: card.title || card.name || `Product ${cardId?.substring(0, 8)}` || 'Untitled',
  path: `/admin/product?section=${card._id || 'all'}`,
  isActive: card.isActive,
  cardData: card,
  isDynamic: true
};
      }).filter(item => item.path);

      // Combine: Spare Products (static) + Dynamic Products
      const combinedProductItems = [
        { name: "Spare Products", path: "/admin/spare-product" },
        ...(dynamicProductItems.length > 0 ? [{ type: "separator" }] : []),
        ...dynamicProductItems
      ];

      setMenuItems(prevItems => 
        prevItems.map(item => 
          item.name === "Products" 
            ? { ...item, children: combinedProductItems }
            : item
        )
      );
    } else if ((homeCards && homeCards.length === 0) || error) {
      // Fallback to only Spare Products
      setMenuItems(prevItems => 
        prevItems.map(item => 
          item.name === "Products" 
            ? { 
                ...item, 
                children: [
                  { name: "Spare Products", path: "/admin/spare-product" }
                ] 
              }
            : item
        )
      );
    }
  }, [homeCards, error]);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const SafeLink = ({ href, children, className, ...props }) => {
    if (!href) {
      return (
        <span className={`${className} cursor-not-allowed opacity-50`} {...props}>
          {children}
        </span>
      );
    }
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  };

  return (
    <div
      className={`bg-white h-screen ${isHovered ? "w-64" : "w-20"
        } flex flex-col transition-all duration-300 ease-in-out border-r border-gray-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex items-center justify-center px-6 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 font-bold">A</span>
          </div>
          {isHovered && (
            <span className="text-xl font-semibold text-red-500">Admin</span>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            const isProductsItem = item.name === "Products";

            if (item.children && item.children.length > 0) {
              const isOpen = openDropdown === item.name;
              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`flex w-full items-center justify-between ${isHovered ? "px-4" : "justify-center px-2"
                      } py-3 rounded-md text-sm font-medium transition-colors ${isOpen ? "bg-red-600 text-white" : "text-black hover:bg-red-600 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={20} />
                      {isHovered && <span>{item.name}</span>}
                    </div>
                    {isHovered &&
                      (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                  </button>
                  
                  {isOpen && isHovered && (
                    <div className="ml-8 mt-1 space-y-1">
                      {isProductsItem && loading && (
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center px-4 py-2 text-sm text-gray-500">
                            <Loader2 size={16} className="animate-spin mr-2" />
                            Loading products...
                          </div>
                          <SafeLink
                            href="/admin/spare-product"
                            className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                              pathname === "/admin/spare-product"
                                ? "bg-red-500 text-white"
                                : "text-gray-700 hover:bg-red-100"
                            }`}
                          >
                            Spare Products
                          </SafeLink>
                        </div>
                      )}
                      
                      {isProductsItem && error && !loading && (
                        <div className="flex flex-col space-y-1">
                          <div className="px-4 py-2 text-sm text-red-500">
                            Failed to load products
                          </div>
                          <SafeLink
                            href="/admin/spare-product"
                            className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                              pathname === "/admin/spare-product"
                                ? "bg-red-500 text-white"
                                : "text-gray-700 hover:bg-red-100"
                            }`}
                          >
                            Spare Products
                          </SafeLink>
                        </div>
                      )}
                      
                      {!(isProductsItem && (loading || error)) && item.children.map((child, index) => {
                        if (child.type === "separator") {
                          return <div key="separator" className="border-t border-gray-200 my-1"></div>;
                        }
                        
                        return (
                          <SafeLink
                            key={child.name + index}
                            href={child.path}
                            className={`flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors ${
                              pathname === child.path
                                ? "bg-red-500 text-white"
                                : child.isDynamic 
                                  ? "text-blue-700 hover:bg-blue-100"
                                  : "text-gray-700 hover:bg-red-100"
                            }`}
                          >
                            <span className="truncate">{child.name}</span>
                            {child.isActive === false && (
                              <span className="ml-2 w-2 h-2 bg-gray-400 rounded-full" title="Inactive"></span>
                            )}
                          </SafeLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <SafeLink
                key={item.name}
                href={item.path}
                className={`flex items-center ${isHovered ? "space-x-3 px-4" : "justify-center px-2"
                  } py-3 rounded-md text-sm font-medium transition-colors ${isActive
                    ? "bg-red-600 text-white"
                    : "text-black hover:bg-red-600 hover:text-white"
                  }`}
              >
                <Icon size={20} />
                {isHovered && <span>{item.name}</span>}
              </SafeLink>
            );
          })}
        </nav>
      </div>

      {isHovered && (
        <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
          {loading ? (
            <div className="flex items-center">
              <Loader2 size={14} className="animate-spin mr-2" />
              Loading products...
            </div>
          ) : error ? (
            <div className="text-red-400">Failed to load products</div>
          ) : (
            <div>
              {homeCards?.length || 0} dynamic products
            </div>
          )}
        </div>
      )}
    </div>
  );
}