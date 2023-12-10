import {Platform} from 'react-native';

export const fonts =
  Platform.OS === 'ios'
    ? {
        regular: 'SFProRounded-Regular',
        semibold: 'SFProRounded-Semibold',
        bold: 'SFProRounded-Heavy',
      }
    : {
        regular: 'Regular',
        semibold: 'Semibold',
        bold: 'Bold',
      };

export const fontSizes = {
  xxxxs: 8,
  xxxs: 10,
  xxs: 13,
  xs: 15,
  s: 17,
  m: 20,
  l: 22,
  xl: 28,
  xxl: 34,
  xxxl: 44,
};

export const fontSize = {
  xxxs: 10,
  xxs: 12,
  xs: 14,
  s: 16,
  m: 18,
  l: 21,
  xl: 24,
  xxl: 28,
  xxxl: 34,
};
