import { createSlice } from "@reduxjs/toolkit";
import { Banner } from "../Types/GetAds.Types";
import { ICategory } from "../Types/GetCategories.Types";

interface IDashboard{
    banner: Banner | null;
    categories: ICategory[] | []
}

const initialState:IDashboard = {
   banner: null,
   categories: []
}

export const DashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState:initialState,
    reducers:{
       setBanner: (state, action)=>{
        state.banner = action.payload;
       },
       setCategories: (state, action)=>{
         state.categories = action.payload
       }
    }
})

export const {
   setBanner,
   setCategories
} = DashboardSlice.actions;
export default DashboardSlice.reducer;