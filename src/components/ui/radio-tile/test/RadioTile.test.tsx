import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioTile from '../RadioTile';

describe('RadioTile', () => {
  const defaultProps = {
    name: 'group1',
    value: 'option1',
    checked: false,
    onChange: jest.fn(),
    label: 'Option 1',
    id: 'radio1',
  };

  it('renders label', () => {
    render(<RadioTile {...defaultProps} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('sets checked state', () => {
    render(<RadioTile {...defaultProps} checked={true} />);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio')).toHaveClass('radioTile');
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<RadioTile {...defaultProps} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('radio').querySelector('input')!);
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className and style', () => {
    render(
      <RadioTile
        {...defaultProps}
        className="custom-class"
        style={{ backgroundColor: 'red' }}
      />
    );
    const radio = screen.getByRole('radio');
    expect(radio.className).toMatch(/custom-class/);
    expect(radio).toHaveStyle({ backgroundColor: 'red' });
  });

  it('passes width and height props', () => {
    render(<RadioTile {...defaultProps} width={100} height={50} />);
    const radio = screen.getByRole('radio');
    expect(radio).toHaveStyle({ width: '100px', height: '50px' });
  });
});
