import React, { ReactElement } from 'react'

import { Props } from './props'

import {
  Container,
  Title,
  Amount
} from './styles'

export default function ResumeCards({
  color,
  title,
  amount,
}: Props): ReactElement {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}