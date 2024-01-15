import React, { useEffect, useState } from 'react';
import Banner from '~/components/Banner/Banner';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '~/components/Product/Product';
import { Link } from 'react-router-dom';
import { allProduct } from '~/services/ProductService';

const HomePage = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchAllProduct = async () => {
            const data = await allProduct();
            setProducts(data);
        };
        fetchAllProduct()
    }, []);

    return (
        <div>
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
        </div>
    );
};

export default HomePage;
