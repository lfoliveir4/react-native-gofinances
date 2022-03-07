import React, { ReactElement } from 'react'

import { Props } from './props'

import {
  Container,
  Icon,
  Title,
  Button
} from './styles'

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

export default function TransactionTypeButton({ 
  title, 
  type, 
  isActive, 
  ...rest 
}: Props): ReactElement {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  )
}