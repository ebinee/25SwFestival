import React from 'react';
import styled from 'styled-components/native';

const Hotspot = () => (
  <Wrapper>
    <Text>인기 장소 화면</Text>
  </Wrapper>
);

export default Hotspot;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 22px;
  color: #666;
`;
