// pages/admin/products/index.js
"use client";

import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import ProductList from './components/ProductList';

const ProductsPage = () => {
  return (
    <ProtectedRoute>
     <ProductList />
    </ProtectedRoute>
)
};

export default ProductsPage;