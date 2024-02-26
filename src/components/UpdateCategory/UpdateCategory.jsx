import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { allType, typeDetail, updateType } from '~/services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Modal } from 'react-bootstrap';

const UpdateCategory = ({ id, show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const [types, setTypes] = useState(null);

    // const [type, setType] = useState(null);

    const [name, setName] = useState('');

    const [father, setFather] = useState('');

    useEffect(() => {
        const fetchTypes = async () => {
            const dataUpdate = await typeDetail(id, axiosJWT, user?.accessToken);
            const dataAll = await allType();
            setTypes(dataAll);
            setName(dataUpdate.name);
            setFather(dataUpdate.father);
        };
        fetchTypes();
    }, [id, show]);
    // console.log(father)

    const handleFather = (e) => {
        setFather(e.target.value);
    };

    const data = {
        name,
        father,
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateType(user?.accessToken, toast, data, axiosJWT, id);
    };

    return (
        <div>
            <Modal show={show} centered onHide={handleClose}>
                <ToastContainer />
                <Form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cập nhật phân loại</Modal.Title>
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
                            value={father}
                            onChange={handleFather}
                            aria-label="Default select example"
                        >
                            <option value="">---Chọn phân loại cha---</option>
                            {types !== null &&
                                types.map(
                                    (item) => item.name !== name && <option value={item.name}>{item.name}</option>,
                                )}
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
                            Cập nhật
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default UpdateCategory;
