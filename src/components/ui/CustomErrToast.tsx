import React from 'react';
import { View } from 'react-native';
import { colors } from '../../styles/colors';
import CustomText from './CustomText';

const CustomErrToast = ({ text1, text2 }: any) => (
  <View
    style={{
      width: '90%',
      backgroundColor: colors.red,
      padding: 16,
      borderRadius: 10,
      marginHorizontal: 20,
      marginBottom: 90,
    }}
  >
    <CustomText style={{ color: 'white', fontSize: 16 }}>{text1}</CustomText>
    {text2 && (
      <CustomText style={{ color: 'white', fontSize: 13 }}>{text2}</CustomText>
    )}
  </View>
);

export default CustomErrToast;
