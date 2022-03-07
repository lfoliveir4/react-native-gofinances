import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'


export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`

export const ContainerMonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 24px;
`

export const MonthSelectButton = styled(BorderlessButton)``

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`

export const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const ContainerMessageNoTransactions = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`

export const MessageNoTransactions = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`