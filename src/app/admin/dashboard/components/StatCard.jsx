"use client";

const StatCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div className="group h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${stat.lightBg} ${stat.borderColor ? `border ${stat.borderColor}` : ''}`}>
            <Icon className={`w-5 h-5 ${stat.textColor}`} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {stat.value}
            </p>
          </div>
          
          {stat.description && (
            <p className="text-xs text-gray-500 mt-2 leading-tight">
              {stat.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;