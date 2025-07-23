import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CartFooter.module.scss';
import { Button } from '@/components/ui/button';
import { Body } from '@/components/text';

interface CartFooterProps {
  total: number;
  onContinue: () => void;
  continueLabel?: string;
  payLabel?: string;
  hasPhones?: boolean;
}

const CartFooter: React.FC<CartFooterProps> = ({
  total,
  onContinue,
  continueLabel = 'Continue shopping',
  payLabel = 'PAY',
  hasPhones = false,
}) => {
  const router = useRouter();
  const handleContinue = () => {
    router.push('/');
    if (onContinue) onContinue();
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <footer className={styles.footer}>
      {hasPhones && isMobile ? (
        <>
          <div className={styles.totalRow}>
            <Body isUppercase>Total</Body>
            <Body isUppercase>{total} eur</Body>
          </div>
          <div className={styles.buttonRow}>
            <Button kind="transparentBorder" onClick={handleContinue}>
              {continueLabel}
            </Button>
            <Button>{payLabel}</Button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.right}>
            <Button kind="transparentBorder" onClick={handleContinue}>
              {continueLabel}
            </Button>
          </div>
          <div className={styles.left}>
            {hasPhones && (
              <div className={styles.totalPrice}>
                <Body isUppercase>Total</Body>
                <Body isUppercase>{total} eur</Body>
              </div>
            )}
            {hasPhones && <Button>{payLabel}</Button>}
          </div>
        </>
      )}
    </footer>
  );
};

export default CartFooter;
