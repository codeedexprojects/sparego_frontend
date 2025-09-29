// components/UserTable/UserTableRow.jsx
const UserTableRow = ({ user, onEdit, onView, onToggleStatus }) => {
  // Helper function to safely get string values
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || JSON.stringify(value);
    }
    return String(value || '');
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleToggleStatus = () => {
    if (onToggleStatus) {
      onToggleStatus(user);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="font-medium text-indigo-800">
              {getUserInitials(getStringValue(user.name))}
            </span>
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{getStringValue(user.name) || 'No Name'}</div>
            <div className="text-gray-500">
              Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-gray-900">{getStringValue(user.number)}</div>
        <div className="text-gray-500">
          {user.devices && user.devices.length > 0 
            ? `${user.devices.length} device(s)` 
            : 'No devices'
          }
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.role === 'admin' || user.role === 'superadmin' || user.role === 'subadmin'
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {getStringValue(user.role)}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.isVerified 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {user.isVerified ? 'Verified' : 'Not Verified'}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          {onView && (
            <button
              onClick={() => onView(user)}
              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View
            </button>
          )}
          {onToggleStatus && (
            <button 
              onClick={handleToggleStatus}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                user.isActive 
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {user.isActive ? 'Deactivate' : 'Activate'}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;