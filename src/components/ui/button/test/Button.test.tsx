import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies disabled prop', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies kind and feedback styles', () => {
    render(
      <Button kind="transparentBorder" feedback="Primary">
        Styled
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toMatch(/transparentBorder/);
    expect(btn.className).toMatch(/Primary/);
  });

  it('applies custom style', () => {
    render(<Button style={{ backgroundColor: 'red' }}>Styled</Button>);
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: 'red' });
  });
});
