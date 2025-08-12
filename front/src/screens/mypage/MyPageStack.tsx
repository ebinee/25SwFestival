import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MyPageScreen from './MyPageScreen';
import InfoEditScreen from './InfoEditScreen';
import setting from '../../assets/images/icon/setting.png';
import IconButton from '../../components/buttons/IconButton';
import LikedScreen from './LikedScreen';

export type MyPageStackParam = {
  MyPageScreen: undefined;
  InfoEditScreen: undefined;
  LikedScreen: undefined;
};

const Stack = createNativeStackNavigator<MyPageStackParam>();

const MyPageStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyPageScreen">
      <Stack.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={({ navigation }) => ({ 
          title: 'My Page',
          headerTitleAlign: 'center',
          // 원래 위에 있던 설정 아이콘
          // headerRight: () => (
          //   <IconButton icon={setting} size={35} onPress={() => navigation.navigate('InfoEditScreen')}/>
          // ),
        })}
      />
      <Stack.Screen
        name="InfoEditScreen"
        component={InfoEditScreen}
        options={{ title: 'My Page' , headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="LikedScreen"
        component={LikedScreen}
        options={{ title: 'My Page' , headerTitleAlign: 'center'}}
      />
      {/* <Stack.Screen
        name="RouteScreen"
        component={InfoEditScreen}
        options={{ title: 'My Page' , headerTitleAlign: 'center'}}
      /> */}

    </Stack.Navigator>
  );
};

export default MyPageStack;

