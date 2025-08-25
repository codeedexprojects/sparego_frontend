import React from "react";
import { CheckCircle } from "lucide-react";

const Section2 = () => {
  return (
    <div className="bg-white py-10 px-6 lg:px-20 space-y-10">
      {/* Types of Engine Oils */}
      <div>
        <h2 className="text-lg font-semibold text-red-600 mb-4">
          Types Of Engine Oils
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
          {/* Mineral Oil */}
          <div>
            <h3 className="font-bold mb-2">1. Mineral Oil</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Basic And Affordable</li>
              <li>Suitable For Older Vehicles</li>
              <li>Needs More Frequent Changes</li>
            </ul>
          </div>
          {/* Semi-Synthetic Oil */}
          <div>
            <h3 className="font-bold mb-2">2. Semi-Synthetic Oil</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Blend Of Mineral And Synthetic</li>
              <li>Good Balance Of Performance And Price</li>
              <li>Perfect For Daily City Rides</li>
            </ul>
          </div>
          {/* Fully Synthetic Oil */}
          <div>
            <h3 className="font-bold mb-2">3. Fully Synthetic Oil</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Best Protection & Performance</li>
              <li>Lasts Longer</li>
              <li>Great For High-Performance Engines And Long-Distance Riding</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Understanding Viscosity Grades */}
      <div>
        <h2 className="text-lg font-semibold text-red-600 mb-3">
          Understanding Viscosity Grades
        </h2>
        <p className="text-gray-700 mb-3">
          You’ll See Numbers Like <span className="font-bold">10W-30</span> or{" "}
          <span className="font-bold">20W-40</span>. Here’s What They Mean:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>
            <span className="font-bold">The First Number (10W)</span> – Cold
            Start Thickness
          </li>
          <li>
            <span className="font-bold">The Second Number (30)</span> – Thickness
            At High Temperatures
          </li>
        </ul>
        <p className="text-gray-700 mt-3">
          <span className="font-semibold">Tip:</span> For Indian City Traffic,{" "}
          <span className="font-bold">10W-30</span> Or{" "}
          <span className="font-bold">10W-40</span> Is A Safe Choice For Most
          Scooters.
        </p>
      </div>

      {/* How To Choose */}
      <div>
        <h2 className="text-lg font-semibold text-red-600 mb-4">
          How To Choose The Right One?
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-red-500 mt-1" />
            <span>
              Check Your Vehicle’s Manual – Always Follow The Manufacturer’s
              Recommendation
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-red-500 mt-1" />
            <span>
              Know Your Usage – Long-Distance? Go Synthetic. Short City Rides?
              Semi Is Fine
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-red-500 mt-1" />
            <span>
              Budget Vs. Quality – Synthetic Costs More But Gives Better
              Protection
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-red-500 mt-1" />
            <span>
              Choose Trusted Brands – Like Castrol, Shell, Motul, Or Gulf
            </span>
          </li>
        </ul>
      </div>

      {/* Pro Tip */}
      <div className="bg-gray-50 border-l-4 border-red-500 p-4 rounded">
        <h3 className="text-red-600 font-bold mb-2">Pro Tip:</h3>
        <p className="text-gray-700">
          If You Ride In Heavy Traffic Or Hot Weather, Go For Semi-Synthetic{" "}
          <span className="font-bold">10W-30</span> Oil — It Protects Better And
          Improves Pickup.
        </p>
      </div>
    </div>
  );
};

export default Section2;
