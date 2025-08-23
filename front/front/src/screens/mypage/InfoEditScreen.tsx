import React, { useState } from "react";
import { ScrollView, Switch, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../styles/colors";
import CustomText from "../../components/ui/CustomText";
import { Container } from "../../styles/GlobalStyles";
import { Block ,IconImage} from '../../styles/write.ts';
import IconButton from '../../components/buttons/IconButton';



// 일반 버튼 
const SectionItem = ({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) => (
  <ItemButton onPress={onPress}>
    <CustomText style={{ fontSize: 15 }}>{label}</CustomText>
  </ItemButton>
);

// 스위치 
const SwitchItem = ({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) => (
  <ItemRow>
    <CustomText style={{ fontSize: 15 }}>{label}</CustomText>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#ccc", true: colors.blue }}
      thumbColor={value ? colors.white : "#f4f3f4"}
    />
  </ItemRow>
);

const MyPageScreen = () => {
  const [adsEnabled, setAdsEnabled] = useState(true);

  return (
    <Container >

      <ScrollView showsVerticalScrollIndicator={false}>

        <HeaderRow>
          <IconCircle />
          <CustomText style={{ fontSize: 16, fontWeight: "700" ,color:colors.blue}}>
            프로필 설정
          </CustomText>
        </HeaderRow>
        <Block>
          <SectionItem label="닉네임 변경하기                                           " onPress={() => {}} />
          <SectionItem label="프로필 사진 변경하기" onPress={() => {}} />
          <SectionItem label="비밀번호 변경하기" onPress={() => {}} />
          <SectionItem label="로그아웃" onPress={() => {}} />
        </Block>

        <HeaderRow>
          <IconCircle />
          <CustomText style={{ fontSize: 16, fontWeight: "700" ,color:colors.blue}}>
            알림 설정
          </CustomText>
        </HeaderRow>
        <Block>
          <SectionItem label="알림 설정하기" onPress={() => {}} />
          <SwitchItem
            label="광고성 정보 수신 알림"
            value={adsEnabled}
            onValueChange={setAdsEnabled}
          />
        </Block>

        <HeaderRow>
          <IconCircle />
          <CustomText style={{ fontSize: 16, fontWeight: "700" ,color:colors.blue}}>
            제휴 문의
          </CustomText>
        </HeaderRow>
        <Block>
          <SectionItem label="가맹점 / 제휴 문의" onPress={() => {}} />
        </Block>

      </ScrollView>
    </Container>
  );
};

// 스타일
const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const IconCircle = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 100px;
  background-color: ${colors.blue};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const ItemButton = styled(TouchableOpacity)`
  background-color: ${colors.sky};
  padding: 10px 20px;    
  border-radius: 12px;
`;

const ItemRow = styled.View`
  background-color: ${colors.sky};
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
`;

export { HeaderRow, IconCircle };
export default MyPageScreen;
