import React, { useEffect } from 'react';
import Banner from '~/components/Banner/Banner';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '~/components/Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { allProduct } from '~/redux/apiRequest';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.getAllProduct.currentProduct);

    useEffect(() => {
        allProduct(dispatch);
    }, []);

    return (
        <Container fluid>
            <Banner />
            <Container>
                {products !== null ? (
                    <Row>
                        {products.map((product) => (
                            <Col md={3}>
                                <Link to={`/product/${product._id}`} className="text-decoration-none">
                                    <Product
                                        key={product._id}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        discount={product.discount}
                                    />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>Loading...</p>
                )}
            </Container>
        </Container>
    );
};

export default HomePage;
