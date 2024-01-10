import { faArrowLeft, faMinus, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import img1 from '~/assets/images/title_cart1.png';
import { decrease, increase, inputValue, removeFromCart, setDiscount, setTotal, setTotalPay } from '~/redux/cartSlice';

const CartPage = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.cart.cartItems);

    const removeItem = (products) => {
        dispatch(removeFromCart(products));
    };

    const handleDecrease = (products) => {
        dispatch(decrease(products));
    };

    const handleIncrease = (products) => {
        dispatch(increase(products));
    };

    const handleEdit = (id, stock, e) => {
        let number = Number(e.target.value.replace(/[^\d]/g, ''));
        if (number <= stock) {
            dispatch(inputValue({ id, number }));
        } else {
            number = stock;
            dispatch(inputValue({ id, number }));
        }
        console.log('ghđj', number);
    };

    useEffect(() => {
        dispatch(setTotal(products));
        dispatch(setTotalPay(products));
        dispatch(setDiscount(products));
    }, [products]);

    const totalFirst = useSelector((state) => state.cart.totalAmount);
    const totalLast = useSelector((state) => state.cart.totalPay);
    const totalDiscount = useSelector((state) => state.cart.totalDiscount);

    return (
        <div>
            <div style={{ position: 'relative', width: '100%' }}>
                <img src={img1} className="w-100" />
                <span className='h2 fst-italic text-black fw-bold'
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    GIỎ HÀNG
                </span>
            </div>
            <Container>
                {products.length !== 0 ? (
                    // SẢN PHẨM ĐẶT

                    <Row className="py-5">
                        <Col md={9}>
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
                                        <tr style={{ height: '70px' }}>
                                            {/* <td>{item}</td> */}
                                            <td className="align-middle">
                                                <Link
                                                    to={`/product/${item.product._id}`}
                                                    className="text-decoration-none text-black"
                                                >
                                                    <img
                                                        src={item.product.image[0]}
                                                        style={{ height: '60px' }}
                                                        className="me-3"
                                                    />
                                                    {item.product.name}, Phân loại: ({item.idSize.size}cm)
                                                </Link>
                                            </td>
                                            <td className="text-center align-middle" key={item.product._id}>
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
                                            <td className="text-center align-middle">
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
                                                        onChange={(e) =>
                                                            handleEdit(item.idSize._id, item.idSize.inStock, e)
                                                        }
                                                        value={item.cartQuantity !== 0 ? item.cartQuantity : ''}
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
                                            <td className="text-center align-middle">
                                                {(
                                                    (item.product.price -
                                                        (item.product.price * item.product.discount) / 100) *
                                                    item.cartQuantity
                                                ).toLocaleString('it-IT')}
                                                <span>&#8363;</span>
                                            </td>
                                            <td className="text-center align-middle">
                                                {/* <Button onClick={() => removeItem(item)}> */}
                                                <FontAwesomeIcon
                                                    onClick={() => removeItem(item)}
                                                    icon={faX}
                                                    style={{ color: 'rgb(157, 157, 157)1', cursor: 'pointer' }}
                                                />
                                                {/* </Button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>

                        {/* HOÁ ĐƠN */}

                        <Col md={3}>
                            <Card className="w-100 rounded-0 p-2" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <h4>Hóa Đơn</h4>
                                    <hr />
                                    <Table>
                                        <tr>
                                            <td>Tạm tính</td>
                                            <td className="text-end fw-bold">
                                                {totalFirst.toLocaleString('it-IT')}
                                                <span>&#8363;</span>
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td>Giảm giá</td>
                                            <td className="text-end fw-bold">
                                                {totalDiscount.toLocaleString('it-IT')}
                                                <span>&#8363;</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <hr />
                                            </td>
                                            <td>
                                                <hr />
                                            </td>
                                        </tr>

                                        <tr style={{ color: 'var(--font-color)' }}>
                                            <td>Tổng cộng</td>
                                            <td className="text-end fw-bold h5">
                                                {totalLast.toLocaleString('it-IT')}
                                                <span style={{ color: 'var(--font-color)' }}>&#8363;</span>
                                            </td>
                                        </tr>
                                    </Table>
                                    <Button
                                        className="w-100 rounded-0"
                                        style={{ backgroundColor: 'var(--primary-color)', border: 'none' }}
                                    >
                                        Tiến hành đặt hàng
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
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
        </div>
    );
};

export default CartPage;
