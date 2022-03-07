

export type TransactionCardProps = {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

export type Props = {
  data: TransactionCardProps
}