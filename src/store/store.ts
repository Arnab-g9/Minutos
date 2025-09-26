import AsyncStorage from '@react-native-community/async-storage'
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AuthSlice from '../features/auth/slice/Authslice';
import  DashboardSlice  from '../features/dashboard/slice/DashboardSlice';



const persistConfig = {
    key: 'store',
    storage: AsyncStorage,
};

const persistedSlice = persistReducer(persistConfig, AuthSlice);

export const store = configureStore({
    reducer: {
        auth: persistedSlice,
        dashboard: DashboardSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
