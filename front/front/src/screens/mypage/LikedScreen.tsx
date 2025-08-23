import React, { useState } from 'react';
import { Container } from '../../styles/GlobalStyles';
import CustomText from '../../components/ui/CustomText';
import { useNavigation } from '@react-navigation/native';
import { Text, View ,Image, ScrollView} from 'react-native';
import { Block, Header, UserInfo, ProfileImage, UserName, IconGroup, IconImage } from '../../styles/write.ts';
import heartIcon from '../../assets/images/icon/heart.png';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';
import chatIcon from '../../assets/images/icon/chat.png';
import { HeaderRow, IconCircle } from './InfoEditScreen.tsx'



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



const LikedScreen = () => {

return (
    <Container>
        <ScrollView showsVerticalScrollIndicator={false}>

        <HeaderRow>
            <IconCircle />
            <CustomText style={{ fontSize: 16, fontWeight: "700" ,color:colors.blue}}>
            좋아요
            </CustomText>
        </HeaderRow>

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

    </Container>
    );
};



export default LikedScreen;
