// components/UserDetail/UserProfileCard.jsx
const UserProfileCard = ({ user }) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex flex-col items-center">
          <img
            className="h-24 w-24 rounded-full object-cover mb-4"
            src={user.avatar}
            alt={user.name}
          />
          <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 mb-2">{user.email}</p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            user.role === 'admin' 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {user.role}
          </span>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`text-sm font-medium ${
                user.isActive ? 'text-green-600' : 'text-red-600'
              }`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Verified</p>
              <span className={`text-sm font-medium ${
                user.isVerified ? 'text-green-600' : 'text-red-600'
              }`}>
                {user.isVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="text-sm font-medium text-gray-800">
                {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Login</p>
              <p className="text-sm font-medium text-gray-800">
                {new Date(user.lastLogin).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;