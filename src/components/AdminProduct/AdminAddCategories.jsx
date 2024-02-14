import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAxios } from '~/createInstance';
import { allType, createType } from '~/services/ProductService';

const AdminAddCategories = ({ show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const [types, setTypes] = useState(null);

    const [name, setName] = useState('');

    const [father, setFather] = useState('');

    useEffect(() => {
        const fetchTypes = async () => {
            const data = await allType(user?.accessToken, axiosJWT);
            setTypes(data);
        };
        fetchTypes();
    }, [user?.accessToken, axiosJWT]);

    const handleFather = (e) => {
        setFather(e.target.value);
    };

    const data = {
        name,
        father,
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        await createType(data, user?.accessToken, axiosJWT, toast);
    };

    return (
        <div>
            <Modal show={show} centered onHide={handleClose}>
                <ToastContainer />
                <Form onSubmit={handleAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm phân loại</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nhập tên phân loại mới"
                            />
                        </Form.Group>
                        <Form.Select
                            className="mb-3"
                            name="father"
                            value={father}
                            onChange={handleFather}
                            aria-label="Default select example"
                        >
                            <option value="">---Chọn phân loại cha---</option>
                            {types !== null && types.map((item) => <option value={item.name}>{item.name}</option>)}
                        </Form.Select>
                        {/* <Button variant="primary" onClick={handleAdd}>Thêm phân loại</Button> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="rounded-0 px-4" variant="outline-dark" onClick={handleClose}>
                            Huỷ
                        </Button>
                        <Button
                            className="px-4 rounded-0"
                            style={{ backgroundColor: 'var(--font-color)', border: 'none' }}
                            onClick={handleClose}
                            type="submit"
                        >
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminAddCategories;
