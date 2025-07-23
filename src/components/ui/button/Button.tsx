import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  kind?: 'Text' | 'transparentBorder';
  feedback?: 'Primary';
  breakpoint?: 'XS-M';
  extraHeight?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Button({
  kind = 'Text',
  feedback = 'Primary',
  disabled = false,
  children,
  onClick,
  style,
}: ButtonProps) {
  return (
    <button
      className={cx(
        styles.button,
        kind && styles[kind],
        styles[feedback],
        disabled && styles.disabled
      )}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
