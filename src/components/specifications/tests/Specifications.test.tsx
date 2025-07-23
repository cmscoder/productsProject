import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Specifications from '../Specifications';

jest.mock('../../text', () => ({
  Body: ({ children, isUppercase, ...props }: any) => (
    <p {...props}>{children}</p>
  ),
  Heading: ({ children, isUppercase, ...props }: any) => (
    <h4 {...props}>{children}</h4>
  ),
}));

describe('Specifications', () => {
  const product = {
    id: '1',
    name: 'Test Product',
    brand: 'Test Brand',
    basePrice: 100,
    description: 'A test product',
    specs: {
      screen: '6.1-inch',
      resolution: '1170 x 2532',
      processor: 'A15 Bionic',
      mainCamera: '12MP',
      selfieCamera: '12MP',
      battery: '3095mAh',
      os: 'iOS 15',
      screenRefreshRate: '60Hz',
    },
    colorOptions: [
      {
        id: 'black',
        name: 'Black',
        imageUrl: '/black.jpg',
        hexCode: '#000000',
      },
      {
        id: 'white',
        name: 'White',
        imageUrl: '/white.jpg',
        hexCode: '#ffffff',
      },
    ],
    storageOptions: [
      { id: '64', name: '64GB', capacity: '64', price: 0 },
      { id: '128', name: '128GB', capacity: '128', price: 50 },
    ],
    similarProducts: [],
  };

  it('renders the specifications title', () => {
    render(<Specifications product={product} />);
    expect(screen.getByText('Specifications')).toBeInTheDocument();
  });

  it('renders all product specs', () => {
    render(<Specifications product={product} />);
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('A test product')).toBeInTheDocument();
    expect(screen.getByText('screen')).toBeInTheDocument();
    expect(screen.getByText('6.1-inch')).toBeInTheDocument();
    expect(screen.getByText('resolution')).toBeInTheDocument();
    expect(screen.getByText('1170 x 2532')).toBeInTheDocument();
    expect(screen.getByText('processor')).toBeInTheDocument();
    expect(screen.getByText('A15 Bionic')).toBeInTheDocument();
  });

  it('renders nothing if product is missing', () => {
    // @ts-expect-error
    const { container } = render(<Specifications />);
    expect(container.firstChild).toBeNull();
  });
});
