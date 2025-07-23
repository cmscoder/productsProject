import React from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import styles from './BackButton.module.scss';
import { Body } from '../../text';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  className = '',
  label = 'Back',
}) => (
  <button
    className={`${styles.backButton} ${className}`}
    onClick={onClick}
    type="button"
  >
    <ArrowLeftIcon className={styles.icon} />
    <Body fontSize="12px" isUppercase>
      {label}
    </Body>
  </button>
);

export default BackButton;
