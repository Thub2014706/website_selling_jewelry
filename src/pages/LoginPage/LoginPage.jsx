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
    const submitLogin = (e) => {
        e.preventDefault();
        loginUser(data, dispatch, navigate, toast);
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center background">
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
