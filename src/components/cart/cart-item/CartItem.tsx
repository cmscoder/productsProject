import React from 'react';
import Image from 'next/image';
import { Body } from '@/components/text';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    imageUrl: string;
    storage: string;
    color: string;
    price: number;
  };
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className={styles.cartWrapper}>
      <div className={styles.responsiveImageWrapper}>
        <Image
          src={item.imageUrl}
          alt={item.name}
          className={styles.image}
          quality={100}
          fill
          priority
          sizes="(max-width: 768px) 337px, (max-width: 480px) 260px, 510px"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <Body fontSize="12px" isUppercase>
            {item.name}
          </Body>
          <Body fontSize="12px" isUppercase>
            {item.storage} | {item.color}
          </Body>
        </div>
        <Body fontSize="12px">{item.price} EUR</Body>
        <button
          className={styles.deleteButton}
          onClick={() => onRemove(item.id)}
          type="button"
        >
          <Body fontSize="12px" color="forms-red">
            Eliminar
          </Body>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
