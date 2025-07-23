import React from 'react';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/product-details';
import { getProduct } from '@/utils/getProduct';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return notFound();
  return <ProductDetails product={product} />;
}
