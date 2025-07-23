import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SimilarItems from '../SimilarItems';

jest.mock('../../carousel', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock('../../product-card', () => ({
  ProductCard: ({ product }: any) => (
    <div data-testid="product-card">{product.name}</div>
  ),
}));

jest.mock('../../text', () => ({
  Heading: ({ children, isUppercase, ...props }: any) => (
    <h4 {...props}>{children}</h4>
  ),
}));

describe('SimilarItems', () => {
  const products = [
    {
      id: '1',
      name: 'Product 1',
      brand: 'Brand A',
      imageUrl: '/img1.jpg',
      basePrice: 100,
    },
    {
      id: '2',
      name: 'Product 2',
      brand: 'Brand B',
      imageUrl: '/img2.jpg',
      basePrice: 200,
    },
  ];

  it('renders nothing if similarProducts is empty', () => {
    const { container } = render(<SimilarItems similarProducts={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders title and product cards when similarProducts are provided', () => {
    render(
      <SimilarItems similarProducts={products} title="You may also like" />
    );
    expect(screen.getByText('You may also like')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders default title if none is provided', () => {
    render(<SimilarItems similarProducts={products} />);
    expect(screen.getByText('Similar Items')).toBeInTheDocument();
  });
});
