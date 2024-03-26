import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { allOrder, orderDetail, updateStatus } from '~/services/OrderService';
import OrderDetail from '../OrderDetail/OrderDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { getAllAddress } from '~/services/AddressService';

const HandleOrder = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    // const axiosJWT = createAxios(user, dispatch);

    const [orders, setOrders] = useState(null);
    // console.log(axiosJWT)

    useEffect(() => {
        const fetch = async () => {
            const dataOrder = await allOrder(user?.accessToken);
            setOrders(dataOrder);
        };
        fetch();
    }, [orders, user?.accessToken]);

    const [show, setShow] = useState(false);

    const [orderShow, setOrderShow] = useState(null);

    const handleShow = async (id) => {
        setShow(true);
        const data = await orderDetail(id, user?.accessToken);
        setOrderShow(data);
    };

    const handleClose = () => setShow(false);

    const handleClick = async (id, status) => {
        // console.log(status);
        const data = { status: status.toString() }
        await updateStatus(id, data);
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
                            {orders.map((item, index) => {
                                return (
                                    item.data.variants[item.data.variants.length - 1].status === 'Đang xử lý' && (
                                        <tr key={item.data._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.data._id}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    onClick={() => handleShow(item.data._id)}
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    onClick={() => handleClick(item.data._id, 'Đang vận chuyển')}
                                                >
                                                    Vận chuyển
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                );
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
                                {/* <th>Xử lý</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => {
                                return (
                                    item.data.variants[item.data.variants.length - 1].status === 'Đang vận chuyển' && (
                                        <tr key={item.data._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.data._id}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    onClick={() => handleShow(item.data._id)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </td>
                                            {/* <td>
                                                <Button variant="warning" onClick={() => handleClick(item.data._id)}>
                                                    Đã giao
                                                </Button>
                                            </td> */}
                                        </tr>
                                    )
                                );
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
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, index) => {
                                return (
                                    item.data.variants[item.data.variants.length - 1].status === 'Đã giao' && (
                                        <tr key={item.data._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.data._id}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    onClick={() => handleShow(item.data._id)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {orderShow && <OrderDetail show={show} handleClose={handleClose} orderShow={orderShow} />}
        </Container>
    ) : (
        <p>Loading...</p>
    );
};

export default HandleOrder;
