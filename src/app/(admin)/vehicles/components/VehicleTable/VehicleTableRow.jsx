// components/VehicleTable/VehicleTableRow.jsx
const VehicleTableRow = ({ vehicle, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          vehicle.type === "Two-Wheeler" 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-purple-100 text-purple-800'
        }`}>
          {vehicle.type}
        </span>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900">
        {vehicle.brandName || (vehicle.brand && vehicle.brand.name) || "Unknown Brand"}
      </td>
      <td className="px-6 py-4 text-gray-900">{vehicle.model}</td>
      <td className="px-6 py-4 text-gray-900">{vehicle.year}</td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(vehicle)}
              className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(vehicle)}
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

export default VehicleTableRow;