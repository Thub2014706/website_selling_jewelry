import React from 'react';
import FormProduct from './FormProduct';
import { addProduct } from '~/services/ProductService';

const AdminAddProduct = () => {
    const handleSubmit = async (data, token, toast) => {
        await addProduct(data, token, toast);
    };
    return (
        <div>
            <FormProduct onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminAddProduct;
