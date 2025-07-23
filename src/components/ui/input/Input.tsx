('use client');
import React from 'react';
import { ChangeEvent } from 'react';
import cx from 'classnames';
import styles from './Input.module.scss';

interface InputProps {
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  id?: string;
  name?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function Input({
  value,
  onChange,
  placeholder,
  className,
  type = 'text',
  id,
  name,
  onMouseEnter,
  onMouseLeave,
}: InputProps) {
  return (
    <input
      className={cx(styles.input, className)}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}
