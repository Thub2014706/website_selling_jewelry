import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preData) => ({
            ...preData,
            [name]: value,
        }));
    };

    const submitRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signup`, data);
            console.log(response);
            toast('Đăng ký thành công', {
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
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast(error.response.data.message, {
                    position: 'top-center',
                    autoClose: 2000,
                    type: 'error',
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            } else {
                alert('Lỗi mạng');
            }
        }
    };
    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
            <ToastContainer />
            <Card className="py-4 px-3" style={{ width: '25%' }}>
                <Card.Body>
                    <h4 className="text-center" style={{ color: 'var(--primary-color)' }}>
                        ĐĂNG KÝ
                    </h4>
                    <Form onSubmit={submitRegister}>
                        <Form.Control
                            className="mt-5"
                            type="text"
                            name="username"
                            value={data.username}
                            placeholder="Nhập tên"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control
                            className="mt-3"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Nhập email"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control
                            className="mt-3"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Nhập mật khẩu"
                            required
                            onChange={handleChange}
                        />
                        <Form.Control
                            className="mt-3"
                            type="password"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            placeholder="Nhập lại mật khẩu"
                            required
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            className="mt-5"
                            style={{ width: '100%', backgroundColor: 'var(--primary-color)', border: 'none' }}
                        >
                            Đăng ký
                        </Button>
                    </Form>
                    {/* <p className="mt-3">
                        Bạn chưa có tài khoản? <a href="">Đăng ký ngay</a>
                    </p> */}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RegisterPage;
