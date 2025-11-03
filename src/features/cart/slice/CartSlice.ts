import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from '../../dashboard/Types/GetSubCategorieItems.Types';
import { ICartItem } from "../Types/Getcart.Types";

// Extend IItem for cart usage


interface ICartState {
    cart: ICartItem[];
    totalPrice: number;
}

const initialState: ICartState = {
    cart: [],
    totalPrice: 0
}

export const CartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        resetCart: (state) => {
            state.cart = [];
        },
        setCart: (state, action)=>{
            state.cart = action.payload;
        }
    }
});

export const { resetCart, setCart } = CartSlice.actions;
export default CartSlice.reducer;
