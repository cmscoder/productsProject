import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartFooter from '../CartFooter';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));
jest.mock('@/components/text', () => ({
  Body: ({ isUppercase, children, ...props }: any) => (
    <p {...props}>{children}</p>
  ),
}));

describe('CartFooter', () => {
  it('renders total and buttons in mobile mode', () => {
    // Simulate mobile viewport
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    render(<CartFooter total={100} onContinue={jest.fn()} hasPhones={true} />);
    expect(screen.getByText(/total/i)).toBeInTheDocument();
    expect(screen.getByText('100 eur')).toBeInTheDocument();
    expect(screen.getByText(/continue shopping/i)).toBeInTheDocument();
    expect(screen.getByText(/pay/i)).toBeInTheDocument();
  });

  it('renders continue and pay buttons in desktop mode when hasPhones is true', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    render(<CartFooter total={200} onContinue={jest.fn()} hasPhones={true} />);
    expect(screen.getByText(/continue shopping/i)).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();
    expect(screen.getByText('200 eur')).toBeInTheDocument();
    expect(screen.getByText(/pay/i)).toBeInTheDocument();
  });

  it('calls onContinue when continue button is clicked', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    const onContinue = jest.fn();
    render(<CartFooter total={50} onContinue={onContinue} hasPhones={true} />);
    fireEvent.click(screen.getByText(/continue shopping/i));
    expect(onContinue).toHaveBeenCalled();
  });

  it('renders only continue button when hasPhones is false', () => {
    render(<CartFooter total={100} onContinue={jest.fn()} hasPhones={false} />);
    expect(screen.getByText(/continue shopping/i)).toBeInTheDocument();
    expect(screen.queryByText(/total/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pay/i)).not.toBeInTheDocument();
  });
});
