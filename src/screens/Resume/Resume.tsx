import React, { ReactElement, useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'
import { VictoryPie } from 'victory-native'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RFValue } from 'react-native-responsive-fontsize'

import { useFocusEffect } from '@react-navigation/native'

import ResumeCards from '../../components/ResumeCards'

import { categories } from '../../utils/categories'

import theme from '../../styles/theme'

import { Props, TotalByCategoryProps, TransactionData } from './props'

import { DATA_KEY } from '../../utils/storage'

import {
  Container,
  Header,
  Title,
  ChartContainer,
  ContainerMonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  ContainerMessageNoTransactions,
  MessageNoTransactions
} from './styles'


function filterTotalByCategory(
  expensives: TransactionData[], 
  expensiveTotal: number
) {
  const totalByCategory: TotalByCategoryProps[] = []

  categories?.forEach(category => {
    let categorySum = 0

    expensives?.forEach((expensive: TransactionData) => {
      if (expensive.category === category.key) {
        categorySum += Number(expensive.amount)
      }
    });

    if (categorySum > 0) {
      const totalFormatted = categorySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

      const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)}%`

      totalByCategory.push({ 
        key: category.key, 
        name: category.name, 
        total: categorySum, 
        color: category.color,
        totalFormatted,
        percent
      })
    }
  })

  return totalByCategory
}

export default function Resume({}: Props): ReactElement {
  const [totalByCategories, setTotalByCategories] = useState<TotalByCategoryProps[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  function handleChangeSelectedDate(action: 'next' | 'prev') {
    if (action === 'next') {
      const nextDate = addMonths(selectedDate, 1)
      setSelectedDate(nextDate)
    } else {
      const prevDate = subMonths(selectedDate, 1)
      setSelectedDate(prevDate)
    }
  }

  async function loadTransactionsFromStorage() {
    const storage = await AsyncStorage.getItem(DATA_KEY)
    const storageFormatted = storage ? JSON.parse(storage) : []

    if (storageFormatted) {
      const expensives = storageFormatted
      .filter((expensive: TransactionData) => {
          return expensive.type === 'negative' && 
          new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
          new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      })

      const expensiveTotal = expensives
      .reduce((accumulator: number, expensive: TransactionData) => {
        return accumulator + Number(expensive.amount)
      }, 0)

      const totalByCategoryFiltered = filterTotalByCategory(expensives, expensiveTotal)

      setTotalByCategories(totalByCategoryFiltered)
    }
  }

  useFocusEffect(useCallback(() => {
    loadTransactionsFromStorage()
  }, [selectedDate]))

  return (
    <Container contentContainerStyle={{ flexGrow: 1 }} scrollEnabled>
      <Header>
        <Title>Resumo de gastos por categoria</Title>
      </Header>

      <ContainerMonthSelect>
        <MonthSelectButton onPress={() => handleChangeSelectedDate('prev')}>
          <MonthSelectIcon name='chevron-left' />
        </MonthSelectButton>

        <Month>{format(selectedDate, 'MMMM', { locale: ptBR })}</Month>

        <MonthSelectButton onPress={() => handleChangeSelectedDate('next')}>
          <MonthSelectIcon name='chevron-right' />
        </MonthSelectButton>
      </ContainerMonthSelect>

      {totalByCategories.length > 0 ? (
        <>      
          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(cat => cat.color)}
              style={{
                labels: { 
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape  
                }
              }}
              labelRadius={50}
              x='percent'
              y='total'
            />
          </ChartContainer>

          {totalByCategories?.map((item) => (
            <ScrollView key={item.key}>
              <ResumeCards 
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            </ScrollView>
          ))}
          </>
      ) : (
        <ContainerMessageNoTransactions>
          <MessageNoTransactions>Você ainda não cadastrou nenhuma transação</MessageNoTransactions>
        </ContainerMessageNoTransactions>
      )}
    </Container>
  )
}