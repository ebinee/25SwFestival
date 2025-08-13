import React from 'react';
import styled from 'styled-components/native';

const path = () => (
  <Wrapper>
    <Text>여행 경로 화면</Text>
  </Wrapper>
);

export default path;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 22px;
  color: #666;
`;
