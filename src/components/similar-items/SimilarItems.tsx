import React from 'react';
import styles from './SimilarItems.module.scss';
import Carousel from '../carousel';
import { ProductCard } from '../product-card';
import { ProductProps } from '@/utils/types/products';
import { Heading } from '../text';

interface SimilarItemsProps {
  similarProducts: ProductProps[];
  title?: string;
}

const SimilarItems: React.FC<SimilarItemsProps> = ({
  similarProducts,
  title = 'Similar Items',
}) => {
  if (!similarProducts || similarProducts.length === 0) return null;
  return (
    <>
      <div className={styles.similarItemsWrapper}>
        <Heading
          as="h4"
          fontSize="20px"
          isUppercase
          className={styles.similarItemsTitle}
        >
          {title}
        </Heading>
      </div>
      <div className={styles.horizontalCarousel}>
        <Carousel className={styles.horizontalCarousel}>
          {similarProducts.map((product, idx) => (
            <ProductCard
              key={product.id || idx}
              product={product}
              asLink={false}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default SimilarItems;
