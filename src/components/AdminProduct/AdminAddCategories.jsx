import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAxios } from '~/createInstance';
import { allType, createType } from '~/services/ProductService';

const AdminAddCategories = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    
    const axiosJWT = createAxios(user, dispatch);

    const [types, setTypes] = useState(null);

    const [name, setname] = useState('')

    const [father, setFather] = useState('')

    useEffect(() => {
        const fetchTypes = async () => {
            const data = await allType(user?.accessToken, axiosJWT);
            setTypes(data);
        };
        fetchTypes();
    }, []);

    const handleFather = (e) => {
        setFather(e.target.value)
    }
    
    const data = {
        name,
        father
    }

    const handleAdd = () => {
        createType(data, user?.accessToken, axiosJWT, toast)
    }

    return (
        <div>
            <ToastContainer />
            <Card className="w-50">
                <Card.Body>
                    <Card.Title>Thêm phân loại</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {/* <Form.Label>Ph</Form.Label> */}
                            <Form.Control type="email" value={name} onChange={(e) => setname(e.target.value)} placeholder="Nhập tên phân loại mới" />
                        </Form.Group>
                        <Form.Select className="mb-3" onChange={handleFather} aria-label="Default select example">
                            <option value=''>---Chọn phân loại cha---</option>
                            {types !== null && types.map((item) => <option value={item.name}>{item.name}</option>)}
                        </Form.Select>
                    </Form>
                    <Button variant="primary" onClick={handleAdd}>Thêm phân loại</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminAddCategories;
