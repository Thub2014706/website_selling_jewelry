import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Shop from '~/components/Shop/Shop';
import { allProduct, allType, filterByType } from '~/services/ProductService';

const CategoryPage = () => {
    const [products, setProducts] = useState(null);

    const { name } = useParams();

    // const [types, setTypes] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const dataType = await allType();
            const nameType = dataType.find(item => item.name === name)
            const idType = nameType._id
            const data = await filterByType(idType)
            setProducts(data);
        };
        fetchData();
    }, [products]);

    return (
        <div>
            <Shop products={products} />
        </div>
    );
};

export default CategoryPage;
