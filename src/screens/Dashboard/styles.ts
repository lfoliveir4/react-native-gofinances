import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { DataListProps } from './Dashboard'
import { BorderlessButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
`

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`

export const ContainerUserInfo = styled.View`
  flex-direction: row;
`

export const UserPhoto = styled.Image`
  width: ${RFValue(55)}px;
  height: ${RFValue(55)}px;
  border-radius: 10px;
`

export const User = styled.View`
  margin-left: 17px;
`

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingHorizontal: 24 },
  showsHorizontalScrollIndicator: false
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`

export const TransactionsTitle = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 16px;
`

export const TransactionsList = styled(
  FlatList as new () => FlatList<DataListProps>
  ).attrs({
  showsVerticalScrollIndicator: false,
  containerContentStyle: { paddingBottom: getBottomSpace() }
})``

export const ContainerLogoutButton = styled.View``

export const LogoutButton = styled(BorderlessButton)``

export const ContainerMessageNoTransactions = styled.View``

export const MessageNoTransactions = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`