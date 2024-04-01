import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import {
    allOrderConfirm,
    allOrderTransport,
    cancelOrder,
    deliveredUpdate,
    deliveringUpdate,
    unfinishedUpdate,
} from '~/services/OrderService';
import { useSelector } from 'react-redux';
import NoteModal from '../NoteModal/NoteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalSelect from '../ModalSelect/ModalSelect';

const ShipperHandle = ({ statusOrder }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [detail, setDetail] = useState(null);
    const [orders, setOrders] = useState(null);

    const handleDetail = (data) => {
        setDetail(data);
    };

    const handleDelivering = async (id) => {
        const data = {
            shipper: user.data.id,
        };
        await deliveringUpdate(id, data);
    };

    const handleDelivered = async (id) => {
        const data = {
            shipper: user.data.id,
        };
        // console.log('gh')
        await deliveredUpdate(id, data);
    };

    const [show, setShow] = useState(false);

    const [showNote, setShowNote] = useState(false);

    const [idNote, setIdNote] = useState(null);
    const [idShow, setIdShow] = useState(null)

    const handleCloseStock = () => {
        setShowNote(false);
        setIdNote(null)
    };

    const handleClose = () => {
        setShow(false);
        setIdShow(null)
    };

    const handleStock = (id) => {
        setShowNote(true);
        setIdNote(id);
    };

    const handleSave = async (text) => {
        // console.log(text)
        const data = {
            shipper: user.data.id,
            note: text,
        };
        await unfinishedUpdate(idNote, data);
        // setShowNote(false)
        toast('Đã lưu', {
            position: 'top-center',
            autoClose: 2000,
            type: 'success',
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        // setNote(text)
    };

    // const [show, setShow] = useState(false)

    const handleShow = (id) => {
        setShow(true);
        setIdShow(id)
    };

    const handleCancel = async () => {
        const data = {
            shipper: user.data.id,
        };
        await cancelOrder(idShow, user?.accessToken, toast, data);
        setShow(false);
    };
    
    useEffect(() => {
        const fetch = async () => {
            const data1 = await allOrderTransport();
            const data2 = await allOrderConfirm();
            if (statusOrder === 'prepare') {
                setOrders(data1);
            }
            if (statusOrder === 'confirm') {
                setOrders(data2);
            }
        };
        fetch();
    }, [orders, idNote, idShow]);

    return (
        <Row>
            <ToastContainer />
            <Col>
                <Table bordered striped>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>ID đơn hàng</th>
                            <th>Địa chỉ</th>
                            <th>Tổng thu</th>
                            <th>Xử lý</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders !== null ? (
                            orders.map((item, index) => (
                                <tr
                                    key={item._id}
                                    onClick={() => handleDetail(item)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{index + 1}</td>
                                    <td>{item._id}</td>
                                    <td>
                                        {item.shipping.phone}, {item.shipping.address}, {item.shipping.ward}, {item.shipping.district},{' '}
                                        {item.shipping.province}
                                    </td>
                                    <td>{item.total.toLocaleString('it-IT')}đ</td>
                                    <td>
                                        {statusOrder === 'prepare' ? (
                                            <Button onClick={() => handleDelivering(item._id)} variant="dark">
                                                Nhập đơn giao
                                            </Button>
                                        ) : (
                                            <div className="d-flex">
                                                <Button
                                                    onClick={() => handleDelivered(item._id)}
                                                    variant="dark"
                                                >
                                                    Đã giao
                                                </Button>
                                                {item.variants.length < 6 ? (
                                                    <Button
                                                        onClick={() => handleStock(item._id)}
                                                        variant="dark"
                                                        className="ms-3"
                                                    >
                                                        Trở lại kho
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => handleShow(item._id)}
                                                        variant="dark"
                                                        className="ms-3"
                                                    >
                                                        Huỷ đơn
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td>{item.variants[item.variants.length - 1].note}</td>
                                </tr>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </tbody>
                </Table>
                <ModalSelect
                    show={show}
                    text="Bạn có chắc muốn hủy đơn hàng này"
                    accept="Hủy đơn"
                    cancel="Thoát"
                    handleAction={handleCancel}
                    handleClose={handleClose}
                />
                {idNote !== null && <NoteModal show={showNote} handleClose={handleCloseStock} handleSave={handleSave} />}
            </Col>
        </Row>
    );
};

export default ShipperHandle;
