export interface GetCartResponse {
  message: string
  items: ICartItem[]
  subTotal: number
  grandTotal: number
}

export interface ICartItem {
  _id?: string
  productId: ProductId
  name: string
  image?: string
  images: string[]
  unit: string
  price: number
  originalPrice: number
  quantity: number
  lineTotal: number
  discount: number
}

export interface ProductId {
  _id: string
  name: string
  images: string[]
  category: string[]
  subCategory: string[]
  unit: string
  stock: number
  price: number
  originalPrice: number
  discountedMRP: number
  discount: number
  amountSaving: number
  description: string
  pack: string
  productName: string
  rating: number
  more_details: MoreDetails
  createdAt: string
  updatedAt: string
  __v: number
}

export interface MoreDetails {
  brand: string
  expiry: string
}
