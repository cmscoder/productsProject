import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderLoadingBar from '../HeaderLoadingBar';

describe('HeaderLoadingBar', () => {
  it('renders with correct class', () => {
    const { container } = render(<HeaderLoadingBar />);
    const bar = container.querySelector('.headerLoadingBar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveClass('headerLoadingBar');
  });
});
