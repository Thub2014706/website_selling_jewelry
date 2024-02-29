import React, { useEffect, useState } from 'react';
import Shop from '~/components/Shop/Shop';
import { allProduct } from '~/services/ProductService';

const ShopPage = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await allProduct();
            setProducts(data);
        };
        fetchProducts();
    }, []);
    return (
        <div>
            <Shop products={products} />
        </div>
    );
};

export default ShopPage;
