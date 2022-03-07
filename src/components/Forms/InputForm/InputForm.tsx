import React, { ReactElement } from 'react'
import { Controller } from 'react-hook-form'

import { Props } from './props'

import Input from '../Input'

import { Container, Error } from './styles'

export default function InputForm({ 
  control, 
  name,
  error, 
  ...rest 
}: Props): ReactElement {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value} 
            {...rest} 
          />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  )
}