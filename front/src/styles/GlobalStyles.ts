import styled from 'styled-components/native';
import { colors } from './colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 24px;

`;

export const ScrollContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
  },
})`
  flex: 1;
  background-color: ${colors.background};
  width: 100%;
`;

export { ScrollView };
