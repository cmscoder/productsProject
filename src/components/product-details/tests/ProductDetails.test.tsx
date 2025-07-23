import React from 'react';
// Mock useRouter before importing ProductDetails
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
    // add other router methods if needed
  }),
}));
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetails from '../ProductDetails';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, fill, ...rest } = props;
    return <img {...rest} />;
  },
}));

jest.mock('@/components/ui/container', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('@/components/text/Heading', () => ({
  __esModule: true,
  default: ({ children }: any) => <h4>{children}</h4>,
}));

jest.mock('@/components/product-selectors', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="product-selectors">ProductSelectors</div>
  ),
}));

jest.mock('@/components/specifications', () => ({
  __esModule: true,
  default: ({ product }: any) => (
    <div data-testid="specifications">Specifications</div>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  __esModule: true,
  default: ({ onClick }: any) => <button onClick={onClick}>Back</button>,
}));

jest.mock('@/components/similar-items', () => ({
  __esModule: true,
  default: ({ similarProducts }: any) => (
    <div data-testid="similar-items">SimilarItems</div>
  ),
}));

const product = {
  id: 'test-id',
  name: 'Test Product',
  brand: 'Test Brand',
  basePrice: 100,
  colorOptions: [
    { id: 'color1', name: 'Red', imageUrl: '/red.jpg', hexCode: '#ff0000' },
    { id: 'color2', name: 'Blue', imageUrl: '/blue.jpg', hexCode: '#0000ff' },
  ],
  storageOptions: [
    { id: 'storage1', name: '64GB', capacity: '64', price: 0 },
    { id: 'storage2', name: '128GB', capacity: '128', price: 50 },
  ],
  similarProducts: [],
  specifications: {},
  description: 'Test description',
  specs: {
    screen: '6.1-inch',
    resolution: '1170 x 2532',
    processor: 'A15 Bionic',
    mainCamera: '12MP',
    frontCamera: '12MP',
    battery: '3095mAh',
    os: 'iOS 15',
    dimensions: '146.7 x 71.5 x 7.7 mm',
    weight: '174g',
    selfieCamera: '12MP',
    screenRefreshRate: '120Hz',
  },
};

describe('ProductDetails', () => {
  it('renders product name, price, and image', () => {
    render(<ProductDetails product={product} />);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(/From 100 EUR/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      product.colorOptions[0].imageUrl
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', product.name);
  });

  it('renders ProductSelectors, Specifications, and SimilarItems', () => {
    render(<ProductDetails product={product} />);
    expect(screen.getByTestId('product-selectors')).toBeInTheDocument();
    expect(screen.getByTestId('specifications')).toBeInTheDocument();
    expect(screen.getByTestId('similar-items')).toBeInTheDocument();
  });

  it('calls router.back when BackButton is clicked', () => {
    const mockBack = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ back: mockBack });
    render(<ProductDetails product={product} />);
    fireEvent.click(screen.getByText('Back'));
    expect(mockBack).toHaveBeenCalled();
  });
});
