import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../Types/GetCategory.Types";

interface ICategoryState {
    category: Category[] | []
}


const initialState: ICategoryState = {
    category: [],
}

export const CategorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setAllCategories: (state, action) => {
            console.log("this si action.payload inside the slice of category screen ==>", action.payload)
            state.category = action.payload
        }
    }
});

export const {
    setAllCategories
} = CategorySlice.actions;
export default CategorySlice.reducer;
