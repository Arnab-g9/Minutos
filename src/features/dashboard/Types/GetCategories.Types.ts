export interface ICategoryResponse {
  message: string
  categories: ICategory[]
  count: number
}

export interface ICategory {
  _id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}
