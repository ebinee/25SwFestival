import React, { useState } from 'react';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import styled from 'styled-components/native';
import { ScrollContainer } from '../../styles/GlobalStyles';


const SignUp = () => {
  const { bottom } = useSafeAreaInsets();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  return (
    <ScrollContainer contentContainerStyle={{ paddingBottom: bottom }}>
      <InnerWrapper>
        <Title>회원가입</Title>

        <Label>아이디</Label>
        <Input
          value={id}
          onChangeText={setId}
          placeholder="아이디 입력 (6~20자)                                        "
        />

        <Label>비밀번호</Label>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호 입력                                                "
          secureTextEntry
        />

        <Label>비밀번호 확인</Label>
        <Input
          value={passwordCheck}
          onChangeText={setPasswordCheck}
          placeholder="비밀번호 재입력                                               "
          secureTextEntry
        />

        <Label>이메일</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="이메일 주소 입력                                              "
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Label>성별</Label>
        <GenderRow>
          <GenderButton
            selected={gender === 'male'}
            onPress={() => setGender('male')}
          >
            <GenderText selected={gender === 'male'}>남자</GenderText>
          </GenderButton>
          <GenderButton
            selected={gender === 'female'}
            onPress={() => setGender('female')}
          >
            <GenderText selected={gender === 'female'}>여자</GenderText>
          </GenderButton>
        </GenderRow>

        <Label>생년월일</Label>
        <BirthRow>
          <SmallInput
            value={year}
            onChangeText={setYear}
            placeholder="YYYY"
            keyboardType="numeric"
            maxLength={4}
          />
          <SmallInput
            value={month}
            onChangeText={setMonth}
            placeholder="MM"
            keyboardType="numeric"
            maxLength={2}
          />
          <SmallInput
            value={day}
            onChangeText={setDay}
            placeholder="DD"
            keyboardType="numeric"
            maxLength={2}
          />
        </BirthRow>

        <PrimaryButton
          title="회원가입"
          color={colors.Blue || '#B7D8FF'}
          onPress={() => {}}
          style={{ marginTop: 40 }}
        />
      </InnerWrapper>
    </ScrollContainer>
  );
};



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
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 15px;
  color: #444;
  margin-top: 16px;
  margin-bottom: 6px;     
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 16px;     
`;

const GenderRow = styled.View`
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const GenderButton = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  border-width: 1px;
  border-color: ${({ selected }) => (selected ? '#B7D8FF' : '#d3d3d3')};
  border-radius: 8px;
  padding: 12px 0;
  align-items: center;
  margin-right: 8px;
  background-color: ${({ selected }) => (selected ? '#B7D8FF22' : '#fff')};
`;

const GenderText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? '#3b5998' : '#444')};
  font-size: 15px;
`;

const BirthRow = styled.View`
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 32px;
`;

const SmallInput = styled.TextInput`
  flex: 1;
  border-width: 1px;
  border-color: #d3d3d3;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  margin-right: 8px;
`;

export default SignUp;