import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { getAllAddress } from '~/services/AddressService';
import { allOrder, orderDetail } from '~/services/OrderService';
import OrderDetail from '../OrderDetail/OrderDetail';
import TimeFormat from '../TimeFormat/TimeFormat';

const AdminOrder = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    // let axiosJWT = createAxios(user, dispatch);

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const dataOrder = await allOrder(user?.accessToken);
            setOrders(dataOrder);
        };
        fetch();
    }, []);

    const [show, setShow] = useState(false);

    const [orderShow, setOrderShow] = useState(null);

    const handleShow = async (idItem) => {
        console.log(idItem);
        setShow(true);
        const data = await orderDetail(idItem, user?.accessToken);
        setOrderShow(data);
    };

    const handleClose = () => setShow(false);

    return (
        <div>
            {orders !== null ? (
                <Table bordered striped>
                    <thead>
                        <tr className="text-center">
                            <th>STT</th>
                            <th>ID đơn hàng</th>
                            <th>Tên người nhận</th>
                            <th>Địa chỉ</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tổng đơn</th>
                            <th>Trạng thái</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, index) => {
                            return (
                                <tr className="text-center" key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.data._id}</td>
                                    <td>{item.ship.name}</td>
                                    <td>
                                        {item.ship.address}, {item.ship.ward}, {item.ship.district},{' '}
                                        {item.ship.province}
                                    </td>
                                    <td>
                                        <TimeFormat time={item.data.createdAt} />
                                    </td>
                                    <td>
                                        {item.data.total.toLocaleString('it-IT')}
                                        <span>&#8363;</span>
                                    </td>
                                    <td>{item.data.variants.status}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            onClick={() => handleShow(item.data._id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <p>Loading...</p>
            )}
            {orderShow && <OrderDetail show={show} handleClose={handleClose} orderShow={orderShow} />}
        </div>
    );
};

export default AdminOrder;
