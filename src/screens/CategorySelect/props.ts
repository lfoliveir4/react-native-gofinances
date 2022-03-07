export type Category = {
  key: string
  name: string
}

export type Props = {
  category: Category
  setCategory: (category: Category) => void
  closeSelectCategory: () => void
}