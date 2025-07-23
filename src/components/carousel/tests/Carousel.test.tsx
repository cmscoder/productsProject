import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '../Carousel';

const items = [
  <div key="1">Item 1</div>,
  <div key="2">Item 2</div>,
  <div key="3">Item 3</div>,
];

describe('Carousel', () => {
  it('renders all children inside carousel items', () => {
    render(<Carousel>{items}</Carousel>);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('applies carouselWrapper and carouselItem classes', () => {
    const { container } = render(<Carousel>{items}</Carousel>);
    expect(container.querySelector('.carouselWrapper')).toBeInTheDocument();
    expect(container.querySelectorAll('.carouselItem')).toHaveLength(3);
  });
});
