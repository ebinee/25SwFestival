import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Onboarding from '../screens/onboarding/Onboarding';
import TabNavigator from './TabNavigator';
import CustomText from '../components/ui/CustomText';
import { colors } from '../styles/colors';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: ({ children }) => (
          <CustomText style={{ fontSize: 17 }} weight="600">
            {children}
          </CustomText>
        ),
        headerStyle: {
          backgroundColor: colors.cream,
        },
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
