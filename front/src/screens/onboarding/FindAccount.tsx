import React, { useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import styled from 'styled-components/native';

const FindAccount = () => {
  const { bottom } = useSafeAreaInsets();

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Container style={{ paddingBottom: bottom }}>
      <InnerWrapper>
        <Title>비밀번호 찾기</Title>

        <Label>아이디</Label>
        <Input
          value={id}
          onChangeText={setId}
          placeholder="아이디 입력 (6~20자)                                        "
        />

        <Label>이메일</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="이메일 주소 입력                                                "
        />

        <PrimaryButton
          title="비밀번호 찾기"
          color={colors.Blue || '#B7D8FF'}
          onPress={() => {}}
          style={{ marginTop: 40 }}
        />
      </InnerWrapper>
    </Container>
  );
};

export default FindAccount;

// ================== styled-components ===================
const InnerWrapper = styled.View`
  align-items: flex-start; 
  width: 100%;
  padding: 50px 20px;        
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #b0c8e8;
  margin-bottom: 25px;     
`;

const Label = styled.Text`
  font-size: 15px;
  color: #444;
  margin-top: 0px;
  margin-bottom: 6px;      
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 32px;   
`;
