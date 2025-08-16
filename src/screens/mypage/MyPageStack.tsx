import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MyPageScreen from './MyPageScreen';
import InfoEditScreen from './InfoEditScreen';

export type MyPageStackParam = {
  MyPageScreen: undefined;
  InfoEditScreen: undefined;
};

const Stack = createNativeStackNavigator<MyPageStackParam>();

const MyPageStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyPageScreen">
      <Stack.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{ title: '마이페이지' }}
      />
      <Stack.Screen
        name="InfoEditScreen"
        component={InfoEditScreen}
        options={{ title: '내 정보' }}
      />
    </Stack.Navigator>
  );
};

export default MyPageStack;
