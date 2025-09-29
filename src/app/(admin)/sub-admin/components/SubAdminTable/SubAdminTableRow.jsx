// components/SubadminTable/SubadminTableRow.jsx
const SubadminTableRow = ({ subadmin, onEdit, onDelete, onToggleStatus, onUpdatePermissions }) => {
  // Helper function to safely get string values
  const getStringValue = (value) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value.name || value.title || JSON.stringify(value);
    }
    return String(value || '');
  };

  // Helper function to get user initials
  const getUserInitials = (name) => {
    const nameStr = getStringValue(name);
    return nameStr.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="font-medium text-indigo-800">
              {getUserInitials(subadmin.name)}
            </span>
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{getStringValue(subadmin.name)}</div>
            <div className="text-gray-500">
              Joined {subadmin.createdAt ? new Date(subadmin.createdAt).toLocaleDateString() : 'Unknown'}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-900">{getStringValue(subadmin.email)}</td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          subadmin.role === 'superadmin' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {getStringValue(subadmin.role)}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {subadmin.permissions && Array.isArray(subadmin.permissions) && subadmin.permissions.length > 0 ? (
            subadmin.permissions.includes('*') ? (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Full Access
              </span>
            ) : (
              subadmin.permissions.slice(0, 3).map((permission, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {getStringValue(permission)}
                </span>
              ))
            )
          ) : (
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
              No Permissions
            </span>
          )}
          {subadmin.permissions && Array.isArray(subadmin.permissions) && subadmin.permissions.length > 3 && !subadmin.permissions.includes('*') && (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              +{subadmin.permissions.length - 3} more
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(subadmin)}
              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Edit
            </button>
          )}
          {onToggleStatus && (
            <button 
              onClick={() => onToggleStatus(subadmin)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                subadmin.isActive
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {subadmin.isActive ? 'Deactivate' : 'Activate'}
            </button>
          )}
          {onUpdatePermissions && (
            <button 
              onClick={() => onUpdatePermissions(subadmin, subadmin.permissions || [])}
              className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
            >
              Permissions
            </button>
          )}
          {onDelete && subadmin.role !== 'superadmin' && (
            <button 
              onClick={() => onDelete(subadmin)}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default SubadminTableRow;