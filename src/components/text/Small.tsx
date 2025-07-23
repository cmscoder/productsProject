import React from 'react';
import { FC } from 'react';
import { BaseText } from './BaseText';
import { BaseTextProps } from './types';

import cx from 'classnames';

import styles from './Small.module.scss';

interface SmallProps extends BaseTextProps<'small'> {
  xs?: boolean;
}

const Small: FC<SmallProps> = ({ xs = false, ...rest }) => {
  const joinedClassNames = cx(styles.small, {
    [styles.xs]: xs,
  });

  return <BaseText as="small" className={joinedClassNames} {...rest} />;
};

export default Small;
