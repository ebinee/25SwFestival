import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import styled from 'styled-components/native';
import IconButton from '../../components/buttons/IconButton';
import back from '../../assets/images/icon/back.png';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParam } from '../home/HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container } from '../../styles/GlobalStyles';

const GRID_COUNT = 12;

const ImageSelector = () => {
  const [images, setImages] = useState<Asset[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParam>>();

  const pickImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: GRID_COUNT,
      },
      response => {
        if (!response.didCancel && !response.errorCode) {
          setImages(response.assets || []);
        }
      },
    );
  };

  const gridCells = Array.from({ length: GRID_COUNT });

  return (
    <Container>
        <Header>
        <IconButton icon={back} size={30} onPress={() => navigation.goBack()} />
          <LogoText>TRIPPIN</LogoText>
          <View style={{ width: 30 }} /> 
      </Header>
      
      <Divider />
        <Text style={{ textAlign: 'center', color: '#888', fontSize: 15 }}>
            사진을 선택하세요.
        </Text>
    <Divider />
      
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 10 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {gridCells.map((_, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.7}
              onPress={pickImages}
              style={{
                width: '31%',
                aspectRatio: 1,
                margin: '1%',
                borderRadius: 10,
                backgroundColor: '#F8F8F8',
                overflow: 'hidden',
                borderWidth: 0.8,
                borderColor: '#ededed',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {images[idx] ? (
                <Image
                  source={{ uri: images[idx].uri }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 32,
          right: 24,
          backgroundColor: '#CBE6FB',
          paddingHorizontal: 30,
          paddingVertical: 12,
          borderRadius: 20,
          alignItems: 'center',
        }}
        onPress={() => {/* 완료 기능 구현 */}}
      >
        <Text style={{ color: '#4592c6', fontSize: 16, fontWeight: 'bold' }}>완료</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default ImageSelector;

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

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background: #ebebeb;
  margin: 10px 0 10px 0;
`;