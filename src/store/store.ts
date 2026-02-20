import AsyncStorage from '@react-native-community/async-storage'
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AuthSlice from '../features/auth/slice/Authslice';
import DashboardSlice from '../features/dashboard/slice/DashboardSlice';
import CartSlice from '../features/cart/slice/CartSlice';
import CategorySlice from '../features/category/slice/CategorySlice';
import VendorSlice from '../features/checkout/slice/VendorSlice';



const persistConfig = {
    key: 'store',
    storage: AsyncStorage,
};

const persistedSlice = persistReducer(persistConfig, AuthSlice);

export const store = configureStore({
    reducer: {
        auth: persistedSlice,
        dashboard: DashboardSlice,
        cart: CartSlice,
        category: CategorySlice,
        vendor: VendorSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
