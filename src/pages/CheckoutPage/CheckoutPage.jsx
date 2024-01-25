import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AllAddress from '~/components/AllAddress/AllAddress';
import AddAdress from '~/components/AddAddress/AddAddress';
import { createAxios } from '~/createInstance';
import { getAllByUser } from '~/services/AddressService';

const CheckoutPage = () => {
    const products = useSelector((state) => state.cart.cartItems);
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);
    const [showAddress, setShowAddress] = useState(null);
    const [select, setSelect] = useState(null);
    const handleSelect = (id) => {
        setSelect(id);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAll, setShowAll] = useState(false);

    const handleCloseAll = () => setShowAll(false);
    const handleShowAll = () => setShowAll(true);

    useEffect(() => {
        const fetchAddress = async () => {
            const addresses = await getAllByUser(axiosJWT, user?.accessToken, user?.data.id);
            if (addresses) {
                const selectId = addresses.find((item) => item._id === select);
                const main = addresses.find((item) => item.main === true);
                setShowAddress(selectId ? selectId : main);
            }
        };
        fetchAddress();
    }, [handleCloseAll]);

    return (
        <div>
            <Container className="p-4">
                <Row>
                    <Col sm={6}>
                        <h4>Địa chỉ nhận hàng</h4>
                        {showAddress ? (
                            <div>
                                <p>
                                    {showAddress.name}, {showAddress.phone} <br /> {showAddress.address},{' '}
                                    {showAddress.ward}, {showAddress.district}, {showAddress.province}
                                    {showAddress.main === true && <span className="ms-2 text-danger">Mặc định</span>}
                                    <a href="#" onClick={handleShowAll} className="ms-3">
                                        Thay đổi
                                    </a>
                                </p>
                                <AllAddress idSelect={handleSelect} show={showAll} handleCloseAll={handleCloseAll} />
                            </div>
                        ) : (
                            <div>
                                <Button
                                    variant="outline-dark"
                                    onClick={handleShow}
                                    className="rounded-0"
                                    style={{ width: '120px' }}
                                >
                                    Thêm địa chỉ
                                </Button>
                                <AddAdress show={show} handleClose={handleClose} />
                            </div>
                        )}
                    </Col>
                    <Col sm={6}>
                        <Card className="rounded-0 w-100 p-2">
                            <Card.Body>
                                <h4>Thanh toán</h4>
                                <Table className="my-3">
                                    <tbody>
                                        {products.map((item) => (
                                            <tr className="align-middle">
                                                <td>
                                                    <img
                                                        src={item.product.image[0]}
                                                        style={{ height: '50px' }}
                                                        alt=""
                                                    />
                                                </td>
                                                <td>
                                                    {item.product.name} <br /> size: {item.idSize.size}cm
                                                </td>
                                                <td>x{item.cartQuantity}</td>
                                                <td>
                                                    {(
                                                        (item.product.price -
                                                            (item.product.price * item.product.discount) / 100) *
                                                        item.cartQuantity
                                                    ).toLocaleString('it-IT')}
                                                    <span>&#8363;</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <Button
                                    className="w-25 mt-5 float-end rounded-0"
                                    style={{ backgroundColor: 'var(--primary-color)', border: 'none' }}
                                >
                                    Đặt hàng
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CheckoutPage;
