import { Building, Home, MapPin, Pencil, Trash2 } from "lucide-react";

export const AddressCard = ({ address, onEdit, onDelete, loading = false }) => {
  const getAddressIcon = (type) => {
    switch (type) {
      case "Home":
        return <Home size={16} />;
      case "Work":
        return <Building size={16} />;
      default:
        return <MapPin size={16} />;
    }
  };

  return (
    <div className="bg-white p-4 rounded border border-gray-200 flex justify-between items-start">
      <div className="flex gap-3 flex-grow">
        <div className="mt-1 text-gray-500">
          {getAddressIcon(address.addressType)}
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-800">{address.name}</h3>
            {address.isDefault && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Default
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{address.phone}</p>
          <p className="text-sm text-gray-600 mt-1">
            {address.address}, {address.street}, {address.city}, {address.state} - {address.pincode}, {address.country}
          </p>
          <p className="text-xs text-gray-500 mt-1 capitalize">{address.addressType} Address</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => onEdit(address)}
          disabled={loading}
          className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <Pencil size={16} />
        </button>
        <button 
          onClick={() => onDelete(address.id)}
          disabled={loading}
          className="text-gray-500 hover:text-red-600 disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};