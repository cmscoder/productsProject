// Mock next/image to avoid errors with empty src in tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Remove Next.js-specific props like fill and priority
    const { fill, priority, ...rest } = props;
    return <img {...rest} src={props.src || '/test.png'} />;
  },
}));

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      };
    };
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../page';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

jest.mock('@/context/CartContext');
jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));

const mockRemoveFromCart = jest.fn();
const mockPush = jest.fn();

const mockCart = [
  {
    id: '1',
    name: 'Phone',
    brand: 'Brand',
    imageUrl: '',
    color: '',
    colorHex: '',
    storage: '',
    price: 100,
  },
  {
    id: '2',
    name: 'Tablet',
    brand: 'Brand',
    imageUrl: '',
    color: '',
    colorHex: '',
    storage: '',
    price: 200,
  },
];

describe('CartPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCart as jest.Mock).mockReturnValue({
      items: mockCart,
      removeFromCart: mockRemoveFromCart,
      selectedCartItemId: null,
      cartLoading: false,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders cart items and total', () => {
    render(<CartPage />);
    expect(screen.getByText(/CART \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Tablet')).toBeInTheDocument();
    expect(screen.getByText(/300/)).toBeInTheDocument();
  });

  it('removes item when onRemove is called', () => {
    render(<CartPage />);
    const removeButtons = screen.getAllByRole('button', { name: /eliminar/i });
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
  });

  it('continues shopping when onContinue is called', () => {
    render(<CartPage />);
    const continueBtn = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(continueBtn);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('shows loading header when cartLoading is true', () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [],
      removeFromCart: mockRemoveFromCart,
      selectedCartItemId: null,
      cartLoading: true,
    });
    render(<CartPage />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
