import { ImageSource } from "../../../constants/assets/Images"

export interface IProductitem {
    image: any,
    name: string,
    weight: string,
    price: number,
    discount?: number,
    discountPrice?: number
}

export const productData: IProductitem[] = [
    {
        image: ImageSource.item1,
        name: "Tata Salt",
        weight: "500g",
        price: 25,
        discount: 5,
        discountPrice: 24,
    },
    {
        image: ImageSource.item1,
        name: "Tata Salt",
        weight: "500g",
        price: 25,
        // discount: 5,
        discountPrice: 24,
    },
    {
        image: ImageSource.item1,
        name: "Tata Salt",
        weight: "500g",
        price: 25,
        discount: 5,
        discountPrice: 24,
    },
    {
        image: ImageSource.item1,
        name: "Tata Salt",
        weight: "500g",
        price: 25,
        discount: 5,
        discountPrice: 24,
    },

]