import React from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Container } from "../../styles/GlobalStyles";
import CustomText from "../../components/ui/CustomText";
import { Block, Header, UserInfo, ProfileImage, UserName, IconGroup, IconImage } from '../../styles/write.ts';
import heartIcon from '../../assets/images/icon/heart.png';
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
      text: '대전에 있는 야구장에 갔다. 날이 더웠지만 맛있는 음식도 먹고 좋아하는 팀의 경기도 봐서 재밌었던 하루였다',
    },
    {
      userName: '지윤아',
      text: '깔끔한 맛과 분위기가 좋아 자주 가는 맛집입니다.',
    },
    {
      userName: '지윤아',
      text: '한 입 먹는 순간 인상이 바뀌는 집. 재료 본연의 맛이 살아 있어서 자극적이지 않다.',
    },
    {
    userName: '민수',
    text: '서울숲에 다녀왔는데 날씨가 너무 좋아서 사진도 많이 찍고 힐링하고 왔다.',
    },
    {
      userName: '지윤아',
      text: '친구 추천으로 간 카페, 분위기가 아늑해서 공부하기 딱 좋았다.',
    },
    {
      userName: '현우',
      text: '어제 본 영화가 생각보다 재밌어서 두 번 더 보고 싶다.',
    },
    {
      userName: '소연',
      text: '부산 해운대에서 일몰을 봤는데 진짜 그림 같았다.',
    },
    {
      userName: '지윤아',
      text: '새로 오픈한 라멘집 갔는데 국물이 진하고 면도 탱글해서 만족스러웠다.',
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

      {/* 아이콘 3개 */}
    <IconRow>
      <IconItem>
        <FloatingButtonWrapper>
          <IconButton icon={setting} size={35} color={colors.white} onPress={() => navigation.navigate('InfoEditScreen')} />
        </FloatingButtonWrapper>
        <CustomText style={{ marginTop: 6, fontSize: 13 }}>설정</CustomText>
      </IconItem>

      <IconItem>
        <FloatingButtonWrapper>
          <IconButton icon={heartIcon} size={35} color={colors.white} onPress={() => navigation.navigate('LikedScreen')} />
        </FloatingButtonWrapper>
        <CustomText style={{ marginTop: 6, fontSize: 13 }}>좋아요</CustomText>
      </IconItem>

      <IconItem>
        <FloatingButtonWrapper>
          <IconButton icon={record} size={35} color={colors.white} />
        </FloatingButtonWrapper>
        <CustomText style={{ marginTop: 6, fontSize: 13 }}>내 여행기록</CustomText>
      </IconItem>
    </IconRow>

      {/* 피드 */}
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      {posts.map((post, idx) => (
        <Block key={idx}>
          <Header>
            <UserInfo >
              <ProfileImage />
              <UserName>{post.userName}</UserName>
            </UserInfo>
          </Header>

          <UserName
            style={{ marginTop: 16, fontWeight: 'normal', fontSize: 16 }}
          >
            {post.text}
          </UserName>

          <IconGroup style={{ marginTop: 12 }}>
            <IconImage source={heartIcon} />
            <IconImage source={chatIcon} />
          </IconGroup>
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

const FloatingButtonWrapper = styled.View`
  background-color:  ${colors.blue};
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px; 
`;
const IconItem = styled.View`
  flex-direction: column;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px
`;
