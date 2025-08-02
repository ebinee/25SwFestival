import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import CustomText from '../../components/ui/CustomText';
import IconButton from '../../components/buttons/IconButton';
import plus from '../../assets/images/icon/plus.png';
import listIcon from '../../assets/images/icon/listIcon.png'; 
import userAddIcon from '../../assets/images/icon/userAddIcon.png'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FriendStackParam } from './FriendStack';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { Image } from 'react-native';
import { Block, Header, UserInfo, ProfileImage, UserName, IconGroup, IconImage } from '../../styles/write.ts';
import plusIcon from '../../assets/images/icon/plus.png';
import heartIcon from '../../assets/images/icon/heart.png';
import chatIcon from '../../assets/images/icon/chat.png';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';
import { ScrollView } from 'react-native';


type Navigation = NativeStackNavigationProp<FriendStackParam>;


const FriendHomeScreen = () => {
  const navigation = useNavigation<Navigation>();

  const posts = [
    {
      userName: '지윤아',
      text: '대전에 있는 야구장에 갔다. 날이 더웠지만 맛있는 음식도 먹고 좋아하는 팀의 경기도 봐서 재밌었던 하루였다',
    },
    {
      userName: '김민서',
      text: '깔끔한 맛과 분위기가 좋아 자주 가는 맛집입니다.',
    },
    {
      userName: '김예빈',
      text: '한 입 먹는 순간 인상이 바뀌는 집. 재료 본연의 맛이 살아 있어서 자극적이지 않다.',
    },
  ];


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



return (
  <Container>
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      {posts.map((post, idx) => (
        <Block key={idx}>
          <Header>
            <UserInfo>
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

      <FloatingButtonContainer>
        <FloatingButtonWrapper>
          <IconButton icon={listIcon} size={25} color= {colors.white} onPress={() => navigation.navigate('FriendListScreen')} />
        </FloatingButtonWrapper>

        <FloatingButtonWrapper>
          <IconButton icon={plus} size={35} color={colors.white} onPress={() => navigation.navigate('AddFriendScreen')} />
        </FloatingButtonWrapper>

        <FloatingButtonWrapper>
          <IconButton icon={userAddIcon} size={30}  color= {colors.white} />
        </FloatingButtonWrapper>
      </FloatingButtonContainer>
    </Container>
  );
};

export default FriendHomeScreen;
