'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product-card';
import { ProductProps } from '@/utils/types/products';

import Container from '@/components/ui/container';
import styles from './HomeClient.module.scss';
import Body from '../text/Body';
import { CloseIcon } from '@/components/ui/icons';
import Header from '@/components/header';
import cx from 'classnames';
import { useCart } from '@/context/CartContext';

interface HomeClientProps {
  products: ProductProps[];
}

const HomeClient: React.FC<HomeClientProps> = ({ products }) => {
  const { cartLoading } = useCart();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(!products || products.length === 0);
  const [searchResults, setSearchResults] = useState<ProductProps[] | null>(
    null
  );
  const debouncedQuery = useDebounce(query, 300);
  const isInitialSearch = debouncedQuery === '';

  React.useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  React.useEffect(() => {
    if (isInitialSearch) {
      setSearchResults(null);
      return;
    }
    fetch(`/api/products?q=${encodeURIComponent(debouncedQuery)}`)
      .then(res => res.json())
      .then(data => setSearchResults(data));
  }, [debouncedQuery, isInitialSearch]);

  const productsToShow =
    isInitialSearch || searchResults === null ? products : searchResults;

  if (loading) {
    return <Header cartLoading={cartLoading} />;
  }

  return (
    <>
      <Header cartLoading={cartLoading} />
      <main className={cx(styles.main)}>
        <div className={styles.searchFixed}>
          <Container>
            <div className={styles.searchArea}>
              <div className={styles.searchInputWrapper}>
                <Input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search for a smartphone..."
                  className={styles.searchInput}
                />
                {query && (
                  <button
                    type="button"
                    className={styles.clearButton}
                    aria-label="Clear search"
                    onClick={() => setQuery('')}
                  >
                    <CloseIcon width={20} height={19} />
                  </button>
                )}
              </div>
              <div className={styles.resultsBar}>
                <Body isUppercase weight="regular" fontSize="12px">
                  {productsToShow.length} results
                </Body>
              </div>
            </div>
          </Container>
        </div>
        <section
          className={cx(
            styles.grid,
            !loading && productsToShow.length > 0 && styles.animateFromRight
          )}
        >
          {productsToShow.map((item, idx) => (
            <Link
              key={`${item.id}-${idx}`}
              href={`/products/${item.id}`}
              className={styles.cardLink}
            >
              <ProductCard product={item} />
            </Link>
          ))}
        </section>
      </main>
    </>
  );
};

export default HomeClient;
