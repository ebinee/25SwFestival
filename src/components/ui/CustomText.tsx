import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  style?: StyleProp<TextStyle>;
}

const getFontFamily = (weight: FontWeight = '400') => {
  const map: { [key in FontWeight]: string } = {
    '100': 'Pretendard-Thin',
    '200': 'Pretendard-ExtraLight',
    '300': 'Pretendard-Light',
    '400': 'Pretendard-Regular',
    '500': 'Pretendard-Medium',
    '600': 'Pretendard-SemiBold',
    '700': 'Pretendard-Bold',
    '800': 'Pretendard-ExtraBold',
    '900': 'Pretendard-Black',
  };
  return map[weight];
};

const CustomText: React.FC<CustomTextProps> = ({
  children,
  weight = '400',
  style,
  ...props
}) => {
  return (
    <Text {...props} style={[{ fontFamily: getFontFamily(weight) }, style]}>
      {children}
    </Text>
  );
};

export default CustomText;
