import React from "react";
import { Pencil, Info } from "lucide-react";
import Header from "@/components/user/spare/Header";
import Footer from "@/components/landing/Footer";

const page = () => {
  return (
    <div>
        <Header></Header>
        <div className="bg-white min-h-screen py-10 px-6 lg:px-20 space-y-6">
          {/* Name & Email */}
          <div className="bg-red-100 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-800">
                Name
              </h2>
              <button className="text-gray-600 hover:text-gray-800">
                <Pencil size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-500">E-mail</p>
            <p className="text-gray-700">bill.sanders@example.com</p>
          </div>
    
          {/* Address */}
          <div className="bg-red-100 p-6 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Address</h2>
              <button className="text-sm font-medium text-gray-700 hover:underline">
                + Add
              </button>
            </div>
            <div className="bg-red-200 text-red-800 flex items-center gap-2 p-3 rounded">
              <Info size={16} />
              <span className="text-sm">No addresses added</span>
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default page; 