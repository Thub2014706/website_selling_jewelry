import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Product from '~/components/Product/Product';
import { allProduct } from '~/services/ProductService';

const ProductPage = () => {
    const search = useSelector((state) => state.product.search);

    const [filterProduct, setFilterProduct] = useState([]);

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
            setFilterProduct(newData);
        };
        fetchProducts();
    }, [search]);

    return (
        <div>
            <Row>
                <Col sm={4}></Col>
                <Col sm={8}>
                    <Row>
                        {filterProduct.map((product) => (
                            <Col sm={4}>
                                <Product
                                    key={product._id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    discount={product.discount}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default ProductPage;
