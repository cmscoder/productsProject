import React from 'react';
import styles from './Specifications.module.scss';
import { Body, Heading } from '../text';
import { ProductDetailProps } from '@/utils/types/products';

interface SpecificationsProps {
  product: ProductDetailProps;
}

export function mapProductSpecsToSpecifications(
  specs: ProductDetailProps['specs']
) {
  return Object.entries(specs).map(([label, value]) => ({ label, value }));
}

const Specifications: React.FC<SpecificationsProps> = ({ product }) => {
  if (!product) return null;

  const allSpecs = [
    { label: 'Brand', value: product.brand },
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description },
    ...mapProductSpecsToSpecifications(product.specs),
  ];
  return (
    <div className={styles.specsWrapper}>
      <Heading as="h4" fontSize="20px" isUppercase>
        Specifications
      </Heading>
      <div className={styles.specsList}>
        {allSpecs.map(row => (
          <div className={styles.specRow} key={row.label}>
            <Body isUppercase fontSize="12px">
              {row.label}
            </Body>
            <Body fontSize="12px">{row.value}</Body>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specifications;
