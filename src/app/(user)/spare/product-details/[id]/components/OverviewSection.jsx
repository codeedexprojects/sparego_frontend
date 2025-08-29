import React from 'react';

const OverviewSection = ({ product }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-red-600 mb-4">Overview</h2>
      <div className="text-gray-700 leading-relaxed space-y-4">
        {product?.overview ? (
          <p>{product.overview}</p>
        ) : product?.description ? (
          <p>{product.description}</p>
        ) : (
          <p>No overview available for this product.</p>
        )}
        
        {product?.category && (
          <p>
            <strong>Category:</strong> {product.category.name}
          </p>
        )}
        
        {product?.subCategory && (
          <p>
            <strong>Sub Category:</strong> {product.subCategory.name}
          </p>
        )}
        
        {product?.warranty && (
          <p>
            <strong>Warranty:</strong> {product.warranty}
          </p>
        )}
      </div>
    </div>
  );
};

export default OverviewSection;