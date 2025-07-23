import { colors } from '../shared/constants';
import { Color, ColorsObject } from '../shared/types';
import { weights } from './constants';
import { Weight } from './types';

export const getColorFromString = (colorString: Color) => {
  const [colorName, shade] = colorString.split('-');

  const color = shade
    ? colors[colorName as keyof ColorsObject][
        shade as keyof ColorsObject['grey' | 'forms']
      ]
    : colors[colorString as keyof ColorsObject];

  return color ? color : colors.black;
};

export const getFontWeightFromString = (weightString: Weight) => {
  if (!weightString) {
    return null;
  }

  const weight = weights[weightString];

  return weight ? weight : weights.regular;
};
