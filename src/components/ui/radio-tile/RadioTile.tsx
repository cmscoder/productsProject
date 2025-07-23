import React from 'react';

import Label from '@/components/ui/label/Label';
import cx from 'classnames';
import styles from './RadioTile.module.scss';

interface RadioTileProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  'aria-label'?: string;
  width?: string | number;
  height?: string | number;
}

const RadioTile: React.FC<RadioTileProps> = ({
  name,
  value,
  checked,
  onChange,
  label,
  className,
  style,
  id,
  onMouseEnter,
  onMouseLeave,
  width,
  height,
  ...rest
}) => (
  <Label
    htmlFor={id}
    className={cx(styles.radioTile, className)}
    aria-checked={checked}
    role="radio"
    style={{ width, height, ...style }}
    {...rest}
  >
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className={styles.radioInput}
      aria-hidden="true"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
    {label}
  </Label>
);

export default RadioTile;
