import React from 'react';
import type { Metadata } from 'next';

import './globals.scss';
import 'simplebar-react/dist/simplebar.min.css';
import Header from '@/components/header';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Discover and compare the best smartphones',
  description:
    'Find, compare, and explore more than 1000 smartphones from top brands. Discover specs, prices, reviews, and more.',
  keywords: [
    'phones',
    'smartphones',
    'mobile',
    'discover',
    'compare',
    'android',
    'iphone',
    'samsung',
    'xiaomi',
    'apple',
    'specs',
    'reviews',
    'buy',
  ],
  openGraph: {
    title: 'Discover and compare the best smartphones',
    description:
      'Find, compare, and explore more than 1000 smartphones from top brands. Discover specs, prices, reviews, and more.',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
