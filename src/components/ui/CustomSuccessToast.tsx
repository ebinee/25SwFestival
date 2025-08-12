import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../styles/colors';
import CustomText from './CustomText';

const CustomSuccessToast = ({ text1, text2 }: any) => (
  <View
    style={{
      width: '90%',
      backgroundColor: colors.green,
      padding: 16,
      borderRadius: 10,
      marginHorizontal: 20,
      marginBottom: 90,
    }}
  >
    <CustomText style={{ color: colors.gray8, fontSize: 16 }} weight="600">
      {text1}
    </CustomText>
    {text2 && (
      <CustomText style={{ color: colors.gray8, fontSize: 13 }}>
        {text2}
      </CustomText>
    )}
  </View>
);

export default CustomSuccessToast;
