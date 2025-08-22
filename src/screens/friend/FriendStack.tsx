import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FriendHomeScreen from './FriendHomeScreen';
import AddFriendScreen from './AddFriendScreen';

export type FriendStackParam = {
  FriendHomeScreen: undefined;
  AddFriendScreen: undefined;
};

const Stack = createNativeStackNavigator<FriendStackParam>();

const MyPageStack = () => {
  return (
    <Stack.Navigator initialRouteName="FriendHomeScreen">
      <Stack.Screen
        name="FriendHomeScreen"
        component={FriendHomeScreen}
        options={{ title: '친구' }}
      />
      <Stack.Screen
        name="AddFriendScreen"
        component={AddFriendScreen}
        options={{ title: '친구 추가' }}
      />
    </Stack.Navigator>
  );
};

export default MyPageStack;
