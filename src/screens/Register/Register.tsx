import React, { ReactElement, useState } from 'react'
import { Modal,  Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import Input from '../../components/Forms/InputForm'
import Button from '../../components/Forms/Button'
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton'
import CategorySelectButton from '../../components/Forms/CategorySelectButton'
import CategorySelect from '../CategorySelect'

import { DATA_KEY } from '../../utils/storage'

import { FormData, Props } from './props'

import {
  Container,
  ContainerHeader,
  Header,
  ButtonBack,
  Title,
  Form,
  ContainerFields,
  ContainerTransactionTypes,
} from './styles'

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
})

const TRANSACTION_ALERT = 'Selecione um tipo de transação'
const CATEGORY_ALERT = 'Selecione a categoria'

async function submitNewTransaction(
  newTransaction: object, 
  reset: () => void, 
  setTransactionType: (transaction: string) => void, 
  setCategory: (category: object) => void, 
  navigation: any
) {
  try {
    const data = await AsyncStorage.getItem(DATA_KEY)
    const currentData = data ? JSON.parse(data) : []

    const dataFormatted = [...currentData, newTransaction]

    await AsyncStorage.setItem(DATA_KEY, JSON.stringify(dataFormatted))

    reset()
    setTransactionType('')
    setCategory({ key: 'category', name: 'Categoria' })

    navigation.navigate('Dashboard')
  } catch (error) {
    console.log('error', error)
    Alert.alert('Não foi possivel salvar no storage')
  }
}

export default function Register({}: Props): ReactElement {
  const { colors } = useTheme()
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
    
  const [transactionType, setTransactionType] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const navigation = useNavigation()

  function handleSelectTransactionType(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleCloseSelectCategory() {
    setOpenModal(false)
  }

  function handleOpenSelectCategory() {
    setOpenModal(true)
  }

  function handleNavigationPreviousScreen() {
    navigation.navigate('Dashboard', {})
  }

  async function handleRegisterTransaction(form: FormData) {
    if (!transactionType) {
      return Alert.alert(TRANSACTION_ALERT)
    }

    if (category.key === 'category') {
      return Alert.alert(CATEGORY_ALERT)
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    submitNewTransaction(newTransaction, reset, setTransactionType, setCategory, navigation)
  }

  return (
    <Container>
      <ContainerHeader>
        <Header>
          <ButtonBack onPress={handleNavigationPreviousScreen}>
            <Feather name='chevron-left' size={16} color={colors.shape} />
          </ButtonBack>
          <Title>Nova Transação</Title>
        </Header>
      </ContainerHeader>
    
      <Form>
        <ContainerFields>
          <Input
            name='name'
            control={control} 
            placeholder='nome'
            autoCapitalize='sentences'
            autoCorrect={false}
            error={errors.name && errors.name.message}
            returnKeyType='next'
          />

          <Input 
            name='amount'
            control={control}
            placeholder='preço'
            keyboardType='numeric'
            error={errors.amount && errors.amount.message}
          />

          <ContainerTransactionTypes>
            <TransactionTypeButton
              title='income'
              type='up' 
              onPress={() => handleSelectTransactionType('positive')}
              isActive={transactionType === 'positive'}  
            />

            <TransactionTypeButton
              title='outcome'
              type='down'
              onPress={() => handleSelectTransactionType('negative')} 
              isActive={transactionType === 'negative'}
            />
          </ContainerTransactionTypes>

            <CategorySelectButton 
              title={category.name}
              onPress={handleOpenSelectCategory}
            />
          </ContainerFields>

          <Button 
            title='Enviar'
            onPress={handleSubmit(handleRegisterTransaction)} 
          />
      </Form>

      <Modal 
        visible={openModal}
        animationType='slide'
      >
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategory}
        />
      </Modal>
    </Container>
  )
}