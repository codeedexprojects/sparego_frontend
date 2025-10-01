"use client";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

const StatCard = ({ stat }) => {
  const Icon = stat.icon;
  const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

  return (
    <div className="group">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${stat.lightBg}`}>
            <Icon className={`w-6 h-6 ${stat.textColor}`} />
          </div>
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              stat.trend === "up"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <TrendIcon className="w-3 h-3" />
            {stat.change}
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
        </div>

       
      </div>
    </div>
  );
};

export default StatCard;
