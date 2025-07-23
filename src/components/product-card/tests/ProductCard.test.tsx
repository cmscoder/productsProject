import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from '../ProductCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, fill, ...rest } = props;
    return <img {...rest} />;
  },
}));

jest.mock('../../text', () => ({
  Small: ({ children }: any) => <small>{children}</small>,
  Body: ({ children }: any) => <p>{children}</p>,
}));

const product = {
  id: 'test-id',
  imageUrl: '/test-image.jpg',
  name: 'Test Product',
  brand: 'Test Brand',
  basePrice: 99,
};

describe('ProductCard', () => {
  it('renders product image with correct src and alt', () => {
    render(<ProductCard product={product} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', product.imageUrl);
    expect(img).toHaveAttribute('alt', product.name);
  });

  it('renders product brand, name, and price', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(product.brand)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`${product.basePrice} eur`)).toBeInTheDocument();
  });
});
