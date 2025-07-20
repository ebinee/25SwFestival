import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

const Onboarding = () => {
  const navigation = useNavigation<Navigation>();
  const { bottom } = useSafeAreaInsets();

  return (
    <Container style={{ paddingBottom: bottom }}>
      <PrimaryButton
        title="로그인"
        color={colors.gray4}
        onPress={() => navigation.navigate('Main')}
      />
    </Container>
  );
};

export default Onboarding;
