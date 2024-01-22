import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productDetail, updateProduct } from '~/services/ProductService';
import FormProduct from './FormProduct';

const AdminUpdateProduct = () => {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [image, setImage] = useState([]);
    const [variants, setVariants] = useState([]);
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [information, setInformation] = useState('');
    const [discount, setDiscount] = useState('');
    const [load, setLoad] = useState(false);
    console.log(name);

    useEffect(() => {
        const fetchProductDetail = async () => {
            const data = await productDetail(id);
            setName(data.name);
            setImage(data.image);
            setVariants(data.variants);
            setType(data.type);
            setPrice(data.price);
            setInformation(data.information);
            setDiscount(data.discount);
            setLoad(true);
        };
        fetchProductDetail();
    }, [id]);

    const handleSubmit = async (data, token, toast) => {
        await updateProduct(data, id, token, toast);
    };

    return (
        <div>
            {load && (
                <FormProduct
                    showName={name}
                    showImage={image}
                    showVariants={variants}
                    showType={type}
                    showPrice={price}
                    showInformation={information}
                    showDiscount={discount}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default AdminUpdateProduct;
