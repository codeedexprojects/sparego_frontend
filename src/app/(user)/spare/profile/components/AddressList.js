import { Info, Plus } from "lucide-react";
import { AddressCard } from "./AddressCard";

export const AddressList = ({ 
  addresses, 
  onAdd, 
  onEdit, 
  onDelete, 
  loading = false, 
  error = null 
}) => {

   const getErrorMessage = (error) => {
    if (!error) return "";
    if (typeof error === "string") return error;
    if (error.message) return error.message;
    if (error.error) return error.error;
    return "An error occurred";
  };


  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Address</h2>
        <button 
          className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
          onClick={onAdd}
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading addresses...</p>}
      
      {error && (
        <div className="bg-red-100 text-red-800 flex items-center gap-2 p-3 rounded">
          <Info size={16} />
                    <p className="text-sm">{getErrorMessage(error)}</p>

        </div>
      )}

      {!loading && addresses.length === 0 && (
        <div className="bg-yellow-100 text-yellow-800 flex items-center gap-2 p-3 rounded">
          <Info size={16} />
          <span className="text-sm">No addresses added</span>
        </div>
      )}

      {addresses.length > 0 && (
        <div className="space-y-4">
          {addresses.map((addr, index) => (
            <AddressCard
              key={addr._id || `address-${index}`}
              address={addr} 
              onEdit={onEdit}
              onDelete={onDelete}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
};