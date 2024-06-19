export interface AbstractProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  thumbnail: string
  images: string[]
}

export interface AbstractProductListItem {
  id: number
  title: string
  thumbnail: string
  price: number
}
