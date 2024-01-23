import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { getAllByUser } from '~/services/AddressService';
import ModalUpdateAdress from '../ModalUpdateAddress/ModalUpdateAddress';

const ModalAllAddress = ({ show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const [allAdress, setAllAddress] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            const data = await getAllByUser(axiosJWT, user?.accessToken, user?.data.id);
            setAllAddress(data);
        };
        fetchAll();
    }, []);

    const [inShow, setInShow] = useState(false);

    const handleInClose = () => setInShow(false);
    const handleShow = () => {
        setInShow(true);
        show=false
    };
    // console.log()

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Địa chỉ của tôi</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-5">
                <Table>
                    <tbody>
                        {allAdress !== null &&
                            allAdress.map((item) => (
                                <tr>
                                    <td>
                                        SĐT {item.phone} <br />
                                        {item.address} <br />
                                        {item.ward}, {item.district}, {item.province}
                                        {item.main === true && <p className="text-danger">Mặc định</p>}
                                    </td>
                                    <td>
                                        <a href="#" onClick={handleShow} className="ms-2">
                                            Thay đổi
                                        </a>
                                        <ModalUpdateAdress id={item._id} show={inShow} handleClose={handleInClose} />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAllAddress;
