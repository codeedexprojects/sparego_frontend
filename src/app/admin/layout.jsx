"use client";
import { usePathname } from "next/navigation";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent server/client mismatch

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto antialiased text-gray-800 leading-relaxed text-sm md:text-base selection:bg-blue-100 selection:text-blue-900">
          {children}
        </main>
      </div>
    </div>
  );
}
