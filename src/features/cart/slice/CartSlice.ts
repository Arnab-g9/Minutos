import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from '../../dashboard/Types/GetSubCategorieItems.Types';

// Extend IItem for cart usage
export interface ICartItem extends IItem {
    quantity: number; // Added quantity field
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
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const item = action.payload;
            const index = state.cart.findIndex(i => i._id === item._id);

            if (index >= 0) {
                // Increment/decrement by payload quantity
                state.cart[index].quantity += item.quantity;

                // Clamp between 1 and 10
                if (state.cart[index].quantity > 10) state.cart[index].quantity = 10;
                if (state.cart[index].quantity <= 0) state.cart.splice(index, 1); // remove if <= 0
            } else if (item.quantity > 0) {
                state.cart.push({ ...item, quantity: Math.min(item.quantity, 10) });
            }

            // Update totalPrice
            state.totalPrice = state.cart.reduce(
                (total, cartItem) => total + cartItem.discountedMRP * cartItem.quantity,
                0
            );
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);

            // Update total price
            state.totalPrice = state.cart.reduce(
                (total, cartItem) => total + cartItem.discountedMRP * cartItem.quantity,
                0
            );
        },
        updateQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            const index = state.cart.findIndex(item => item._id === action.payload.id);
            if (index >= 0) {
                state.cart[index].quantity = action.payload.quantity;

                // Remove item if quantity <= 0
                if (state.cart[index].quantity <= 0) {
                    state.cart.splice(index, 1);
                }

                // Update total price
                state.totalPrice = state.cart.reduce(
                    (total, cartItem) => total + cartItem.discountedMRP * cartItem.quantity,
                    0
                );
            }
        },
        resetCart: (state) => {
            state.cart = [];
        },
        setCart: (state, action)=>{
            state.cart = action.payload;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, resetCart, setCart } = CartSlice.actions;
export default CartSlice.reducer;
