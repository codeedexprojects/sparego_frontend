"use client";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2, Package } from "lucide-react";
import { IMG_URL } from "../../../../redux/baseUrl";

const ProductTable = ({ products }) => {
  const router = useRouter();

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Products Found</h3>
        <p className="text-sm text-gray-500">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 bg-white">
            {products.map((p) => (
              <tr 
                key={p.id || p._id} 
                className="hover:bg-slate-50 transition-colors duration-200 group"
              >
                {/* Product Image & Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={`${IMG_URL}/${p.imageUrl}`}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 shadow-sm group-hover:border-indigo-300 transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 text-sm leading-tight">
                        {p.name}
                      </span>
                      {p.sku && (
                        <span className="text-xs text-gray-500 mt-0.5">SKU: {p.sku}</span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Brand */}
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 font-medium">
                    {p.productBrand?.name || <span className="text-gray-400">-</span>}
                  </span>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  {p.category?.name ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                      {p.category.name}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>

                {/* Price */}
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-gray-900">
                    ₹{parseFloat(p.price).toLocaleString('en-IN')}
                  </span>
                </td>

                {/* Stock Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full ${
                      p.stock === "In Stock" || p.stock === "active"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-rose-100 text-rose-700 border border-rose-200"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      p.stock === "In Stock" || p.stock === "active"
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}></span>
                    {p.stock === "In Stock" || p.stock === "active" ? "In Stock" : "Out of Stock"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => router.push(`/products/${p._id}`)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all duration-200 shadow-sm"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => router.push(`/products/edit/${p._id}`)}
                      className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 hover:scale-110 transition-all duration-200 shadow-sm"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert(`Delete product ${p._id}`)}
                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 hover:scale-110 transition-all duration-200 shadow-sm"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with count */}
      <div className="bg-slate-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-800">{products.length}</span> product{products.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default ProductTable;