'use client';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/ui/container';
import Heading from '@/components/text/Heading';

import ProductSelectors from '@/components/product-selectors';
import Specifications from '../specifications';
import BackButton from '@/components/ui/button';
import styles from './ProductDetails.module.scss';
import {
  ProductDetailProps,
  ProductColorOption,
  ProductStorageOption,
} from '@/utils/types/products';

interface ProductDetailsProps {
  product: ProductDetailProps;
}
import SimilarItems from '../similar-items';

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<
    ProductColorOption | undefined
  >(undefined);
  const [selectedStorage, setSelectedStorage] = useState<
    ProductStorageOption | undefined
  >(undefined);
  const [price, setPrice] = useState<number>(product.basePrice);
  const router = useRouter();

  const handleSelectorsChange = (
    color: ProductColorOption,
    storage: ProductStorageOption,
    newPrice: number
  ) => {
    setSelectedColor(color);
    setSelectedStorage(storage);
    setPrice(newPrice);
  };

  const imageUrl =
    selectedColor?.imageUrl || product.colorOptions[0]?.imageUrl || '';

  return (
    <main>
      <div className={styles.backButtonFixedOuter}>
        <Container>
          <div className={styles.backButtonWrapper}>
            <BackButton onClick={() => router.back()} />
          </div>
        </Container>
      </div>
      <div className={styles.backButtonPlaceholder} />
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.responsiveImageWrapper}>
            <Image
              src={imageUrl}
              alt={product.name}
              className={styles.image}
              quality={100}
              fill
              priority
              sizes="(max-width: 768px) 337px, (max-width: 480px) 260px, 510px"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>
              <Heading as="h4" isUppercase>
                {product.name}
              </Heading>
              <Heading as="h5">From {price} EUR</Heading>
            </div>
            <div className={styles.storageWrapper}>
              <ProductSelectors
                name={product.name}
                brand={product.brand}
                colorOptions={product.colorOptions}
                storageOptions={product.storageOptions}
                basePrice={product.basePrice}
                selectedColor={selectedColor}
                selectedStorage={selectedStorage}
                onChange={handleSelectorsChange}
              />
            </div>
          </div>
        </div>
        <Specifications product={product} />
        <SimilarItems similarProducts={product.similarProducts} />
      </Container>
    </main>
  );
};

export default ProductDetails;
