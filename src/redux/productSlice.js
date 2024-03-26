import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        orders: null
    },
    reducers: {
        getOrders: (state, action) => {
            state.orders = action.payload;
        },
    },
});

export const { getOrders } = productSlice.actions;
export default productSlice.reducer;
