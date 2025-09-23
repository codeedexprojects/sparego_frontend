import React from "react";
import { Phone } from "lucide-react";

const WhatWeOffer = () => {
  const features = [
    {
      icon: "🛠️",
      title: "Genuine Spare Parts",
      desc: "100% Verified For Safety & Performance",
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      desc: "Quick Dispatch To All Major Cities",
    },
    {
      icon: "👨‍🔧",
      title: "Expert Support",
      desc: "Help In Choosing The Right Part For Your Ride",
    },
    {
      icon: "⚙️",
      title: "Wide Compatibility",
      desc: "Products For Activa, Splendor, Swift & More",
    },
  ];

  const highlights = [
    {
      img: "/about/image1.png",
      text: "Launched in 2013",
    },
    {
      img: "/about/image2.png",
      text: "1M+ orders delivered",
    },
    {
      img: "/about/image3.png",
      text: "Partnered with 100+ verified suppliers",
    },
  ];

  return (
    <div className="bg-white py-12 px-6 lg:px-20">
      {/* Section Title */}
      <h2 className="text-lg font-bold text-red-600 mb-10">What We Offer</h2>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-16">
        {features.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="text-3xl">{item.icon}</div>
            <h3 className="font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16">
        {highlights.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-4">
            <img
              src={item.img}
              alt={item.text}
              className="w-16 h-16 object-contain"
            />
            <p className="text-gray-800 font-medium">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="text-left">
        <p className="text-red-600 font-medium mb-4">
          Want To Know More Or Need Help?
        </p>
        <button className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
          <Phone className="w-5 h-5" />
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default WhatWeOffer;
