import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
    allCancel,
    allDelivered,
    allFinished,
    allOrder,
    allRocessing,
    allTransport,
    allUnfinished,
    orderDetail,
    transportUpdate,
} from '~/services/OrderService';
import OrderDetail from '../OrderDetail/OrderDetail';
import HandleOrderTable from '../HandleOrderTable/HandleOrderTable';

const AdminOrder = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const [orders, setOrders] = useState(null);
    const [orders1, setOrders1] = useState(null);
    const [orders2, setOrders2] = useState(null);
    const [orders3, setOrders3] = useState(null);
    const [orders4, setOrders4] = useState(null);
    const [orders5, setOrders5] = useState(null);
    const [orders6, setOrders6] = useState(null);
    // console.log(axiosJWT)

    useEffect(() => {
        const fetch = async () => {
            const dataOrder = await allOrder(user?.accessToken);
            setOrders(dataOrder);
            setOrders1(await allRocessing());
            setOrders2(await allTransport());
            setOrders3(await allUnfinished());
            setOrders4(await allDelivered());
            setOrders5(await allFinished());
            setOrders6(await allCancel());
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

    return orders1 !== null && orders2 !== null && orders3 !== null && orders4 !== null ? (
        <Container fluid>
            <Row>
                <Col>
                    <h5>Đơn hàng xử lý</h5>
                    <HandleOrderTable orders={orders1} handleShow={handleShow} />
                </Col>

                <Col>
                    <h5>Đơn hàng đang vận chuyển</h5>
                    <HandleOrderTable orders={orders2} handleShow={handleShow} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h5>Đơn hàng chưa hoàn thành</h5>
                    <HandleOrderTable orders={orders3} handleShow={handleShow} />
                </Col>
                <Col>
                    <h5>Đơn hàng đã giao</h5>
                    <HandleOrderTable orders={orders4} handleShow={handleShow} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h5>Đơn hàng xác nhận đã hoàn thành</h5>
                    <HandleOrderTable orders={orders5} handleShow={handleShow} />
                </Col>
                <Col>
                    <h5>Đơn hàng đã hủy</h5>
                    <HandleOrderTable orders={orders6} handleShow={handleShow} />
                </Col>
            </Row>
            {orderShow && <OrderDetail show={show} handleClose={handleClose} orderShow={orderShow} />}
            <Pagination count={10} color="secondary" />
        </Container>
    ) : (
        // <Container fluid>
        //     <Row className="shadow p-3">
        //         <Col>
        //             <Button
        //                 className="rounded-0 me-2"
        //                 style={{ backgroundColor: 'var(--list-menu)', border: 'none', width: '150px' }}
        //             >
        //                 Đang xử lý
        //             </Button>
        //             <Button
        //                 className="rounded-0 me-2"
        //                 style={{ backgroundColor: 'var(--list-menu)', border: 'none', width: '150px' }}
        //             >
        //                 Đang vận chuyển
        //             </Button>
        //             <Button
        //                 className="rounded-0 me-2"
        //                 style={{ backgroundColor: 'var(--list-menu)', border: 'none', width: '150px' }}
        //             >
        //                 Chưa hoàn thành
        //             </Button>
        //             <Button
        //                 className="rounded-0 me-2"
        //                 style={{ backgroundColor: 'var(--list-menu)', border: 'none', width: '150px' }}
        //             >
        //                 Đã giao
        //             </Button>
        //             <Button
        //                 className="rounded-0 me-2"
        //                 style={{ backgroundColor: 'var(--list-menu)', border: 'none', width: '150px' }}
        //             >
        //                 Đã xác nhận
        //             </Button>
        //             <Button
        //                 className="rounded-0 me-2"
        //                 style={{ backgroundColor: 'var(--list-menu)', border: 'none', width: '150px' }}
        //             >
        //                 Đã hủy
        //             </Button>
        //         </Col>
        //     </Row>
        // </Container>
        <p>Loading...</p>
    );
};

export default AdminOrder;
