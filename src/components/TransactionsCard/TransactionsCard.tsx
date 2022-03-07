import React, { ReactElement } from 'react'

import { Props } from './props'

import { categories } from '../../utils/categories'

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles'

export default function TransactionsCard({ data }: Props): ReactElement {
  const [filterCategoryIconsAndName] = categories?.filter(item => item.key === data.category)

  return (
    <Container>
      <Title>{data?.name}</Title>

      <Amount type={data?.type}>
        {data?.type === 'negative' && '- '}
        {data?.amount}
        </Amount>

      <Footer>
        <Category>
          <Icon name={filterCategoryIconsAndName?.icon} />
          <CategoryName>{filterCategoryIconsAndName?.name}</CategoryName>
        </Category>

        <Date>{data?.date}</Date>
      </Footer>
    </Container>
  )
}