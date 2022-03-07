import { TextInputProps } from 'react-native'
import { Control } from 'react-hook-form'

export type Props = TextInputProps & {
  control: Control
  name: string
  error: string
}