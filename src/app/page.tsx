import React from 'react';
import Container from '@/components/ui/container';
import { ProductProps } from '@/utils/types/products';
import HomeClient from '@/components/home-client';
import { fetchProducts } from '@/utils/fetchProducts';

export default async function Home() {
  const products: ProductProps[] = await fetchProducts();

  return (
    <Container>
      <HomeClient products={products} />
    </Container>
  );
}
