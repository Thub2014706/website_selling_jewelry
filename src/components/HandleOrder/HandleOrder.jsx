import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
    allDelivered,
    allOrder,
    allRocessing,
    allTransport,
    allUnfinished,
    orderDetail,
    transportUpdate,
} from '~/services/OrderService';
import OrderDetail from '../OrderDetail/OrderDetail';
import HandleOrderTable from '../HandleOrderTable/HandleOrderTable';

const HandleOrder = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    // const axiosJWT = createAxios(user, dispatch);

    const [orders, setOrders] = useState(null);
    const [orders1, setOrders1] = useState(null);
    const [orders2, setOrders2] = useState(null);
    const [orders3, setOrders3] = useState(null);
    const [orders4, setOrders4] = useState(null);
    // console.log(axiosJWT)

    useEffect(() => {
        const fetch = async () => {
            const dataOrder = await allOrder(user?.accessToken);
            setOrders(dataOrder);
            setOrders1(await allRocessing());
            setOrders2(await allTransport());
            setOrders3(await allUnfinished());
            setOrders4(await allDelivered());
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

    const handleClick = async (id) => {
        // console.log(id);
        await transportUpdate(id, user?.accessToken);
    };

    return orders1 !== null && orders2 !== null && orders3 !== null && orders4 !== null ? (
        <Container fluid>
            <Row>
                <Col>
                    <h5>Đơn hàng xử lý</h5>
                    <HandleOrderTable
                        orders={orders1}
                        handleShow={handleShow}
                        handleClick={handleClick}
                    />
                </Col>

                <Col>
                    <h5>Đơn hàng đang vận chuyển</h5>
                    <HandleOrderTable
                        orders={orders2}
                        handleShow={handleShow}
                        // handleClick={handleClick}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>Đơn hàng chưa hoàn thành</h5>
                    <HandleOrderTable
                        orders={orders3}
                        handleShow={handleShow}
                        // handleClick={handleClick}
                    />
                </Col>
                <Col>
                    <h5>Đơn hàng đã giao</h5>
                    <HandleOrderTable
                        orders={orders4}
                        handleShow={handleShow}
                        // handleClick={handleClick}
                    />
                </Col>
            </Row>
            {orderShow && <OrderDetail show={show} handleClose={handleClose} orderShow={orderShow} />}
        </Container>
    ) : (
        <p>Loading...</p>
    );
};

export default HandleOrder;
