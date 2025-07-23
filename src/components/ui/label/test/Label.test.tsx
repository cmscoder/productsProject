import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from '../Label';

describe('Label', () => {
  it('renders children', () => {
    render(<Label htmlFor="input-id">Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('sets htmlFor attribute', () => {
    render(<Label htmlFor="input-id">Label</Label>);
    const label = screen.getByText('Label');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('applies custom className', () => {
    render(
      <Label htmlFor="input-id" className="custom-class">
        Label
      </Label>
    );
    const label = screen.getByText('Label');
    expect(label.className).toMatch(/custom-class/);
  });

  it('spreads extra props', () => {
    render(
      <Label htmlFor="input-id" data-testid="label-test">
        Label
      </Label>
    );
    expect(screen.getByTestId('label-test')).toBeInTheDocument();
  });
});
