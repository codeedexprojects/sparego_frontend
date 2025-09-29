"use client";
import { useRouter } from "next/navigation";
import { IMG_URL } from "../../../../redux/baseUrl";

const ProductTable = ({ products }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        {/* Table Head */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Image</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Brand</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Category</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Price</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">Stock</th>
            <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {products.map((p) => (
            <tr
              key={p.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-3">
                <img
                  src={`${IMG_URL}/${p.imageUrl}`}
                  alt={p.name}
                  className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
              </td>
              <td className="px-6 py-3 font-medium text-gray-800">{p.name}</td>
              <td className="px-6 py-3 text-gray-600">{p.brand}</td>
              <td className="px-6 py-3 text-gray-600">{p.category}</td>
              <td className="px-6 py-3 font-semibold text-gray-800">${p.price}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    p.stock === "In Stock"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {p.stock}
                </span>
              </td>
              <td className="px-6 py-3 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => router.push(`/products/${p.id}`)}
                    className="px-3 py-1.5 text-xs rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => router.push(`/products/edit/${p.id}`)}
                    className="px-3 py-1.5 text-xs rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => alert(`Delete product ${p.id}`)}
                    className="px-3 py-1.5 text-xs rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
