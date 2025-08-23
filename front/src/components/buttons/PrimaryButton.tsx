import React from 'react';
import * as S from '../../styles/Button.styles';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const PrimaryButton = ({ title, onPress, color }: Props) => {
  return (
    <S.PrimaryWrapper onPress={onPress} backgroundColor={color}>
      <S.ButtonText>{title}</S.ButtonText>
    </S.PrimaryWrapper>
  );
};

export default PrimaryButton;
