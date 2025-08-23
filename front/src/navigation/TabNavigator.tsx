import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeStack from '../screens/home/HomeStack';
import MyPageStack from '../screens/mypage/MyPageStack';
import FriendStack from '../screens/friend/FriendStack';
import tab_friend from '../assets/images/tabbar/tab_friend.png';
import tab_home from '../assets/images/tabbar/tab_home.png';
import tab_mypage from '../assets/images/tabbar/tab_my.png';
import { colors } from '../styles/colors';
import { Image } from 'react-native';
import CustomText from '../components/ui/CustomText';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const renderLabel =
    (label: string) =>
    ({ color }: { color: string }) =>
      <CustomText style={{ color, fontSize: 13 }}>{label}</CustomText>;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffffff',
          height: 110,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -20 },
          shadowOpacity: 0.13,
          shadowRadius: 14,
          elevation: 17,
        },
        tabBarActiveTintColor: '#70CDF2',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'Home') {
            icon = tab_home;
          } else if (route.name === 'FriendStack') {
            icon = tab_friend;
          } else if (route.name === 'MyPageStack') {
            icon = tab_mypage;
          }

          return (
            <Image
              source={icon}
              style={{
                width: 33,
                height: 33,
                tintColor: focused ? '#70CDF2' : '#aaa',
              }}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: renderLabel('Home'),
        }}
      />
      <Tab.Screen
        name="FriendStack"
        component={FriendStack}
        options={{
          tabBarLabel: renderLabel('Friend'),
        }}
      />

      <Tab.Screen
        name="MyPageStack"
        component={MyPageStack}
        options={{
          tabBarLabel: renderLabel('My'),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
