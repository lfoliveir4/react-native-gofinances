import React, { ReactElement } from 'react'

import { Props } from './props'

import { Container } from './styles'

export default function Input({ ...rest }: Props): ReactElement {
  return (
    <Container {...rest} />
  )
}