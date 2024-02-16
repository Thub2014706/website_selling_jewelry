import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { allOrder, orderDetail, updateStatus } from '~/services/OrderService';
import OrderDetail from '../OrderDetail/OrderDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { getAllAddress } from '~/services/AddressService';

const HandleOrder = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const [orders, setOrders] = useState(null);

    const [addresses, setAddresses] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const dataOrder = await allOrder(axiosJWT, user?.accessToken);
            const dataAddress = await getAllAddress(axiosJWT, user?.accessToken);
            setOrders(dataOrder);
            setAddresses(dataAddress);
        };
        fetch();
    }, [orders, axiosJWT, user?.accessToken]);

    const [show, setShow] = useState(false);

    const [orderShow, setOrderShow] = useState(null);

    const handleShow = async (id) => {
        setShow(true);
        const data = await orderDetail(axiosJWT, id, user?.accessToken);
        setOrderShow(data);
    };

    const handleClose = () => setShow(false);

    const handleClick = async (id) => {
        await updateStatus(axiosJWT, id, user?.accessToken);
    };

    return orders !== null ? (
        <Container fluid>
            <Row>
                <Col>
                    <h5>Đơn hàng xử lý</h5>
                    <Table bordered striped className="text-center align-middle">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID đơn hàng</th>
                                <th>Chi tiết</th>
                                <th>Xử lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item1, index) => {
                                let idAddress = addresses.find((val) => val._id === item1.shipping);
                                return item1.status === 'Đang xử lý' && (
                                    <tr key={item1._id}>
                                        <td>{index + 1}</td>
                                        <td>{item1._id}</td>
                                        <td>
                                            <FontAwesomeIcon icon={faEye} onClick={() => handleShow(item1._id)} />
                                        </td>
                                        <td>
                                            <Button variant="warning" onClick={() => handleClick(item1._id)}>
                                                Vận chuyển
                                            </Button>
                                        </td>
                                        {orderShow && (
                                            <OrderDetail
                                                show={show}
                                                handleClose={handleClose}
                                                orderShow={orderShow}
                                                shipping={idAddress}
                                            />
                                        )}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>

                <Col>
                    <h5>Đơn hàng đang vận chuyển</h5>
                    <Table bordered striped className="text-center align-middle">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID đơn hàng</th>
                                <th>Chi tiết</th>
                                <th>Xử lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item1, index) => {
                                let idAddress = addresses.find((val) => val._id === item1.shipping);
                                return item1.status === 'Đang vận chuyển' && (
                                    <tr key={item1._id}>
                                        <td>{index + 1}</td>
                                        <td>{item1._id}</td>
                                        <td>
                                            <FontAwesomeIcon icon={faEye} onClick={() => handleShow(item1._id)} />
                                        </td>
                                        <td>
                                            <Button variant="warning" onClick={() => handleClick(item1._id)}>
                                                Đã giao
                                            </Button>
                                        </td>
                                        {orderShow && (
                                            <OrderDetail
                                                show={show}
                                                handleClose={handleClose}
                                                orderShow={orderShow}
                                                shipping={idAddress}
                                            />
                                        )}
                                    </tr>
                                ) 
                                // : (
                                //     <tr>
                                //         <td colSpan={4}>Không có đơn nào</td>
                                //     </tr>
                                // );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Đơn hàng đã giao</h5>
                    <Table bordered striped className="text-center align-middle">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID đơn hàng</th>
                                <th>Chi tiết</th>
                                {/* <th>Xử lý</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item1, index) => {
                                let idAddress = addresses.find((val) => val._id === item1.shipping);
                                return item1.status === 'Đã giao' && (
                                    <tr key={item1._id}>
                                        <td>{index + 1}</td>
                                        <td>{item1._id}</td>
                                        <td>
                                            <FontAwesomeIcon icon={faEye} onClick={() => handleShow(item1._id)} />
                                        </td>
                                        {/* <td>
                                                <Button variant="warning" onClick={() => handleClick(item1._id)}>
                                                    Đã giao
                                                </Button>
                                            </td> */}
                                        {orderShow && (
                                            <OrderDetail
                                                show={show}
                                                handleClose={handleClose}
                                                orderShow={orderShow}
                                                shipping={idAddress}
                                            />
                                        )}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    ) : (
        <p>Loading...</p>
    );
};

export default HandleOrder;
