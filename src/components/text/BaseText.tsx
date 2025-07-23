import { createElement, FC } from 'react';
import { getColorFromString, getFontWeightFromString } from './utils';
import { BaseTextProps } from './types';

import cx from 'classnames';

import styles from './BaseText.module.scss';

export const BaseText = <T extends keyof HTMLElementTagNameMap>({
  as = 'p' as T,
  children,
  color = 'black',
  weight,
  fontStyle,
  letterSpacing,
  fontSize,
  align,
  style,
  isLink,
  isUppercase,
  className,
  ...rest
}: BaseTextProps<T>) => {
  const domProps = { ...rest };
  if ('isUppercase' in domProps) {
    delete (domProps as any).isUppercase;
  }
  const colorStyle = getColorFromString(color) as string;
  const fontWeightStyle = getFontWeightFromString(weight);

  const joinedClassName = cx(
    styles.baseText,
    {
      [styles.link]: isLink,
      [styles.uppercase]: isUppercase,
    },
    className
  );

  return createElement(
    as,
    {
      className: joinedClassName,
      style: {
        fontWeight: fontWeightStyle,
        fontStyle,
        color: colorStyle,
        textAlign: align,
        letterSpacing,
        fontSize,
        ...style,
      },
      ...domProps,
    },
    children
  );
};
