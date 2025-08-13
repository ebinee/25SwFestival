import React, { useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import styled from 'styled-components/native';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const Onboarding = () => {
  const navigation = useNavigation<Navigation>();
  const { bottom } = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(true);

  return (
    <Container style={{ paddingBottom: bottom }}>
      <SubTitle>기록하고싶은 그 순간, trippin에 담아</SubTitle>
      <Logo>TRIPPIN</Logo>
      <FormSection>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="이메일 입력"
          autoCapitalize="none"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호 입력"
          secureTextEntry
        />
        <Row activeOpacity={1} onPress={() => setAutoLogin(v => !v)}>
          <CheckCircle>
            {autoLogin ? <Checked /> : null}
          </CheckCircle>
          <CheckLabel>자동 로그인</CheckLabel>
        </Row>
        <PrimaryButton
          title="로그인"
          color={colors.Blue || '#B7D8FF'}
          onPress={() => {
            navigation.navigate('Main');
          }}
          style={{ marginTop: 50, marginBottom: 70 }}
        />
        <BottomRow>
          <Link onPress={() => navigation.navigate('SignUp')}>
            <LinkText>회원가입</LinkText>
          </Link>
          <Divider>|</Divider>
          <Link onPress={() => navigation.navigate('FindAccount')}>
            <LinkText>아이디/비밀번호 찾기</LinkText>
          </Link>
        </BottomRow>
      </FormSection>
      <SocialSection>
        <Line />
        <SocialText>간편 로그인</SocialText>
        <Line />
      </SocialSection>
      <SocialRow>
        <IconButton style={{ backgroundColor: '#FFE812' }}>
          <IconText>💬</IconText>
        </IconButton>
        <IconButton style={{ backgroundColor: '#03C75A' }}>
          <IconText>N</IconText>
        </IconButton>
        <IconButton style={{ backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1 }}>
          <IconText style={{ color: '#4285F4' }}>G</IconText>
        </IconButton>
      </SocialRow>
    </Container>
  );
};

export default Onboarding;

// ================== styled-components ===================
const SubTitle = styled.Text`
  color: #444;
  margin: 18px 150px 0 0;
  font-size: 13px;
  
`;

const Logo = styled.Text`
  font-size: 70px;
  font-weight: bold;
  color: #1a1a1a;
  letter-spacing: 2px;
  margin: 2px 70px 100px 0;
  text-align: left;
`;

const FormSection = styled.View`
  width: 100%;
`;

const Label = styled.Text`
  font-size: 15px;
  color: #444;
  margin-top: 16px;
`;

const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
  padding: 8px 0;
  font-size: 16px;
  margin: 14px 0 0 0;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 10px 0 0 0;
`;

const CheckCircle = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border: 1.5px solid #b5b5b5;
  align-items: center;
  justify-content: center;
  background: #fff;
  margin: 0 1px 25px 0;
`;

const Checked = styled.View`
  width: 12px;
  height: 12px;
  background: #b7d8ff;
  border-radius: 6px;
`;

const CheckLabel = styled.Text`
  
  color: #444;
  font-size: 14px;
  margin: 7px 0 35px 10px;
`;

const BottomRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 0 0 0;
`;

const Link = styled.TouchableOpacity``;

const LinkText = styled.Text`
  color: #222;
  font-size: 14px;
`;

const Divider = styled.Text`
  color: #b9b9b9;
  margin: 0 8px;
  font-size: 15px;
`;

const SocialSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 28px 0 30px 0;
`;

const Line = styled.View`
  flex: 1;
  height: 1px;
  background: #ececec;
`;

const SocialText = styled.Text`
  margin: 0 12px;
  color: #999;
  font-size: 15px;
`;

const SocialRow = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
  justify-content: space-evenly;
  width: 100%;
`;

const IconButton = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #f6f6fa;
  align-items: center;
  justify-content: center;
  margin: 0 6px;
`;

const IconText = styled.Text`
  font-size: 30px;
`;
