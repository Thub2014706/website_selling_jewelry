import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ModalAddAdress from '~/components/ModalAddAddress/ModalAddAddress';
import ModalAllAddress from '~/components/ModalAllAddress/ModalAllAddress';
import ModalUpdateAdress from '~/components/ModalUpdateAddress/ModalUpdateAddress';
import { createAxios } from '~/createInstance';
import { getAllByUser } from '~/services/AddressService';

const CheckoutPage = () => {
    const products = useSelector((state) => state.cart.cartItems);
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);
    const [showAddress, setShowAddress] = useState(null);
    // console.log(allAdress)

    useEffect(() => {
        const fetchAddress = async () => {
            const addresses = await getAllByUser(axiosJWT, user?.accessToken, user?.data.id);
            const main = addresses.find((item) => item.main === true);
            if (main) {
                setShowAddress(main);
            }
        };
        fetchAddress();
    }, [showAddress]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Container className="p-4">
                <Row>
                    <Col sm={6}>
                        {showAddress ? (
                            <div>
                                <h4>Địa chỉ nhận hàng</h4>
                                <p>
                                    {showAddress.phone}, {showAddress.address}, {showAddress.ward},{' '}
                                    {showAddress.district}, {showAddress.province}
                                    <a href="#" onClick={handleShow} className="ms-2">
                                        Thay đổi
                                    </a>
                                </p>
                                {/* <ModalUpdateAdress id={showAddress._id} show={show} handleClose={handleClose} /> */}
                                <ModalAllAddress show={show} handleClose={handleClose} />
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
                                <ModalAddAdress show={show} handleClose={handleClose} />
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
