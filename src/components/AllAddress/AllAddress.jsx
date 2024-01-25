import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { getAllByUser } from '~/services/AddressService';
import UpdateAdress from '../UpdateAddress/UpdateAddress';
import AddAdress from '../AddAddress/AddAddress';

const AllAddress = ({ idSelect, show, handleCloseAll }) => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const [allAdress, setAllAddress] = useState(null);

    const [showUpdate, setShowUpdate] = useState(false);
    const [idShow, setIdShow] = useState(null);

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = (id) => {
        setShowUpdate(true);
        setIdShow(id);
        handleCloseAll();
    };

    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => {
        setShowAdd(false);
    };
    const handleShowAdd = () => {
        setShowAdd(true);
        handleCloseAll();
    };

    const [select, setSelect] = useState(null);

    const handleSelect = (id) => {
        setSelect(id);
        console.log(select);
    };

    useEffect(() => {
        const fetchAll = async () => {
            const data = await getAllByUser(axiosJWT, user?.accessToken, user?.data.id);
            setAllAddress(data);
            const main = data.find((item) => item.main === true);
            if (select === null) {
                setSelect(main._id);
            }
        };
        fetchAll();
    }, [handleCloseUpdate, handleCloseAdd]);

    // console.log(showAdd)

    const handleSubmit = (e) => {
        e.preventDefault();
        idSelect(select);
    };

    return (
        <div>
            <Modal centered backdrop="static" show={show}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title>Địa chỉ của tôi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ height: '70vh', overflowY: 'auto' }}>
                        {allAdress !== null ? (
                            allAdress.map((item, index) => (
                                <p>
                                    <Form.Check
                                        inline
                                        id={index + 1}
                                        name="radio"
                                        type="radio"
                                        onChange={() => handleSelect(item._id)}
                                        checked={select === item._id}
                                        label={
                                            <p>
                                                {item.name}, {item.phone} <br />
                                                {item.address}, {item.ward}
                                                <br /> {item.district}, {item.province}
                                                {item.main === true && <p className="ms-3 text-danger">Mặc định</p>}
                                            </p>
                                        }
                                    />
                                    <a href="#" onClick={() => handleShowUpdate(item._id)} className="float-end">
                                        Cập nhật
                                    </a>
                                    <hr />
                                </p>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}

                        <Button
                            className="px-4 rounded-0"
                            style={{ backgroundColor: 'var(--font-color)', border: 'none' }}
                            onClick={() => handleShowAdd()}
                        >
                            Thêm địa chỉ
                        </Button>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            className="rounded-0 px-4"
                            style={{ backgroundColor: 'var(--primary-color)', border: 'none' }}
                            type="submit"
                            onClick={handleCloseAll}
                        >
                            Huỷ
                        </Button>
                        <Button
                            className="px-4 rounded-0"
                            style={{ backgroundColor: 'var(--font-color)', border: 'none' }}
                            onClick={handleCloseAll}
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {idShow && <UpdateAdress id={idShow} show={showUpdate} handleClose={handleCloseUpdate} />}
            <AddAdress show={showAdd} handleClose={handleCloseAdd} />
        </div>
    );
};

export default AllAddress;
