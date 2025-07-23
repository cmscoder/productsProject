import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Input } from '../Input';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input value="" onChange={() => {}} placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(<Input value="hello" onChange={() => {}} />);
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Input value="" onChange={() => {}} className="custom-class" />);
    expect(screen.getByRole('textbox').className).toMatch(/custom-class/);
  });

  it('applies type, id, name, aria-hidden props', () => {
    render(
      <Input
        value="test value"
        onChange={() => {}}
        type="text"
        id="test-id"
        name="test-name"
        aria-hidden="true"
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'test-id');
    expect(input).toHaveAttribute('name', 'test-name');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('test value');
  });

  it('handles mouse events', () => {
    const onEnter = jest.fn();
    const onLeave = jest.fn();
    render(
      <Input
        value=""
        onChange={() => {}}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      />
    );
    const input = screen.getByRole('textbox');
    fireEvent.mouseEnter(input);
    fireEvent.mouseLeave(input);
    expect(onEnter).toHaveBeenCalled();
    expect(onLeave).toHaveBeenCalled();
  });
});
