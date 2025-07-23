'use client';

import React, { JSX } from 'react';
import { BaseText } from './BaseText';
import { BaseTextProps } from './types';

type BodyProps<T extends keyof JSX.IntrinsicElements> = Omit<
  JSX.IntrinsicElements[T],
  keyof BaseTextProps<keyof HTMLElementTagNameMap>
> &
  BaseTextProps<keyof HTMLElementTagNameMap> & {
    as?: T;
  };

const Body = <T extends keyof JSX.IntrinsicElements = 'p'>({
  isUppercase,
  ...props
}: BodyProps<T>) => {
  return <BaseText isUppercase={isUppercase} {...props} />;
};

export default Body;
