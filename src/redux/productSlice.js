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
        removeSearch: (state) => {
            state.search = '';
        }
    },
});

export const { searchProducts, removeSearch } = productSlice.actions;
export default productSlice.reducer;
