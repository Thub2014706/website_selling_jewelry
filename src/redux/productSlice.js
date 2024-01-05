import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        getAllProduct: {
            currentProduct: null,
            isFetching: false,
            error: false,
        },
        getDetail: {
            currentProduct: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getAllStart: (state) => {
            state.getAllProduct.isFetching = true;
        },
        getAllSuccess: (state, action) => {
            state.getAllProduct.isFetching = false;
            state.getAllProduct.currentProduct = action.payload;
            state.getAllProduct.error = false;
        },
        getAllFailed: (state) => {
            state.getAllProduct.error = true;
        },
        getDetailStart: (state) => {
            state.getDetail.isFetching = true;
        },
        getDetailSuccess: (state, action) => {
            state.getDetail.isFetching = false;
            state.getDetail.currentProduct = action.payload;
            state.getDetail.error = false;
        },
        getDetailFailed: (state) => {
            state.getDetail.error = true;
        },
    },
});

export const { getAllStart, getAllSuccess, getAllFailed, getDetailStart, getDetailSuccess, getDetailFailed } =
    productSlice.actions;
export default productSlice.reducer;
