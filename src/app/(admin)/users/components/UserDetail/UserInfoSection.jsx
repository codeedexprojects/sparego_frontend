// components/UserDetail/UserInfoSection.jsx
const UserInfoSection = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
          <p className="text-gray-800">{user.name}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
          <p className="text-gray-800">{user.number}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
          <p className="text-gray-800">{user.email}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Role</h3>
          <p className="text-gray-800 capitalize">{user.role}</p>
        </div>
        
        {user.address && (
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
            <p className="text-gray-800">{user.address}</p>
          </div>
        )}
        
        {user.bio && (
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
            <p className="text-gray-800">{user.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoSection;