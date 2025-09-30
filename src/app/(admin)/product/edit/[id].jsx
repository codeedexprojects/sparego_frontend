// pages/admin/products/edit/[id].js
"use client";

import { useRouter } from 'next/router';
import ProductForm from '../components/ProductForm';

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ProductForm productId={id} />;
};

export default EditProductPage;