export interface IGetSubCategoryResponse {
    success: boolean
    message: string
    total: number
    data: IItem[]
}

export interface IItem {
    _id: string
    name: string
    images: string[]
    category: Category[]
    subCategory: SubCategory[]
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

export interface Category {
    _id: string
    name: string
}

export interface SubCategory {
    _id: string
    name: string
}

export interface MoreDetails {
    brand: string
    expiry: string
}
