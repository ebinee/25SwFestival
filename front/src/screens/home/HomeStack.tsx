import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainMapScreen from './MainMapScreen';
import Searchpage from './Searchpage';
import CreatePostScreen from './CreatePostScreen';

export type HomeStackParam = {
  MainMapScreen: undefined;
  Hotspot: undefined;
  Favorite: undefined;
  Path: undefined;
  Searchpage: undefined;
  CreatePostScreen:undefined;
};

const Stack = createNativeStackNavigator<HomeStackParam>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainMapScreen" component={MainMapScreen} />
      <Stack.Screen name="Searchpage" component={Searchpage} />
      <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
