import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Shop from '~/components/Shop/Shop';
import { allProduct } from '~/services/ProductService';

const ProductSearchPage = () => {
    const location = useLocation();

    const search = new URLSearchParams(location.search).get('query'); //lấy giá trị chuỗi truy vấn trên url

    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await allProduct();
            const newData = data.filter((item) =>
                item.name
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .includes(
                        search
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase(),
                    ),
            );
            setProducts(newData)
        };
        fetchProducts();
    }, [search]);
    return (
        <div>
            <Shop products={products} />
        </div>
    );
};

export default ProductSearchPage;
