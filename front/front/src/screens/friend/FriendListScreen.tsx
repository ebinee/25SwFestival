import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Container } from '../../styles/GlobalStyles';
import CustomText from '../../components/ui/CustomText';
import { colors } from '../../styles/colors';
import SearchBar from './SearchBar.tsx'; 

import {
    ItemContainer,
    UserName,
} from '../../styles/friendlist.ts';

const ProfileImage = styled.View`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background-color: gray;
    margin-right: 12px;
    margin-left: 22px;
`;

type FriendRequest = {
    id: string;
    name: string;
    profileImage?: string;
};
const FriendRequestItem = ({
    request,
}: {
    request: FriendRequest;
}) => (
    <ItemContainer>
        <ProfileImage />
        <UserName>{request.name}</UserName>
    </ItemContainer>
);

const FriendHomeScreen = () => {
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
        { id: '1', name: '지윤아' },
        { id: '2', name: '김민서' },
        { id: '3', name: '김예빈' },
        { id: '4', name: '이수현' },
    ]);
    const [search, setSearch] = useState(''); 

    const Block = styled.View`
        flex: 1;
        width: 100%;
        background-color: ${colors.white};
        border-radius: 30px;
        padding: 8px 0 30px 0;
        margin: 18px 0 0 0;
        elevation: 4;
    `;

    return (
        <Container>
            <SearchBar
                value={search}
                onChangeText={setSearch}
                placeholder="이메일로 친구 검색"
                onClear={() => setSearch('')}
                style={{ marginTop: 16, marginHorizontal: 10 }}
            />

            <Block>
                {friendRequests.map(request => (
                    <FriendRequestItem
                        key={request.id}
                        request={request}
                    />
                ))}
            </Block>
        </Container>
    );
};

export default FriendHomeScreen;
