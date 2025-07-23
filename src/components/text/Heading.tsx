import React from 'react';
import { BaseText } from './BaseText';
import { BaseTextProps } from './types';
import styles from './Heading.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface HeadingProps extends Omit<BaseTextProps<HeadingTag>, 'as'> {
  as?: HeadingTag;
}

const Heading = ({ as = 'h1', ...rest }: HeadingProps) => {
  return <BaseText<HeadingTag> as={as} className={styles[as]} {...rest} />;
};

export default Heading;
