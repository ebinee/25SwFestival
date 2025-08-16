import React from 'react';
import * as S from '../../styles/Button.styles';
import { Pressable } from 'react-native';

type IconParam = {
  icon: any;
  onPress?: () => void;
  size?: number;
};

const IconButton = ({ icon, onPress, size }: IconParam) => {
  return (
    <Pressable onPress={onPress}>
      <S.IconImage source={icon} size={size} />
    </Pressable>
  );
};

export default IconButton;
