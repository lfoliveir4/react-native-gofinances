import React, { ReactElement } from 'react'

import { Props } from './props'

import { Container, Title } from './styles'

export default function Button({ title, onPress, ...rest }: Props): ReactElement {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}