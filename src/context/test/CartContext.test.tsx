import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProvider, useCart, CartItem } from '../CartContext';

function TestComponent() {
  const ctx = useCart();
  return (
    <>
      <span data-testid="cart-length">{ctx.items.length}</span>
      <button
        onClick={() =>
          ctx.addToCart({
            id: '1',
            name: 'Test',
            brand: 'Brand',
            imageUrl: '',
            color: '',
            colorHex: '',
            storage: '',
            price: 100,
          })
        }
      >
        Add
      </button>
      <button onClick={() => ctx.removeFromCart('1')}>Remove</button>
    </>
  );
}

describe('CartContext', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });
  beforeEach(() => {
    localStorage.clear();
  });

  it('throws error if useCart is used outside provider', () => {
    const Broken = () => {
      useCart();
      return null;
    };
    expect(() => render(<Broken />)).toThrow(
      'useCart must be used within CartProvider'
    );
  });

  it('provides cart context and allows adding/removing items', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addBtn = await screen.findByText('Add');
    const removeBtn = await screen.findByText('Remove');
    const length = await screen.findByTestId('cart-length');
    expect(length).toHaveTextContent('0');
    await act(async () => {
      fireEvent.click(addBtn);
    });
    await screen.findByText('1');
    expect(length).toHaveTextContent('1');
    await act(async () => {
      fireEvent.click(removeBtn);
    });
    await screen.findByText('0');
    expect(length).toHaveTextContent('0');
  });

  it('syncs with localStorage', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addBtn = await screen.findByText('Add');
    addBtn.click();
    await screen.findByText('1');
    expect(JSON.parse(localStorage.getItem('cart')!)).toHaveLength(1);
  });
});
