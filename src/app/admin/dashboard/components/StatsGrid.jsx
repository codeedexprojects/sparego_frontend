"use client";
import StatCard from "./StatCard";

const StatsGrid = ({ statsData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
