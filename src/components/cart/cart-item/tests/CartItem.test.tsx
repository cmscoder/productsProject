import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartItem from '../CartItem';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, fill, ...rest } = props;
    return <img {...rest} data-testid="cart-image" />;
  },
}));
jest.mock('@/components/text', () => ({
  Body: ({ isUppercase, children, ...props }: any) => (
    <p {...props}>{children}</p>
  ),
}));

const mockItem = {
  id: 'abc123',
  name: 'iPhone 13',
  imageUrl: 'https://example.com/iphone13.jpg',
  storage: '128GB',
  color: 'Black',
  price: 799,
};

describe('CartItem', () => {
  it('renders item details and image', () => {
    render(<CartItem item={mockItem} onRemove={jest.fn()} />);
    expect(screen.getByTestId('cart-image')).toHaveAttribute(
      'src',
      mockItem.imageUrl
    );
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('128GB | Black')).toBeInTheDocument();
    expect(screen.getByText('799 EUR')).toBeInTheDocument();
    expect(screen.getByText('Eliminar')).toBeInTheDocument();
  });

  it('calls onRemove when delete button is clicked', () => {
    const onRemove = jest.fn();
    render(<CartItem item={mockItem} onRemove={onRemove} />);
    fireEvent.click(screen.getByText('Eliminar'));
    expect(onRemove).toHaveBeenCalledWith('abc123');
  });
});
