import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IVendor {
  _id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  businessName?: string;
  businessType?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  status?: string;
}

interface IVendorState {
  vendors: IVendor[];
  loading: boolean;
  error: string | null;
}

const initialState: IVendorState = {
  vendors: [],
  loading: false,
  error: null,
};

export const VendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setVendors: (state, action: PayloadAction<IVendor[]>) => {
      state.vendors = action.payload;
      state.loading = false;
      state.error = null;
    },
    setVendorsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setVendorsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setVendors, setVendorsLoading, setVendorsError } = VendorSlice.actions;
export default VendorSlice.reducer;
