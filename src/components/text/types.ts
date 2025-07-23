import { Color, FontStyle } from '../shared/types';

export type Weight = 'regular' | 'medium' | 'demiBold' | undefined;

export type BaseTextProps<T extends keyof HTMLElementTagNameMap = 'p'> = {
  as?: T;
  children: React.ReactNode;
  color?: Color;
  weight?: Weight;
  fontStyle?: FontStyle;
  letterSpacing?: string | number;
  fontSize?: string | number;
  className?: string;
  style?: React.CSSProperties;
  align?: string;
  isLink?: boolean;
  isUppercase?: boolean;
} & React.HTMLAttributes<HTMLElementTagNameMap[T]>;
