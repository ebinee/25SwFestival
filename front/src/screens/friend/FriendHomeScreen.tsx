import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import CustomText from '../../components/ui/CustomText';
import IconButton from '../../components/buttons/IconButton';
import plus from '../../assets/images/icon/plus.png';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FriendStackParam } from './FriendStack';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

type Navigation = NativeStackNavigationProp<FriendStackParam>;

const FriendHomeScreen = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <Container>
      <CustomText>친구</CustomText>
      <IconButton
        icon={plus}
        size={20}
        onPress={() => navigation.navigate('AddFriendScreen')}
      />
      <Text>친구 추가</Text>
      <CustomText>친구 추가</CustomText>
    </Container>
  );
};

export default FriendHomeScreen;
