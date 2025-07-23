import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartIcon from '../CartIcon';

// Mock dependencies
jest.mock('@/components/ui/icons', () => ({
  BagIcon: ({ hasItems }: { hasItems: boolean }) => (
    <svg data-testid="bag-icon" data-has-items={hasItems}></svg>
  ),
}));
jest.mock('@/components/text/Body', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <p {...props}>{children}</p>,
}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

describe('CartIcon', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('does not render when cart is loading', () => {
    jest.doMock('@/context/CartContext', () => ({
      useCart: () => ({ items: [], cartLoading: true }),
    }));
    const CartIcon = require('../CartIcon').default;
    const { container } = render(<CartIcon />);
    expect(container.firstChild).toBeNull();
  });

  it('shows bag icon and item count', () => {
    jest.doMock('@/context/CartContext', () => ({
      useCart: () => ({ items: [{ id: 1 }, { id: 2 }], cartLoading: false }),
    }));
    const CartIcon = require('../CartIcon').default;
    render(<CartIcon />);
    expect(screen.getByTestId('bag-icon')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows zero when cart is empty', () => {
    jest.doMock('@/context/CartContext', () => ({
      useCart: () => ({ items: [], cartLoading: false }),
    }));
    const CartIcon = require('../CartIcon').default;
    render(<CartIcon />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
