import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { getAllAddress } from '~/services/AddressService';
import { allOrder, orderDetail } from '~/services/OrderService';
import OrderDetail from '../OrderDetail/OrderDetail';

const AdminOrder = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch);

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
    }, []);

    const [show, setShow] = useState(false);

    const [orderShow, setOrderShow] = useState(null);

    const [idShipping, setIdShipping] = useState(null);
    const handleShow = async (idItem, idShip) => {
        setIdShipping(idShip)
        setShow(true);
        const data = await orderDetail(axiosJWT, idItem, user?.accessToken);
        setOrderShow(data);
    };

    const handleClose = () => setShow(false);


    return (
        <div>
            {orders !== null && addresses !== null ? (
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
                            let idAddress = addresses.find((val) => val._id === item.shipping);
                            return (
                                <tr className="text-center" key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item._id}</td>
                                    <td>{idAddress.name}</td>
                                    <td>
                                        {idAddress.address}, {idAddress.ward}, {idAddress.district},{' '}
                                        {idAddress.province}
                                    </td>
                                    <td>{item.createdAt}</td>
                                    <td>
                                        {item.total.toLocaleString('it-IT')}
                                        <span>&#8363;</span>
                                    </td>
                                    <td>{item.status}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faEye} onClick={() => handleShow(item._id, idAddress)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <p>Loading...</p>
            )}
            {orderShow && (
                <OrderDetail show={show} handleClose={handleClose} orderShow={orderShow} shipping={idShipping} />
            )}
        </div>
    );
};

export default AdminOrder;
