import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Container } from '../../styles/GlobalStyles';
import MapView, { Marker, Polyline } from 'react-native-maps';
import IconButton from '../../components/buttons/IconButton';
import back from '../../assets/images/icon/back.png';
import search from '../../assets/images/icon/search.png';
import pencil from '../../assets/images/icon/pencil.png';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParam } from '../home/HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Modalize } from 'react-native-modalize';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ballpark from '../../assets/images/ballpark.png';

const TABS = [
  { key: 'Hotspot', label: '인기 장소' },
  { key: 'Favorite', label: '여행 경로' },
  { key: 'Path', label: '찜한 장소' },
];

const posts = [
  {
    user: '지윤아',
    profile: '', // 프로필 이미지 URL (없으면 동그라미)
    location: '대전한화생명불파크',
    date: '2025-03-04 15:30pm',
    image: ballpark, // 예시 야구장 이미지
    desc: '대전에 있는 야구장에 갔다. 야구장에 처음 가봤는데 생각했던 것 보다 재미있었다. 다음에도 또...',
  },
];

const BottomSheetContent = () => (
  <ScrollView>
    {posts.map((post, idx) => (
      <View
        key={idx}
        style={{
          backgroundColor: '#F8FCFF',
          borderRadius: 14,
          marginBottom: 16,
          padding: 14,
          shadowColor: "#222",
          shadowOpacity: 0.06,
          shadowRadius: 3,
        }}
      >
        {/* 카드 상단: 프로필 이미지, 이름 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              backgroundColor: '#eee',
              marginRight: 10,
              borderWidth: 1,
              borderColor: '#ccc'
            }}
          >
            {/* 프로필 이미지가 있으면 표시 */}
            {post.profile ? (
              <Image source={{ uri: post.profile }} style={{ width: 34, height: 34, borderRadius: 17 }} />
            ) : null}
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{post.user}</Text>
        </View>
        {/* 위치, 날짜 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ color: '#65A9E9', fontWeight: 'bold', fontSize: 15 }}>📍 {post.location}</Text>
          <Text style={{ color: '#888', marginLeft: 8, fontSize: 12 }}>{post.date}</Text>
        </View>
        {/* 이미지 */}
        <Image
          source= {ballpark}
          style={{ width: '100%', height: 120, borderRadius: 12, marginBottom: 6 }}
        />
        {/* 설명 */}
        <Text style={{ fontSize: 15, color: '#444', marginBottom: 8 }}>
          {post.desc}
        </Text>
        {/* 하단 아이콘(좋아요, 더보기) */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 22, color: '#EE6969' }}>♡</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <Text style={{ color: '#70CDF2', fontWeight: 'bold' }}>더보기</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
);


const MainMapScreen = () => {
  const modalizeRef = React.useRef(null);
  const [active, setActive] = useState('Hotspot');
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParam>>();


  return (
    <Container>
      <Header>
        <IconButton icon={back} size={30} onPress={() => navigation.goBack()} />
          <LogoText>TRIPPIN</LogoText>
        <IconButton icon={search} size={20} onPress={() => navigation.navigate('Searchpage')} />
      </Header>

      <TabsWrapper>
        {TABS.map(tab => (
          <TabButton
            key={tab.key}
            active={active === tab.key}
            onPress={() => setActive(tab.key)}
          >
            <TabLabel active={active === tab.key}>{tab.label}</TabLabel>
          </TabButton>
        ))}
      </TabsWrapper>

      <FloatingButton onPress={() => navigation.navigate('CreatePostScreen')}>
        <IconButton icon={pencil} size={30} />
      </FloatingButton>

      {active === 'Hotspot' && (
        <MapView
          style={{ width: '100%', height: 500 }}
          provider="google"
          initialRegion={{
            latitude: 37.5665,
            longitude: 126.9780,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.5511694, longitude: 126.9882266 }}
            title="N서울타워"
            description="서울 대표 전망대"
            pinColor="#70CDF2"
          />
          <Marker
            coordinate={{ latitude: 37.579617, longitude: 126.977041 }}
            title="경복궁"
            description="고궁/역사 명소"
            pinColor="#70CDF2"
          />
          <Marker
            coordinate={{ latitude: 37.527102, longitude: 126.932553 }}
            title="여의도 한강공원"
            description="도심 속 자연공원"
            pinColor="#70CDF2"
          />
          <Marker
            coordinate={{ latitude: 37.5511694, longitude: 126.9893877 }}
            title="남산공원"
            description="서울 휴식·트레킹"
            pinColor="#70CDF2"
          />
        </MapView>
      )}


      {active === 'Favorite' && (
        <MapView
          style={{ width: '100%', height: 500 }}
          provider="google"
          initialRegion={{
            latitude: 37.5665,
            longitude: 126.9780,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.5665, longitude: 126.9780 }}
            title="여행 시작"
            description="여기가 출발지"
            pinColor="#70CDF2"
          />
          <Marker
            coordinate={{ latitude: 37.5511694, longitude: 126.9893877 }}
            title="2"
            description="중간 경유지"
            pinColor="#70CDF2"
          />
          <Marker
            coordinate={{ latitude: 37.5705, longitude: 126.9820 }}
            title="여행 끝"
            description="여기가 도착지"
            pinColor="#70CDF2"
          />
          <Polyline
            coordinates={[
            { latitude: 37.5665, longitude: 126.9780 }, 
            { latitude: 37.5511694, longitude: 126.9893877 }, 
            ]}
            strokeColor="#70CDF2"        
            strokeWidth={6}              
          />
          <Polyline
            coordinates={[
            { latitude: 37.5511694, longitude: 126.9893877 }, 
            { latitude: 37.5705, longitude: 126.9820 }, 
            ]}
            strokeColor="#70CDF2"        
            strokeWidth={6}              
          />
        </MapView>
      )}


      {active === 'Path' && (
        <MapView
          style={{ width: '100%', height: 500 }}
          provider="google"
          initialRegion={{
            latitude: 37.5665,
            longitude: 126.9780,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.5511694, longitude: 126.9882266 }}
            title="N서울타워"
            description="서울 대표 전망대"
            pinColor="#70CDF2"
          />
          <Marker
            coordinate={{ latitude: 37.579617, longitude: 126.977041 }}
            title="경복궁"
            description="고궁/역사 명소"
            pinColor="#70CDF2"
          />
          <Marker
            coordinate={{ latitude: 37.527102, longitude: 126.932553 }}
            title="여의도 한강공원"
            description="도심 속 자연공원"
            pinColor="#70CDF2"
          />
          <Marker
            coordinate={{ latitude: 37.5511694, longitude: 126.9893877 }}
            title="남산공원"
            description="서울 휴식·트레킹"
            pinColor="#70CDF2"
          />
        </MapView>
      )}
      <Modalize
        ref={modalizeRef}
        alwaysOpen={300} // 아이폰 기준 하단 부분만
        handleStyle={{
          backgroundColor: '#dadada',
          width: 44,
          height: 7,
          alignSelf: 'center',
          marginTop: 12,
          borderRadius: 4,
        }}
        modalStyle={{
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          paddingTop: 10,
          backgroundColor: '#F7F9FB',
        }}
        adjustToContentHeight
        panGestureEnabled
      >
        <BottomSheetContent />
      </Modalize>

    </Container>
  );
};


export default MainMapScreen;


// ---------- styled-components ----------
const Header = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0;
  background-color: #fff;
  margin-top: 0px;
`;


const LogoText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #222;
  letter-spacing: 2.5px;
`;


const TabsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0 0 0;
  border-bottom-width: 1px;
  border-bottom-color: #e6e6e6;
`;


const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 0 30px 12px 30px;
  border-bottom-width: ${({ active }) => (active ? 3 : 0)}px;
  border-bottom-color: ${({ active }) => (active ? '#6EC0FF' : 'transparent')};
`;


const TabLabel = styled.Text<{ active: boolean }>`
  font-size: 17px;
  font-weight: ${({ active }) => (active ? '700' : '500')};
  color: ${({ active }) => (active ? '#000000ff' : '#878787')};
`;

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 24px;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: #6EC0FF;
  align-items: center;
  justify-content: center;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  shadow-color: #000;
  elevation: 10;
  z-index: 99;
`;