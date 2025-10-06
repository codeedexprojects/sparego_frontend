import React from 'react';

const OverviewSection = ({ product }) => {
  // Safe function to get category name
  const getCategoryName = () => {
    if (!product?.mainCategory) return 'N/A';
    if (typeof product.mainCategory === 'string') return product.mainCategory;
    if (product.mainCategory?.name) return product.mainCategory.name;
    return 'N/A';
  };

  // Safe function to get subcategory name
  const getSubCategoryName = () => {
    if (!product?.subCategory) return 'N/A';
    if (typeof product.subCategory === 'string') return product.subCategory;
    if (product.subCategory?.name) return product.subCategory.name;
    return 'N/A';
  };

  // Safe function to get section name
  const getSectionName = () => {
    if (!product?.section) return 'N/A';
    if (typeof product.section === 'string') return product.section;
    if (product.section?.name) return product.section.name;
    return 'N/A';
  };

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
        
        <p>
          <strong>Category:</strong> {getCategoryName()}
        </p>
        
        {/* <p>
          <strong>Sub Category:</strong> {getSubCategoryName()}
        </p> */}
        
        {product?.section && (
          <p>
            <strong>Section:</strong> {getSectionName()}
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