import React from "react";

const Section1 = () => {
  return (
    <div className="bg-white py-12 px-6 lg:px-20">
      {/* Header */}
      <div className="text-left mb-10">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-700">
          Your Ride. Our Responsibility
        </h1>
        <p className="text-gray-500 mt-2">
          Trusted spare parts delivered with precision and care
        </p>
      </div>

      {/* Illustrations Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
        <div className="flex justify-center">
          <img
            src="/about/illustration1.png"
            alt="Mechanics illustration"
            className="max-w-sm w-full"
          />
        </div>
        <div className="flex justify-center">
          <img
            src="/about/illustration2.png"
            alt="Car with parts"
            className="max-w-sm w-full"
          />
        </div>
      </div>

      {/* About Section */}
      <div className=" mx-auto space-y-8">
        {/* About SPARE GO */}
        <div>
          <h2 className="text-lg font-bold text-red-600 mb-2">
            About SPARE GO
          </h2>
          <p className="text-gray-600 leading-relaxed">
            SPARE GO Is An Online Destination For High-Quality, Genuine Spare
            Parts For Two-Wheelers And Four-Wheelers Across India. With A Passion
            For Performance And Safety, We Connect Riders With The Right Parts At
            The Right Time.
          </p>
        </div>

        {/* How We Started */}
        <div>
          <h2 className="text-lg font-bold text-red-600 mb-2">
            How We Started
          </h2>
          <ul className="text-gray-600 space-y-2 list-disc pl-6">
            <li>Founded By Auto Enthusiasts In (2013)</li>
            <li>Frustrated By Hard-To-Find Parts In Local Stores</li>
            <li>Built To Make Vehicle Maintenance Easier And Smarter</li>
            <li>Started In [Trivandrum/ Kerala] And Now Ship Across India</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Section1;
