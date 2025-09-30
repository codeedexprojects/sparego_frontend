// pages/admin/products/view/[id].js
"use client";

import { useRouter } from 'next/router';
import ProductDetail from '../components/ProductDetail';

const ViewProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ProductDetail productId={id} />;
};

export default ViewProductPage;