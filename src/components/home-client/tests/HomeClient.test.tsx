import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeClient from '../HomeClient';

// Mock dependencies
jest.mock('@/components/header', () => ({
  __esModule: true,
  default: ({ cartLoading }: { cartLoading?: boolean }) => (
    <div data-testid="header">Header {cartLoading ? 'loading' : 'ready'}</div>
  ),
}));
jest.mock('@/components/ui/input', () => ({
  __esModule: true,
  Input: (props: any) => <input {...props} data-testid="search-input" />,
}));
jest.mock('@/components/product-card', () => ({
  __esModule: true,
  ProductCard: ({ product }: any) => (
    <div data-testid="product-card">{product.title}</div>
  ),
}));
// Default mock: cartLoading false
jest.mock('@/context/CartContext', () => ({
  useCart: () => ({ cartLoading: false }),
}));

const mockProducts = [
  {
    id: '1',
    title: 'iPhone 13',
    brand: 'Apple',
    name: 'iPhone 13',
    basePrice: 799,
    imageUrl: 'https://example.com/iphone13.jpg',
  },
  {
    id: '2',
    title: 'Galaxy S22',
    brand: 'Samsung',
    name: 'Galaxy S22',
    basePrice: 699,
    imageUrl: 'https://example.com/galaxys22.jpg',
  },
];

describe('HomeClient', () => {
  it('renders header and product cards', () => {
    render(<HomeClient products={mockProducts} />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
  });

  it('shows search input and filters products', async () => {
    render(<HomeClient products={mockProducts} />);
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'iPhone' } });
    // Simulate API response
    await waitFor(() => {
      expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    });
  });
});
