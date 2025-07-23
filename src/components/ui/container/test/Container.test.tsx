import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from '../Container';

describe('Container', () => {
  it('renders children inside a div', () => {
    render(
      <Container>
        <span>Test Child</span>
      </Container>
    );
    const div = screen.getByText('Test Child').parentElement;
    expect(div).toBeInTheDocument();
    expect(div?.tagName).toBe('DIV');
  });

  it('applies container class', () => {
    render(
      <Container>
        <span>Class Test</span>
      </Container>
    );
    const div = screen.getByText('Class Test').parentElement;
    expect(div?.className).toMatch(/container/);
  });
});
