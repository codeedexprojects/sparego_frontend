
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto antialiased text-gray-800 leading-relaxed text-sm md:text-base selection:bg-blue-100 selection:text-blue-900">
          {children}
        </main>
      </div>
    </div>
  );
}
