import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/icons';
import CartIcon from '../cart-icon';
import styles from './Header.module.scss';
import Container from '@/components/ui/container';
import HeaderLoadingBar from '../header-loading-bar';

interface HeaderProps {
  cartLoading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ cartLoading }) => {
  return (
    <div className={styles.headerFixed}>
      {cartLoading && <HeaderLoadingBar />}
      <Container>
        <header className={styles.headerWrapper}>
          <nav className={styles.nav}>
            <Link href="/" aria-label="Home">
              <Logo />
            </Link>
          </nav>
          <CartIcon />
        </header>
      </Container>
    </div>
  );
};

export default Header;
