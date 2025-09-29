// components/UserDetail/UserActivitySection.jsx
const UserActivitySection = ({ user }) => {
  // Sample activity data - in a real app, this would come from an API
  const activities = [
    {
      id: 1,
      type: "account_created",
      title: "Account created",
      description: "User registered on the platform",
      date: user.joinDate,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      bgColor: "bg-blue-100"
    },
    {
      id: 2,
      type: "email_verified",
      title: "Email verified",
      description: "User verified their email address",
      date: user.joinDate, // In real app, this would be a separate date
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      bgColor: "bg-green-100"
    },
    {
      id: 3,
      type: "last_login",
      title: "Last login",
      description: "User logged in to the platform",
      date: user.lastLogin,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      ),
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
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