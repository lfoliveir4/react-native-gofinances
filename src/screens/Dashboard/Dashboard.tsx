import React, { ReactElement, useState, useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import { RFValue } from 'react-native-responsive-fontsize'

import HighlightCard from '../../components/HighlightCard'
import TransactionsCard from '../../components/TransactionsCard'

import { DataListProps, HighlightCardsData } from './props'

import { DATA_KEY } from '../../utils/storage'

import {
  Container,
  Header,
  UserWrapper,
  ContainerLogoutButton,
  ContainerUserInfo,
  UserPhoto,
  User,
  UserGreeting,
  UserName,
  HighlightCards,
  Transactions,
  TransactionsTitle,
  TransactionsList,
  LogoutButton,
  ContainerMessageNoTransactions,
  MessageNoTransactions
} from './styles'

function getDateOnTransaction(
  transactions: DataListProps[],
  type: 'positive' | 'negative' 
) {
  if (transactions) {
    const lastTransactions = Math.max.apply(Math, transactions
      .filter((transaction: DataListProps) => transaction.type === type)
      .map((transaction: DataListProps) => new Date(transaction.date).getTime())
    )
    
    const lastTransactionsDateFormatted = new Date(lastTransactions)

    return `${lastTransactionsDateFormatted.getDate()} de ${lastTransactionsDateFormatted.toLocaleString(`pt-BR`, {
      month: 'long'
    })}`
  }
}  

function transformTransactions(
  transactions: DataListProps[], 
  setTransactionsFromStorage: (transactions: DataListProps[]) => void,
  setHighlightCardsData: ({}: HighlightCardsData) => void
) {

  let entriesTotal = 0;
  let expensivesTotal = 0

  const transformTransactions = transactions?.map((item: DataListProps) => {
    if (item.type === 'positive') {
      entriesTotal += Number(item.amount)
    } else {
      expensivesTotal += Number(item.amount)
    }

    const amount = Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    const date = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(new Date(item.date))

    return {
      id: item.id,
      name: item.name,
      amount,
      type: item.type,
      category: item.category,
      date,
    }
  })

  const total = entriesTotal - expensivesTotal

  setTransactionsFromStorage(transformTransactions)

  const lastTransactionsEntries = getDateOnTransaction(transactions, 'positive')
  const lastTransactionsExpensive = getDateOnTransaction(transactions, 'negative')
  const totalInterval = lastTransactionsExpensive?.includes('NaN') ? '' : `01 a ${lastTransactionsExpensive}`

  setHighlightCardsData({
    entries: {
      amount: entriesTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: lastTransactionsEntries?.includes('NaN') ? '' : `Ultima entrada dia ${lastTransactionsEntries}`,
    },
    expensives: {
      amount: expensivesTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: lastTransactionsExpensive?.includes('NaN') ? '' : `Ultima entrada dia ${lastTransactionsExpensive}`,
    },
    total: {
      amount: total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: totalInterval,
    },
  })
}


export default function Dashboard(): ReactElement {
  const [transactionsFromStorage, setTransactionsFromStorage] = useState<DataListProps[]>([])
  const [highlightCardsData, setHighlightCardsData] = useState<HighlightCardsData>({} as HighlightCardsData)
  
  async function loadDataFromStorage() {
    const storage = await AsyncStorage.getItem(DATA_KEY)
    const transactions = storage ? JSON.parse(storage) : []

    console.log('storage', storage)

    transformTransactions(
      transactions, 
      setTransactionsFromStorage,
      setHighlightCardsData
    )
  }

  useFocusEffect(useCallback(() => {
    loadDataFromStorage()
  }, []))

  return (
    <Container>
      <Header>
        <UserWrapper>
          <ContainerUserInfo>
            <UserPhoto source={{ uri: 'https://github.com/lfoliveir4.png' }} />

            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Luis</UserName>
            </User>
          </ContainerUserInfo>

          <ContainerLogoutButton>
            <LogoutButton onPress={() => {}}>
              <Feather name='power' size={RFValue(24)} color='#FF872C' />
            </LogoutButton>
          </ContainerLogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title='Entradas'
          amount={highlightCardsData?.entries?.amount}
          lastTransaction={highlightCardsData?.entries?.lastTransaction}
          type='up' 
        />
        <HighlightCard
          title='Saidas'
          amount={highlightCardsData?.expensives?.amount}
          lastTransaction={highlightCardsData?.expensives?.lastTransaction}
          type='down'
        />
        <HighlightCard
          title='Total'
          amount={highlightCardsData?.total?.amount}
          lastTransaction={highlightCardsData?.total?.lastTransaction}
          type='total'
        />
      </HighlightCards>

      <Transactions>
        <TransactionsTitle>Listagem</TransactionsTitle>

        {transactionsFromStorage.length ? (
          <TransactionsList 
            data={transactionsFromStorage}
            renderItem={({ item }) => <TransactionsCard data={item} />}
            keyExtractor={item => item.id}            
          />
        ) : (
          <ContainerMessageNoTransactions>
            <MessageNoTransactions>Você ainda não cadastrou nenhuma transação</MessageNoTransactions>
          </ContainerMessageNoTransactions>
        )}
      </Transactions>
    </Container>
  )
}