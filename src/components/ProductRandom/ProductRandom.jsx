import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '../Product/Product';
import { Link, useParams } from 'react-router-dom';
import { allProduct, randomProduct } from '~/services/ProductService';

const ProductRandom = () => {
    const { id } = useParams();
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchAllProduct = async () => {
            const data = await randomProduct(id);
            setProducts(data);
        };
        fetchAllProduct();
    }, [id]);

    const onTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <Container className='mt-3'>
            <h3 className="fst-italic">Gợi ý sản phẩm</h3>
            <Row>
                {products?.map(
                    (product, index) =>
                        index <= 7 && (
                            <Col md={3} key={product._id}>
                                <Link to={`/product/${product._id}`} onClick={onTop} className="text-decoration-none">
                                    <Product
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        discount={product.discount}
                                        numberStar={product.numberStar}
                                        selled={product.selled}
                                    />
                                </Link>
                            </Col>
                        ),
                )}
            </Row>
        </Container>
    );
};

export default ProductRandom;
