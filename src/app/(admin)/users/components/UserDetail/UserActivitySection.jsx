// components/UserDetail/UserActivitySection.jsx
const UserActivitySection = ({ user }) => {
  if (!user?.devices || user.devices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
        <p className="text-gray-500">No login activity available.</p>
      </div>
    );
  }

  const loginActivities = user.devices
    .filter(device => device.lastLogin) // only include devices with login dates
    .map((device, index) => ({
      id: index,
      title: `Login from ${device.deviceName || "Unknown device"}`,
      description: `IP: ${device.ip || "Unknown IP"}`,
      date: device.lastLogin,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      ),
      bgColor: "bg-purple-100"
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Login Activity</h2>
      <div className="space-y-4">
        {loginActivities.map(activity => (
          <div key={activity.id} className="flex items-start">
            <div className="flex-shrink-0">
              <div className={`h-10 w-10 rounded-full ${activity.bgColor} flex items-center justify-center`}>
                {activity.icon}
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-800">{activity.title}</h4>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(activity.date).toLocaleDateString()} at{" "}
                {new Date(activity.date).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivitySection;
