export type Props = {}

export type TransactionData = {
  id: string
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

export type TotalByCategoryProps = {
  key: string
  name: string
  total: number
  color: string
  totalFormatted: string
  percent: string
}