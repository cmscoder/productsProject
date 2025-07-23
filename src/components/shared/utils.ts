import { colors } from './constants';
import { Color, ColorsObject } from './types';

export const getColorFromString = (colorString: Color) => {
  const [colorName, shade] = colorString.split('-');

  const color = shade
    ? colors[colorName as keyof ColorsObject][
        shade as keyof ColorsObject['grey' | 'forms']
      ]
    : colors[colorString as keyof ColorsObject];

  return color ? color : colors.black;
};
