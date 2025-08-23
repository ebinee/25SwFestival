import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainMapScreen from './MainMapScreen';

export type HomeStackParam = {
  MainMapScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParam>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainMapScreen" component={MainMapScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
