import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { allOrderConfirm, allOrderTransport, updateStatus } from '~/services/OrderService';
import ShipDetail from '../ShipDetail/ShipDetail';
import { useSelector } from 'react-redux';
import NoteModal from '../NoteModal/NoteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShipperHandle = ({ statusOrder }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [detail, setDetail] = useState(null);
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const data1 = await allOrderTransport()
            const data2 = await allOrderConfirm()
            if (statusOrder === 'prepare') {
                setOrders(data1)
            }
            if (statusOrder === 'confirm') {
                setOrders(data2)
            }
        }
        fetch()
    }, [orders])

    const handleDetail = (data) => {
        setDetail(data);
    };

    const handleClick = async (id, status) => {
        const data = {
            status: status.toString(),
            shipper: user.data.id,
        };
        await updateStatus(id, data);
    };

    const [show, setShow] = useState(false)

    const [idNote, setIdNote] = useState(null)

    
    const handleClose = () => setShow(false)
    
    const handleStock = (id) => {
        setShow(true)
        setIdNote(id)
    }
    
    const handleSave = async (text) => {
        // console.log(text)
        const data = {
            status: 'Chưa hoàn thành',
            shipper: user.data.id,
            note: text 
        };
        await updateStatus(idNote, data);
        setIdNote(null)
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
    }

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
                        </tr>
                    </thead>
                    <tbody>
                        {orders !== null ? (
                            orders.map((item, index) => (
                                <tr
                                    key={item.data._id}
                                    onClick={() => handleDetail(item)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{index + 1}</td>
                                    <td>{item.data._id}</td>
                                    <td>
                                        {item.ship.phone}, {item.ship.address}, {item.ship.ward}, {item.ship.district},{' '}
                                        {item.ship.province}
                                    </td>
                                    <td>{item.data.total.toLocaleString('it-IT')}đ</td>
                                    <td>
                                        {item.data.variants[item.data.variants.length - 1].status ===
                                        'Đang vận chuyển' ? (
                                            <Button
                                                onClick={() => handleClick(item.data._id, 'Giao hàng')}
                                                variant="dark"
                                            >
                                                Nhập đơn giao
                                            </Button>
                                        ) : (
                                            <div className='d-flex'>
                                                <Button
                                                    onClick={() => handleClick(item.data._id, 'Đã giao')}
                                                    variant="dark"
                                                >
                                                    Đã giao
                                                </Button>
                                                <Button
                                                    onClick={() => handleStock(item.data._id)}
                                                    variant="dark"
                                                    className='ms-3'
                                                >
                                                    Trở lại kho
                                                </Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </tbody>
                </Table>
                {idNote !== null && <NoteModal show={show} handleClose={handleClose} handleSave={handleSave} />}
            </Col>
            {/* <Col>{detail?.data.status === 'Đang vận chuyển' ? <ShipDetail order={detail} /> : <p></p>}</Col> */}
        </Row>
    );
};

export default ShipperHandle;
