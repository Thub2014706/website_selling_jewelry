import axios from 'axios';
import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '~/redux/apiRequest';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preData) => ({
            ...preData,
            [name]: value,
        }));
        // console.log('ds', data);
    };
    const submitLogin = async (e) => {
        e.preventDefault();
        // try {
        //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signin`, data);
        //     console.log(response);
        //     localStorage.setItem('user', JSON.stringify(response.data));
        //     navigate('/');
        // } catch (error) {
        //     console.log(error);
        //     if (error.response) {
        //         toast(error.response.data.message, {
        //             position: 'top-center',
        //             autoClose: 2000,
        //             type: 'error',
        //             hideProgressBar: true,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: 'light',
        //         });
        //     } else {
        //         console.log('Lỗi mạng');
        //         alert('Lỗi mạng');
        //     }
        // }
        loginUser(data, dispatch, navigate, toast);
    };
    // console.log(`${process.env.REACT_APP_API_URL}`);
    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
            <ToastContainer />
            <Card className="py-4 px-3" style={{ width: '25%' }}>
                <Card.Body>
                    <h4 className="text-center" style={{ color: 'var(--primary-color)' }}>
                        ĐĂNG NHẬP
                    </h4>
                    <Form onSubmit={submitLogin}>
                        <Form.Control
                            className="mt-5"
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
                        <Button
                            type="submit"
                            className="mt-5"
                            style={{ width: '100%', backgroundColor: 'var(--primary-color)', border: 'none' }}
                            // onClick={submitLogin}
                        >
                            Đăng nhập
                        </Button>
                    </Form>
                    <p className="mt-3">
                        Bạn chưa có tài khoản? <Link to={'/signup'}>Đăng ký ngay</Link>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;
