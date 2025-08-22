import React from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Container } from "../../styles/GlobalStyles";
import CustomText from "../../components/ui/CustomText";
import { Block, Header, UserInfo, ProfileImage, UserName, IconGroup, IconImage } from '../../styles/write.ts';
import hearthinIcon from '../../assets/images/icon/hearthin.png';
import chatIcon from '../../assets/images/icon/chat.png';
import record from '../../assets/images/icon/record.png';
import setting from '../../assets/images/icon/setting.png';

import IconButton from '../../components/buttons/IconButton';
import { colors } from '../../styles/colors';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MyPageStackParam } from './MyPageStack.tsx';
import { useNavigation } from '@react-navigation/native';


type Navigation = NativeStackNavigationProp<MyPageStackParam>;



// 샘플 데이터
  const posts = [
    {
      userName: '지윤아',
      title: '인생 첫 대전 여행             ',
      period: '2025-05-24 ~ 2025-05-27',
      image: require('../../assets/images/data/sample_stadium.png'), 
    },
    {
      userName: '지윤아',
      title: '당일치기 여행',
      period: '2025-05-24 ~ 2025-05-27',
      image: require('../../assets/images/data/sample_stadium.png'), 
    },
    {
      userName: '지윤아',
      title: '인생 첫 대전 여행',
      period: '2025-05-24 ~ 2025-05-27',
      image: require('../../assets/images/data/sample_stadium.png'), 
    },
    {
      userName: '지윤아',
      title: '인생 첫 대전 여행',
      period: '2025-05-24 ~ 2025-05-27',
      image: require('../../assets/images/data/sample_stadium.png'), 
    },
  ];



const MyPageScreen = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <Container >
      <Header style={{ marginTop: 30 }}>
        <ProfileImagePlaceholder>
          {/* 나중에 <Image source={...} /> */}
        </ProfileImagePlaceholder>
        <ProfileInfo>
          <CustomText weight="700" style={{ fontSize: 22 }}>Yoona</CustomText>
          <CustomText style={{ fontSize: 14 }}>yoonaji88@gmail.com</CustomText>
        </ProfileInfo>
      </Header>

      <Divider />

      {/* 아이콘 3개 */}
    <IconRow>
      <IconItem>
        <FloatingButtonWrapper>
          <IconButton icon={setting} size={35} onPress={() => navigation.navigate('InfoEditScreen')} />
        </FloatingButtonWrapper>
        <CustomText style={{ marginTop: 6, fontSize: 13 }}>설정</CustomText>
      </IconItem>

      <IconItem>
        <FloatingButtonWrapper>
          <IconButton icon={hearthinIcon} size={35}  onPress={() => navigation.navigate('LikedScreen')} />
        </FloatingButtonWrapper>
        <CustomText style={{ marginTop: 6, fontSize: 13 }}>좋아요</CustomText>
      </IconItem>

      <IconItem>
        <FloatingButtonWrapper>
          <IconButton icon={record} size={35} onPress={() => navigation.navigate('RouteScreen')} />
        </FloatingButtonWrapper>
        <CustomText style={{ marginTop: 6, fontSize: 13 }}>내 여행기록</CustomText>
      </IconItem>
    </IconRow>

    <Divider />

      {/* 피드 */}
    <ScrollView showsVerticalScrollIndicator={false}>
      {posts.map((post, idx) => (
        // <Block key={idx}>
        
        //   <Header>
        //     <UserInfo >
        //       <ProfileImage />
        //       <UserName>{post.userName}</UserName>
        //     </UserInfo>
        //   </Header>

        //   <UserName
        //     style={{ marginTop: 16, fontWeight: 'normal', fontSize: 16 }}
        //   >
        //     {post.text}
        //   </UserName>

        // </Block>
        <Block key={idx}>
          <Header>
            <UserInfo>
              <ProfileImage />
              <UserName>{post.userName}</UserName>
            </UserInfo>
          </Header>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <View>
              <CustomText weight="900" style={{ fontSize: 20, fontWeight: 'bold' }}>
                {post.title}
              </CustomText>
              <Divider />
              <CustomText style={{ fontSize: 13, }}>
                {post.period}
              </CustomText>
            </View>

          <View style={{ width: 100, height: 100, position: 'relative', marginLeft: 12 }}>
            <Image
              source={post.image}
              style={{ width: '100%', height: '100%',  }}
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                bottom: 7,
                right: 8,
                backgroundColor: 'rgba(255,255,255,0.85)',
                borderRadius: 7,
                paddingHorizontal: 10,
                paddingVertical: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText style={{ fontSize: 9, color: colors.gray8}}>
                1/4
              </CustomText>
            </View>
          </View>


          </View>
        </Block>

      ))}
    </ScrollView>

    </Container>
  );
};

export default MyPageScreen;

//사진 대체제
const ProfileImagePlaceholder = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background: #FBE9DD;
  margin-right: 15px;
  align-items: center;
  justify-content: center;
`;

const ProfileInfo = styled.View`
  width: 170px;
`;

const IconRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const IconItem = styled.View`
  flex-direction: column;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px
`;

  // 버튼 컨테이너
const FloatingButtonContainer = styled.View`
  position: absolute;
  bottom: 8px;
  right: 30px;
  flex-direction: column;
  align-items: center;
`;

const FloatingButtonWrapper = styled.View`
  background-color:  ${colors.blue};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px; 
`;
const Divider = styled.View`
  height: .7px;
  background-color: ${colors.gray2};
  width: 100%;
  margin-bottom: 15px; 
  margin-top: 15px; 
`;
