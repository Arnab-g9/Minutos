import { createSlice } from "@reduxjs/toolkit";
import { Banner } from "../Types/GetAds.Types";
import { ICategory } from "../Types/GetCategories.Types";
import { IItem } from "../Types/GetSubCategorieItems.Types";

interface IDashboard {
   banner: Banner | null;
   categories: ICategory[] | []
   hotDealItems1: IItem[] | []
   hotDealItems2: IItem[] | []
   hotDealItems3: IItem[] | []
}

const initialState: IDashboard = {
   banner: null,
   categories: [],
   hotDealItems1: [],
   hotDealItems2: [],
   hotDealItems3: []

}

export const DashboardSlice = createSlice({
   name: 'dashboardSlice',
   initialState: initialState,
   reducers: {
      setBanner: (state, action) => {
         state.banner = action.payload;
      },
      setCategories: (state, action) => {
         state.categories = action.payload
      },
      setHotDealItems1: (state, action) => {
         state.hotDealItems1 = action.payload
      },
      setHotDealItems2: (state, action) => {
         state.hotDealItems2 = action.payload
      },
      setHotDealItems3: (state, action) => {
         state.hotDealItems3 = action.payload
      },
   }
})

export const {
   setBanner,
   setCategories,
   setHotDealItems1,
   setHotDealItems2,
   setHotDealItems3
} = DashboardSlice.actions;
export default DashboardSlice.reducer;