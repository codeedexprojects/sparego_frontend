import React from "react";

const Section3 = () => {
  const oils = [
    { product: "Castrol Power1 4T 800ml", type: "Semi-Synthetic", price: "₹399" },
    { product: "Shell Advance AX7 800ml", type: "Semi-Synthetic", price: "₹429" },
    { product: "Motul 3100 Gold 4T 1L", type: "Semi-Synthetic", price: "₹485" },
    { product: "Gulf Pride 4T Plus 1L", type: "Mineral", price: "₹379" },
  ];

  return (
    <div className="bg-white py-10 px-6 lg:px-20 space-y-10">
      {/* Best Engine Oils */}
      <div>
        <h2 className="text-lg font-semibold text-red-600 mb-6">
          Best Engine Oils On SPARE GO
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-t border-gray-300 text-gray-700">
            <thead>
              <tr className="text-left text-red-600">
                <th className="py-2">Product</th>
                <th className="py-2">Type</th>
                <th className="py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {oils.map((oil, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="py-2">{oil.product}</td>
                  <td className="py-2">{oil.type}</td>
                  <td className="py-2">{oil.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a
          href="#"
          className="inline-block mt-4 text-red-600 font-semibold hover:underline"
        >
          Browse ALL Engine Oils →
        </a>
      </div>

      {/* Conclusion */}
      <div>
        <h2 className="text-lg font-semibold text-red-600 mb-3">Conclusion</h2>
        <p className="text-gray-700 mb-3">
          Your Engine Deserves The Right Oil. Whether It’s A Daily Commute Or A Weekend Ride, Using The Correct Engine Oil Ensures Smooth Performance, Fewer Breakdowns, And Better Mileage.
        </p>
        <p className="text-gray-700">
          Don’t Just Ride — <span className="font-bold">Ride Smart With SPARE GO.</span>
        </p>
      </div>
    </div>
  );
};

export default Section3;
