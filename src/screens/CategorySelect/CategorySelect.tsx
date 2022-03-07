import React, { ReactElement } from 'react'
import { FlatList } from 'react-native'

import Button from '../../components/Forms/Button'

import { categories } from '../../utils/categories'

import { Category, Props } from './props'

import {
  Container,
  Header,
  Title,
  ContainerCategory,
  Icon,
  Name,
  Divider,
  Footer,
} from './styles'

export default function CategorySelect({
  category,
  closeSelectCategory,
  setCategory,
}: Props): ReactElement {
  function handleCategorySelect(category: Category) {
    setCategory(category)
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <ContainerCategory
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </ContainerCategory>
        )}
        style={{ flex: 1, width: '100%' }}
        ItemSeparatorComponent={() => <Divider />}
      />

      <Footer>
        <Button 
          title='Selecionar Categoria'
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  )
}