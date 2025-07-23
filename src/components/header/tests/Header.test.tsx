import React from 'react';
import { render, screen } from '@/test-utils';
import '@testing-library/jest-dom';
import Header from '../Header';
import { CartProvider } from '@/context/CartContext';

describe('Header', () => {
  it('renders logo and bag icons', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /bag/i })).toBeInTheDocument();
  });

  it('logo has correct aria-label', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );
    const logo = screen.getByRole('img', { name: /logo/i });
    expect(logo).toHaveAttribute('aria-label', expect.stringMatching(/logo/i));
  });

  it('bag icon is visible', () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );
    const bag = screen.getByRole('img', { name: /bag/i });
    expect(bag).toBeVisible();
  });
});
