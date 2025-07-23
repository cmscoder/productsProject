'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { BagIcon } from '@/components/ui/icons';
import styles from './CartIcon.module.scss';
import Body from '../text/Body';
import Link from 'next/link';

const CartIcon: React.FC = () => {
  const { items, cartLoading } = useCart();

  if (cartLoading) {
    return null;
  }

  const hasItems = items.length > 0;

  return (
    <Link href="/cart" aria-label="Cart page">
      <div className={styles.cartIconWrapper}>
        <BagIcon hasItems={hasItems} />
        <Body fontSize="16px">{items.length}</Body>
      </div>
    </Link>
  );
};

export default CartIcon;
