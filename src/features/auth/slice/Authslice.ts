import { createSlice } from "@reduxjs/toolkit";
interface IUser{
    id: string,
    phoneNumber: string,
    isVerified: boolean
}

interface IAuth {
    phoneNumber: string,
    isAuthorized: boolean,
    token: string,
    user: IUser | null
}

const initialState: IAuth = {
    phoneNumber: "",
    isAuthorized: false,
    token: '',
    user: null
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState:initialState,
    reducers:{
        setPhoneNumber: (state, action) =>{
            state.phoneNumber = action.payload;
        },
        setAuthToken: (state, action)=>{
            state.token = action.payload
        },
        setLogin: (state, action)=>{
            state.isAuthorized = action.payload;
        },
        logout: (state)=>{
            state.isAuthorized = false,
            state.token = '',
            state.user = null
        },
        setUser: (state, action)=>{
            state.user = action.payload
        }
    }
})

export const {
    setPhoneNumber,
    setAuthToken,
    setLogin,
    logout,
    setUser
} = AuthSlice.actions;
export default AuthSlice.reducer;