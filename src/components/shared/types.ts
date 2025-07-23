import { colors } from './constants';

export type Shade = 'dark' | 'medium' | 'light';
export type Color = `grey-${Shade}` | 'forms-red' | 'black' | 'white';

export type FontStyle = 'italic' | 'normal';

export type ColorsObject = typeof colors;
