import React, { useEffect } from 'react';
import Banner from '~/components/Banner/Banner';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '~/components/Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { allProduct } from '~/redux/apiRequest';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { config } from 'dotenv';

const HomePage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.getAllProduct.currentProduct);

    // let axiosJWT = axios.create();
    console.log('dfghjk', products);

    useEffect(() => {
        allProduct(dispatch);
    }, []);

    // axiosJWT.interceptors.request.use(
    //     //trước khi gửi request nào đó thì interceptors sẽ check này trước khi gọi api nào đó
    //     async(config) => {
    //         const decodedToken = jwtDecode(user)
    //     }
    // );

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
