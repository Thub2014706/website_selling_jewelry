import { faArrowLeft, faMinus, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, ButtonGroup, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { decrease, increase, removeFromCart } from '~/redux/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.cart.cartItems);

    console.log('ghj', products);

    const value = useSelector((state) => state.cart.quantityBuy);
    console.log('thu', value);

    const removeItem = (products) => {
        dispatch(removeFromCart(products));
    };

    const handleDecrease = (products) => {
        dispatch(decrease(products));
    };

    const handleIncrease = (products) => {
        dispatch(increase(products));
        console.log('ghđj', products);
    };

    const handleEdit = () => {};

    // console.log("ghjklsdfgh", products)
    return (
        <Container>
            {products.length !== 0 ? (
                <Row className="py-5">
                    <Col md={8}>
                        <Table>
                            <thead>
                                <tr className="text-center">
                                    <th>Sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item) => (
                                    <tr>
                                        <td>
                                            <img
                                                src={item.product.image[0]}
                                                style={{ width: '60px' }}
                                                className="me-3"
                                            />
                                            {item.product.name}
                                        </td>
                                        <td className="text-center" key={item.product._id}>
                                            {item.product.discount !== 0 && (
                                                <p className="text-decoration-line-through mb-2">
                                                    {item.product.price.toLocaleString('it-IT')}
                                                    <span>&#8363;</span>
                                                </p>
                                            )}
                                            <b>
                                                {(
                                                    item.product.price -
                                                    (item.product.price * item.product.discount) / 100
                                                ).toLocaleString('it-IT')}
                                                <span>&#8363;</span>
                                            </b>
                                        </td>
                                        <td className="text-center">
                                            <ButtonGroup size="sm" aria-label="Basic example">
                                                <Button
                                                    variant="outline-secondary"
                                                    className="rounded-0"
                                                    onClick={() => handleDecrease(item)}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </Button>
                                                <input
                                                    type="text"
                                                    style={{ width: '40px' }}
                                                    className="text-center"
                                                    onChange={handleEdit}
                                                    value={item.cartQuantity}
                                                />
                                                <Button
                                                    variant="outline-secondary"
                                                    className="rounded-0"
                                                    onClick={() => handleIncrease(item)}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                        <td className="text-center">
                                            {(
                                                (item.product.price -
                                                    (item.product.price * item.product.discount) / 100) *
                                                item.cartQuantity
                                            ).toLocaleString('it-IT')}
                                            <span>&#8363;</span>
                                        </td>
                                        <td className="text-center">
                                            <Button onClick={() => removeItem(item)}>
                                                <FontAwesomeIcon icon={faX} style={{ color: 'rgb(157, 157, 157)1' }} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={4}></Col>
                </Row>
            ) : (
                <Row className="py-5">
                    <Col className="text-center">
                        <h3>Không có sản phẩm nào trong giỏ hàng.</h3>
                        <Link className="text-dark h5" to={'/'}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Tiếp tục mua hàng
                        </Link>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default CartPage;
