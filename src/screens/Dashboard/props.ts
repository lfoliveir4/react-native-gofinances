import { TransactionCardProps } from '../../components/TransactionsCard/props'

export type DataListProps = TransactionCardProps & {
  id: string
}

export type HighlightCardsProps = {
  amount: string
  lastTransaction: string 
}

export type HighlightCardsData = {
  entries: HighlightCardsProps
  expensives: HighlightCardsProps
  total: HighlightCardsProps
}