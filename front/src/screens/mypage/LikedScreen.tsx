import React, { useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import CustomText from '../../components/ui/CustomText';
import { useNavigation } from '@react-navigation/native';
import { Text, View ,Image, ScrollView} from 'react-native';
import { Block, Header, UserInfo, ProfileImage, UserName, IconGroup, IconImage, ContentRow, LeftImage, InfoArea } from '../../styles/write.ts';
import heartIcon from '../../assets/images/icon/filledheart.png';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';
import chatIcon from '../../assets/images/icon/chat.png';
import { HeaderRow, IconCircle } from './InfoEditScreen.tsx'
import IconButton from '../../components/buttons/IconButton';
import heart from '../../assets/images/icon/hearthin.png';



  const posts = [
  {
    userName: '지윤아',
    location: '대전한화생명볼파크',
    date: '2025-03-04 15:30pm',
    text: '대전에 있는 야구장에 갔다. 야구장에 처음 가봤는데 생각했던 것 보다 재미있었다. 다음에 또...',
    image: require('../../assets/images/data/sample_stadium.png'),
  },
    {
    userName: '지윤아',
    location: '대전한화생명볼파크',
    date: '2025-03-04 15:30pm',
    text: '대전에 있는 야구장에 갔다. 야구장에 처음 가봤는데 생각했던 것 보다 재미있었다. 다음에 또...',
    image: require('../../assets/images/data/sample_stadium.png'),
    },
    {
    userName: '지윤아',
    location: '대전한화생명볼파크',
    date: '2025-03-04 15:30pm',
    text: '대전에 있는 야구장에 갔다. 야구장에 처음 가봤는데 생각했던 것 보다 재미있었다. 다음에 또...',
    image: require('../../assets/images/data/sample_stadium.png'),
    },
  ];



const LikedScreen = () => {

return (
    <Container>
        <ScrollView showsVerticalScrollIndicator={false}>

        <HeaderRow>
            <CustomText style={{ fontSize: 16, fontWeight: "700" ,color:colors.blue}}>

        <FloatingButtonContainer>
          <FloatingButtonWrapper>
            <IconButton icon={heart} size={25}  />
          </FloatingButtonWrapper>
        </FloatingButtonContainer>


            좋아요
            </CustomText>
        </HeaderRow>

{/* 포스트 */}
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
              <ContentRow>
                <LeftImage source={post.image} />
                <InfoArea>
                  <CustomText style={{ fontWeight: 'bold', fontSize: 18,  marginBottom: 2 }}>
                    {post.location}
                  </CustomText>
                  <CustomText style={{ fontSize: 12,  marginBottom: 3 }}>
                    {post.date}
                  </CustomText>
                  <Divider/>
                  <CustomText style={{ fontSize: 12 }}>
                    {post.text}
                  </CustomText>
                  <IconGroup style={{ marginTop: 10 }}>
                    <IconImage source={heartIcon} style={{ width: 22, height: 20 , tintColor:'#F48B8B'
}} />
                    <IconImage source={chatIcon} />
                  </IconGroup>
                </InfoArea>
              </ContentRow>
            </UserName>



        </Block>
    ))}
    </ScrollView>

    </Container>
    );
};

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
  width: 35px;
  height: 35px;
  border-radius: 35px;
  justify-content: center;
  align-items: center;
  margin-bottom: -10px; 
  margin-right: 10px; 

`;

const Divider = styled.View`
  height: .7px;
  background-color: ${colors.gray2};
  width: 100%;
  margin-bottom: 5px; 
  margin-top: 5px; 
`;


export default LikedScreen;
