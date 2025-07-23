'use client';

import React from 'react';
import Container from '@/components/ui/container';
import { Heading } from '@/components/text';
import CartFooter from '@/components/cart/cart-footer';
import styles from './CartPage.module.scss';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

import CartItem from '../../components/cart/cart-item';
import Header from '@/components/header';

export default function CartPage() {
  const { items: cart, removeFromCart, cartLoading } = useCart();
  const router = useRouter();

  function handleRemove(id: string) {
    removeFromCart(id);
  }

  function handleContinueShopping() {
    router.push('/');
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cartLoading) {
    return <Header cartLoading={cartLoading} />;
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartMain}>
        <Container>
          <div className={styles.cartHeader}>
            <Heading as="h4" isUppercase>
              CART ({cart.length})
            </Heading>
          </div>
          {cart.map((item, idx) => (
            <CartItem
              key={`${item.id}-${idx}`}
              item={item}
              onRemove={handleRemove}
            />
          ))}
        </Container>
      </div>
      <div className={styles.cartFooterFixed}>
        <Container>
          <CartFooter
            total={total}
            onContinue={handleContinueShopping}
            hasPhones={cart.length > 0}
          />
        </Container>
      </div>
    </div>
  );
}
