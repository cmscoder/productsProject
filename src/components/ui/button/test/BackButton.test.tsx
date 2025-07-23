// Mock next/image to avoid non-boolean attribute warnings
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, fill, ...rest } = props;
    return <img {...rest} src={props.src || '/test.png'} />;
  },
}));
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BackButton from '../BackButton';

jest.mock('../../icons/ArrowLeftIcon', () => ({
  ArrowLeftIcon: (props: any) => (
    <svg data-testid="arrow-left-icon" {...props} />
  ),
}));

jest.mock('../../../text', () => ({
  Body: ({ isUppercase, children, ...props }: any) => (
    <p {...props}>{children}</p>
  ),
}));

describe('BackButton', () => {
  it('renders with default label', () => {
    render(<BackButton />);
    expect(screen.getByRole('button')).toHaveTextContent('Back');
  });

  it('renders with custom label', () => {
    render(<BackButton label="Go Back" />);
    expect(screen.getByRole('button')).toHaveTextContent('Go Back');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<BackButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<BackButton className="custom-class" />);
    expect(screen.getByRole('button').className).toMatch(/custom-class/);
  });

  it('renders ArrowLeftIcon and Body', () => {
    render(<BackButton />);
    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });
});
