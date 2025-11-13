// product

export interface ProductResponse {
  id: number
  name: string
  price: number
  description: string
  images: string[]
  createdAt: string
  categories: ProductCategoryResponse[]
  active: boolean
  link: string
}

// category

export interface ProductCategoryResponse {
  id: number
  name: string
  image: string
  active: boolean
  createdAt: string
}
