import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
    },
});
