import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        search: '',
    },
    reducers: {
        searchProducts: (state, action) => {
            state.search = action.payload;
        },
    },
});

export const { searchProducts } = productSlice.actions;
export default productSlice.reducer;
