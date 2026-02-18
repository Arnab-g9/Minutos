import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../Types/Getcart.Types";

function computeSubtotal(items: ICartItem[]): number {
  if (!items?.length) return 0;
  return items.reduce(
    (sum, item) => sum + (item.lineTotal ?? item.price * (item.quantity ?? 1)),
    0
  );
}

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
            state.totalPrice = 0;
        },
        setCart: (state, action: PayloadAction<ICartItem[]>) => {
            const items = action.payload ?? [];
            state.cart = items;
            state.totalPrice = computeSubtotal(items);
        }
    }
});

export const { resetCart, setCart } = CartSlice.actions;
export default CartSlice.reducer;
