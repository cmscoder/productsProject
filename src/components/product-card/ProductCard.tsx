import React from 'react';
import Image from 'next/image';
import { ProductProps } from '@/utils/types/products';
import styles from './ProductCard.module.scss';
import { Small, Body } from '../text';

interface ProductCardProps {
  product: ProductProps;
  asLink?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <section className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={product.imageUrl}
          alt={product.name}
          fill
          priority
          quality={100}
          sizes="(max-width: 768px) 337px, (max-width: 480px) 260px, 510px"
        />
      </div>
      <div className={styles.productFooter}>
        <div className={styles.productDetails}>
          <Small xs color="grey-dark" isUppercase>
            {product.brand}
          </Small>
          <Body isUppercase>{product.name}</Body>
        </div>
        <div className={styles.productInfo}>
          <Body isUppercase>{product.basePrice} eur</Body>
        </div>
      </div>
    </section>
  );
};
