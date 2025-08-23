import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';
import { Image } from 'react-native';
import searchIcon from '../../assets/images/icon/Search.png';

const SearchBarContainer = styled.View`
  width: 100%;
  height: 42px;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 0 15px;
  border-radius: 20px;
  border: 1px solid ${colors.green};
  elevation: 3;
`;

const SearchBar = styled.TextInput`
  height: 100%;
  flex: 1;
  font-size: 13px;
  color: ${colors.gray6};
`;

const SearchInput = () => {
  return (
    <SearchBarContainer>
      <SearchBar
        placeholder="장소를 검색하세요"
        placeholderTextColor={colors.gray6}
      />
      <Image source={searchIcon} style={{ width: 22, height: 22 }} />
    </SearchBarContainer>
  );
};

export default SearchInput;
