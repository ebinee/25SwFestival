import React, { useState } from 'react';
import styled from 'styled-components/native';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Searchpage = () => {
  const [searchText, setSearchText] = useState('');
  const [recentKeywords, setRecentKeywords] = useState(['서울데이트', '서울여행', '데이트코스추천', '행궁동', '시장']);
  const navigation = useNavigation();
  
  const handleKeywordPress = (keyword: React.SetStateAction<string>) => {
    setSearchText(keyword);
  };

  const handleSubmit = () => {
    if (!searchText.trim()) return;
    setRecentKeywords(prev => 
      [searchText, ...prev.filter(item => item !== searchText)].slice(0, 5)
    );
    setSearchText('');
  };

  const handleKeywordDelete = (keyword: string) => {
    setRecentKeywords(prev => prev.filter(item => item !== keyword));
  };

  const handleClearAll = () => setRecentKeywords([]);

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'ios' ? 50 : 20 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header>
        <SearchInput
          placeholder="통합검색"
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CancelText>취소</CancelText>
        </TouchableOpacity>
      </Header>

      <RecentSection>
        <RecentHeader>
          <RecentLabel>최근 검색어</RecentLabel>
          <TouchableOpacity onPress={handleClearAll}>
            <ClearText>비우기</ClearText>
          </TouchableOpacity>
        </RecentHeader>
        {recentKeywords.map(keyword => (
          <KeywordRow key={keyword}>
            <TouchableOpacity onPress={() => handleKeywordPress(keyword)} style={{ flex: 1 }}>
              <KeywordText>{keyword}</KeywordText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleKeywordDelete(keyword)}>
              <DeleteText>✕</DeleteText>
            </TouchableOpacity>
          </KeywordRow>
        ))}
      </RecentSection>
    </KeyboardAvoidingView>
  );
};

export default Searchpage;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 14px;
  margin-bottom: 10px;
  margin-top : 13px;
`;
const SearchInput = styled.TextInput`
  flex: 1;
  background: #f2f3f5;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 15px;
  margin-right: 14px;
`;
const CancelText = styled.Text`
  font-size: 16px;
  color: #007aff;
`;

const RecentSection = styled.View`
  padding: 0 20px;
`;

const RecentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

const RecentLabel = styled.Text`
  font-size: 14px;
  color: #929292;
`;

const ClearText = styled.Text`
  font-size: 13px;
  color: #007aff;
`;

const KeywordRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 7px;
  border-bottom-width: 0.7px;
  border-bottom-color: #f2f2f2;
`;

const KeywordText = styled.Text`
  font-size: 17px;
  color: #232323;
`;

const DeleteText = styled.Text`
  font-size: 16px;
  color: #bbbbbb;
  padding-left: 14px;
`;
