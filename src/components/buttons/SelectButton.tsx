import React from 'react';
import * as S from '../../styles/Button.styles';

const SelectButton = ({
  title,
  isSelected,
  onPress,
}: {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <S.SelectWrapper isSelected={isSelected} onPress={onPress}>
      <S.SelectText isSelected={isSelected}>{title}</S.SelectText>
    </S.SelectWrapper>
  );
};

export default SelectButton;
