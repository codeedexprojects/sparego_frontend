// components/CategoryCards.jsx
import { IMG_URL } from "../../../../redux/baseUrl";

export const CategoryCard = ({ category, onEdit, onDelete, parentInfo, parentName }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800">{category.name}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${
          category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {category.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      {category.image && (
        <div className="mb-3">
          <img 
            src={`${IMG_URL}/${category.image}`} 
            alt={category.name} 
            className="w-full h-32 object-cover rounded-md"
          />
        </div>
      )}
      
      <div className="text-sm text-gray-600 mb-3">
        {category.description && (
          <p className="mb-2">{category.description}</p>
        )}
        
        {parentInfo && (
          <div className="mb-2">
            <span className="font-medium">{parentInfo.label}: </span>
            <span className="text-blue-600">{parentName}</span>
          </div>
        )}
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>ID: {category._id || category.id || 'N/A'}</span>
          {category.order && <span>Order: {category.order}</span>}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(category)}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(category)}
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};