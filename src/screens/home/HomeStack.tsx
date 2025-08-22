import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainMapScreen from './MainMapScreen';
import Hotspot from './Hotspot';
import Favorite from './Favorite';
import Path from './Path';

export type HomeStackParam = {
  MainMapScreen: undefined;
  Hotspot: undefined;
  Favorite: undefined;
  Path: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParam>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainMapScreen" component={MainMapScreen} />
      <Stack.Screen name="Hotspot" component={Hotspot} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="Path" component={Path} />
    </Stack.Navigator>
  );
};

export default HomeStack;
