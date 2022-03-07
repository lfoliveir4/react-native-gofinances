import React, { ReactElement } from 'react'

import { Props } from './props'

import {
  Container,
  Category,
  Icon
} from './styles'

export default function CategorySelectButton({ title, ...rest }: Props): ReactElement {
  return (
    <Container {...rest}>
      <Category>{title}</Category>
      <Icon name='chevron-down' />
    </Container>
  )
}