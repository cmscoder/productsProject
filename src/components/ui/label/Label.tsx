import React from 'react';
import styles from './Label.module.scss';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className,
  ...rest
}) => (
  <label
    htmlFor={htmlFor}
    className={className ? `${styles.label} ${className}` : styles.label}
    {...rest}
  >
    {children}
  </label>
);

export default Label;
