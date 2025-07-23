import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('a', 500));
    expect(result.current).toBe('a');
  });

  it('updates value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'a', delay: 500 },
      }
    );
    rerender({ value: 'b', delay: 500 });
    expect(result.current).toBe('a');
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('b');
  });

  it('resets timer if value changes before delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'a', delay: 500 },
      }
    );
    rerender({ value: 'b', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(300);
    });
    rerender({ value: 'c', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('c');
  });
});
