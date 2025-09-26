export interface ISubCategoryResponse {
    message: string
    category: string
    subcategories: ISubcategory[]
    count: number
}

export interface ISubcategory {
    _id: string
    name: string
    category: string
    image: string
    createdAt: string
    updatedAt: string
    __v: number
}
