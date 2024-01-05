import React, { useEffect } from 'react';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productDetail } from '~/redux/apiRequest';
import QuantityBox from '../QuantityBox/QuantityBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const product = useSelector((state) => state.product.getDetail.currentProduct);
    useEffect(() => {
        productDetail(dispatch, id);
        console.log(product);
    }, []);

    return (
        <Container>
            {product !== null ? (
                <Row>
                    <Col md="6">
                        {/* <img src={product.image} alt="" /> */}
                        <Carousel data-bs-theme="dark">
                            {product.image.map((img, index) => (
                                <Carousel.Item >
                                    <img src={img} alt="" className="d-block mx-auto" />
                                    <p data-bs-target="#demo" data-bs-slide-to={index}>{index + 1} / {product.image.length}</p>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                    <Col md="6" className="mt-5">
                        <h2>{product.name}</h2>
                        <h5>
                            Đã bán: {product.selled} | Kho còn: {product.inStock}
                        </h5>
                        <div className=" mt-4">
                            {product.discount !== 0 && (
                                <h5
                                    className="text-decoration-line-through"
                                    style={{ verticalAlign: 'middle', display: 'inline-block', marginRight: '10px' }}
                                >
                                    {product.price.toLocaleString('it-IT')}
                                    <span>&#8363;</span>
                                </h5>
                            )}
                            <h3
                                style={{ color: 'var(--font-color)', verticalAlign: 'middle', display: 'inline-block' }}
                            >
                                {(product.price - (product.price * product.discount) / 100).toLocaleString('it-IT')}
                                <span>&#8363;</span>
                            </h3>
                        </div>
                        <QuantityBox inStock={product.inStock} />
                        <Button
                            className="py-2 px-4 mt-4 me-3 rounded-0"
                            style={{ backgroundColor: 'var(--primary-color)', border: 'none' }}
                        >
                            <FontAwesomeIcon icon={faBagShopping} className="me-2" />
                            Thêm vào giỏ
                        </Button>
                        <Button
                            className="py-2 px-4 mt-4 rounded-0"
                            style={{ backgroundColor: 'var(--font-color)', border: 'none' }}
                        >
                            Mua ngay
                        </Button>
                    </Col>
                </Row>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default ProductDetails;
