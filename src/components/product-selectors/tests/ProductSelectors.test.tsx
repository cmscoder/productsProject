import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductSelectors from '../ProductSelectors';

jest.mock('@/components/ui/button', () => ({
  __esModule: true,
  default: ({ onClick, children, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children || 'Back'}
    </button>
  ),
  Button: ({ onClick, children, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/context/CartContext', () => ({
  useCart: () => ({
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    items: [],
    selectedCartItemId: null,
    setSelectedCartItemId: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/components/text', () => ({
  Body: ({ children }: any) => <p>{children}</p>,
  Small: ({ children }: any) => <small>{children}</small>,
}));

jest.mock('@/components/ui/radio-tile/RadioTile', () => ({
  __esModule: true,
  default: ({ label, onChange, ...props }: any) => (
    <div {...props} onClick={onChange}>
      {label}
    </div>
  ),
}));

jest.mock('@/components/ui/label/Label', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => (
    <label {...props}>{children}</label>
  ),
}));

const colorOptions = [
  { id: 'red', name: 'Red', imageUrl: '/red.jpg', hexCode: '#ff0000' },
  { id: 'blue', name: 'Blue', imageUrl: '/blue.jpg', hexCode: '#0000ff' },
];

const storageOptions = [
  { id: '64', name: '64GB', capacity: '64', price: 0 },
  { id: '128', name: '128GB', capacity: '128', price: 50 },
];

describe('ProductSelectors', () => {
  it('renders storage and color options', () => {
    render(
      <ProductSelectors
        colorOptions={colorOptions}
        storageOptions={storageOptions}
        basePrice={100}
        name="Test Product"
        brand="Test Brand"
        onChange={jest.fn()}
      />
    );
    expect(
      screen.getByText('Storage: How much space do you need?')
    ).toBeInTheDocument();
    expect(screen.getByText('Color: Pick your favourite.')).toBeInTheDocument();
    expect(screen.getByLabelText('64')).toBeInTheDocument();
    expect(screen.getByLabelText('128')).toBeInTheDocument();
    expect(screen.getByLabelText('Red')).toBeInTheDocument();
    expect(screen.getByLabelText('Blue')).toBeInTheDocument();
  });

  it('disables add to cart button if no selection', () => {
    render(
      <ProductSelectors
        colorOptions={colorOptions}
        storageOptions={storageOptions}
        basePrice={100}
        name="Test Product"
        brand="Test Brand"
        onChange={jest.fn()}
      />
    );
    expect(
      screen.getByRole('button', { name: /añadir al carrito/i })
    ).toBeDisabled();
  });

  it('calls onChange when a storage option is clicked', () => {
    const onChange = jest.fn();
    render(
      <ProductSelectors
        colorOptions={colorOptions}
        storageOptions={storageOptions}
        basePrice={100}
        name="Test Product"
        brand="Test Brand"
        selectedColor={colorOptions[0]}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText('64'));
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onChange when a color option is clicked', () => {
    const onChange = jest.fn();
    render(
      <ProductSelectors
        colorOptions={colorOptions}
        storageOptions={storageOptions}
        basePrice={100}
        name="Test Product"
        brand="Test Brand"
        selectedStorage={storageOptions[0]}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Red'));
    expect(onChange).toHaveBeenCalled();
  });
});
