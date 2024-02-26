import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './productSlice';
import addressReducer from './addressSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'cart', 'address'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    address: addressReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
