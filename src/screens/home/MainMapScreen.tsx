import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParam } from './HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container } from '../../styles/GlobalStyles';

type Navigation = NativeStackNavigationProp<HomeStackParam>;

const TABS = [
  { key: 'hotspot', label: '인기 장소' },
  { key: 'favorite', label: '여행 경로' },
  { key: 'path', label: '찜한 장소' },
];

const MainMapScreen = () => {
  const navigation = useNavigation<Navigation>();
  const [active, setActive] = useState('hotspot');

  return (
    <Container>
      <TabsWrapper>
        {TABS.map(tab => (
          <TabButton
            key={tab.key}
            active={active === tab.key}
            onPress={() => {
              setActive(tab.key);
              navigation.navigate(tab.key as any);
            }}
          >
            <TabLabel active={active === tab.key}>{tab.label}</TabLabel>
          </TabButton>
        ))}
      </TabsWrapper>
      {/* 아래에는 지도/컨텐츠가 들어갈 수 있음 */}
    </Container>
  );
};

export default MainMapScreen;

// ---------- styled-components ----------
const TabsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 14px 0 2px 0;
  border-bottom-width: 1px;
  border-bottom-color: #e6e6e6;
`;

const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 0 14px 8px 14px;
  border-bottom-width: ${({ active }) => (active ? 2 : 0)}px;
  border-bottom-color: ${({ active }) => (active ? '#6EC0FF' : 'transparent')};
`;

const TabLabel = styled.Text<{ active: boolean }>`
  font-size: 17px;
  font-weight: ${({ active }) => (active ? '700' : '500')};
  color: ${({ active }) => (active ? '#6EC0FF' : '#878787')};
`;
