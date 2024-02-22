import React, { useEffect, useState } from 'react';
import Banner from '~/components/Banner/Banner';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import Product from '~/components/Product/Product';
import { Link } from 'react-router-dom';
import { allProduct } from '~/services/ProductService';
import imgshopnow from '~/assets/images/imgshopnow.svg';

const HomePage = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchAllProduct = async () => {
            const data = await allProduct();
            setProducts(data);
        };
        fetchAllProduct();
    }, []);

    const bestSellers = () => {
        if (products !== null) {
            return products.sort((a, b) => b.selled - a.selled);
        }
    };

    return (
        <div>
            <Banner />
            {products !== null ? (
                <div className="py-4">
                    <h3 className="text-center mb-4 fw-bold">BEST SELLERS</h3>
                    <Container>
                        <Row>
                            {bestSellers().map(
                                (product, index) =>
                                    index <= 7 && (
                                        <Col md={3} key={product._id}>
                                            <Link to={`/product/${product._id}`} className="text-decoration-none">
                                                <Product
                                                    image={product.image}
                                                    name={product.name}
                                                    price={product.price}
                                                    discount={product.discount}
                                                />
                                            </Link>
                                        </Col>
                                    ),
                            )}
                        </Row>
                    </Container>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <img src={imgshopnow} className="vw-100" alt="" />
            {products !== null ? (
                <Row>
                    {products.map((product, index) => (
                        <Col md={3} key={product._id}>
                            <Link to={`/product/${product._id}`} className="text-decoration-none">
                                <Product
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
        </div>
    );
};

export default HomePage;
