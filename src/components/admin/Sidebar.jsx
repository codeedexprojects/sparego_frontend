"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Products", icon: Package, path: "/products" },
  { name: "Orders", icon: ShoppingCart, path: "/orders" },
  { name: "Users", icon: Users, path: "/users" },
  { name: "Category", icon: FolderTree, path: "/category" },
  { name: "Carousel", icon: Image, path: "/carousel" },
  { name: "Deal Banner", icon: Tag, path: "/deal-banner" },
  { name: "Brand", icon: BadgeCheck, path: "/brand" },
  { name: "Home Cards", icon: LayoutGrid, path: "/home-cards" },
  { name: "Reviews", icon: Star, path: "/reviews" },
  { name: "Vehicles", icon: Car, path: "/vehicles" },
  { name: "Sub Admin", icon: ShieldCheck, path: "/sub-admin" },
];


export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white text-white h-screen ${
        isHovered ? "w-64" : "w-20"
      } flex flex-col transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex items-center justify-center px-6 py-6  border-gray-700">
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
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center ${
                  isHovered ? "space-x-3 px-4" : "justify-center px-2"
                } py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-black hover:bg-red-600"
                }`}
              >
                <Icon size={20} />
                {isHovered && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
