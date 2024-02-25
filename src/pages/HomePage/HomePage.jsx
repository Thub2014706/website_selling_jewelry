import React, { useEffect, useState } from 'react';
import Banner from '~/components/Banner/Banner';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import Product from '~/components/Product/Product';
import { Link, useNavigate } from 'react-router-dom';
import { allProduct } from '~/services/ProductService';
import imgshopnow from '~/assets/images/imgshopnow.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { removeSearch } from '~/redux/productSlice';
import { useDispatch } from 'react-redux';

const HomePage = () => {
    const [products, setProducts] = useState(null);

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const bestSellers = () => {
        if (products !== null) {
            return products.sort((a, b) => b.selled - a.selled);
        }
    };

    useEffect(() => {
        const fetchAllProduct = async () => {
            const data = await allProduct();
            setProducts(data);
            AOS.init({ once: true, duration: 1500 });
        };
        fetchAllProduct();
    }, [AOS]);

    const shopNow = () => {
        dispatch(removeSearch());
        navigate('/shop')
    }

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <Banner />
            {products !== null ? (
                <div>
                    <Container className="py-4">
                        <h3 className="text-center mb-4 fw-bold">BEST SELLERS</h3>
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
                    <div style={{ position: 'relative' }}>
                        <img src={imgshopnow} className="w-100" alt="" />
                        <div
                            style={{
                                position: 'absolute',
                                top: '30%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <h3
                                data-aos="fade-down"
                                style={{
                                    letterSpacing: '5px',
                                    color: '#ffffff',
                                }}
                            >
                                GIATHU JEWELRY
                            </h3>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <p
                                data-aos="zoom-in"
                                style={{
                                    fontFamily: '"Alex Brush", Sans-serif',
                                    fontSize: '100px',
                                    color: '#ffffff',
                                }}
                            >
                                Brand New Arrival
                            </p>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '20%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            {/* <Link to={'/shop'}> */}
                                <Button
                                    data-aos="fade-up"
                                    variant="outline-light"
                                    className="fst-italic rounded-pill"
                                    style={{
                                        width: '200px',
                                        height: '50px',
                                    }}
                                    onClick={shopNow}
                                >
                                    <h2>Shop Now</h2>
                                </Button>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {products !== null ? (
                <Container style={{zIndex: 100}}>
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
                </Container>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default HomePage;
