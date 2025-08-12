import styled from 'styled-components/native';
import { colors } from './colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.backgroud};
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 24px;

`;
