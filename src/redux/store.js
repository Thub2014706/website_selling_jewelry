import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer
    },
});
