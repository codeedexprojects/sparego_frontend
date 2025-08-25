import React from "react";
import { Calendar, Clock, Tag } from "lucide-react";

const BlogDetail = () => {
  return (
    <div className="bg-white py-10 px-6 lg:px-20">
      {/* Hero Image + Title */}
      <div className="mb-6">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src="/about/blog.png"
            alt="How to Choose the Right Engine Oil"
            className="w-full h-64 object-cover"
          />
          <h1 className="absolute bottom-4 left-4 text-white text-2xl font-bold bg-black/50 px-4 py-2 rounded">
            “How to Choose the Right Engine Oil”
          </h1>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-6 text-gray-500 text-sm mb-10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>August 5, 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>4 min read</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4" />
          <span>Maintenance Tips</span>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-red-600 mb-3">Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          Choosing The Right Engine Oil Is Crucial For The Performance, Health,
          And Longevity Of Your Scooter Or Bike. With So Many Options On The
          Market — From Mineral To Synthetic — It Can Get Confusing.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          In This Guide, We’ll Break It Down So You Can Make The Right Choice
          Based On Your Ride, Budget, And Usage.
        </p>
      </div>

      {/* Why Engine Oil Matters */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-red-600 mb-3">
          Why Engine Oil Matters
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Lubricates Moving Engine Parts</li>
          <li>Reduces Friction And Wear</li>
          <li>Keeps The Engine Cool</li>
          <li>Cleans Dirt And Particles</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          Using The Wrong Oil Can Lead To Overheating, Poor Mileage, And
          Long-Term Engine Damage.
        </p>
      </div>
    </div>
  );
};

export default BlogDetail;
