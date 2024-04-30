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

    const [orders, setOrders] = useState(null);
    const [orders1, setOrders1] = useState(null);
    // console.log(axiosJWT)

    useEffect(() => {
        const fetch = async () => {
            const dataOrder = await allOrder(user?.accessToken);
            setOrders(dataOrder);
            setOrders1(await allRocessing());
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
        await transportUpdate(id, user?.accessToken);
    };

    return orders1 !== null ? (
        <Container className="shadow rounded p-5">
            {/* <Row>
                <Col> */}
                    <h5>Đơn hàng xử lý</h5>
                    <HandleOrderTable
                        orders={orders1}
                        handleShow={handleShow}
                        handleClick={handleClick}
                    />
                {/* </Col>
            </Row> */}
            {orderShow && <OrderDetail show={show} handleClose={handleClose} orderShow={orderShow} />}
        </Container>
    ) : (
        <p>Loading...</p>
    );
};

export default HandleOrder;
