import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    };

    const submitLogin = (e) => {
        e.preventDefault();
        loginUser(data, dispatch, navigate, toast);
    };

    const [eye, setEye] = useState(false);

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center background">
            <ToastContainer />
            <Card className="py-4 px-3 card-login">
                <Card.Body>
                    <h4 className="text-center" style={{ color: 'white' }}>
                        ĐĂNG NHẬP
                    </h4>
                    <Form onSubmit={submitLogin}>
                        <Form.Group className="input-group-login">
                            <Form.Control
                                className="mt-5 input-login"
                                type="email"
                                name="email"
                                value={data.email}
                                placeholder="Nhập email"
                                required
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon className="icon-login" icon={faEnvelope} />
                        </Form.Group>
                        <Form.Group className="input-group-login">
                            <Form.Control
                                className="mt-3 input-login"
                                type={!eye ? 'password' : 'text'}
                                name="password"
                                value={data.password}
                                placeholder="Nhập mật khẩu"
                                required
                                onChange={handleChange}
                            />
                            {data.password !== '' ? (
                                !eye ? (
                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer' }}
                                        className="icon-login"
                                        onClick={() => setEye(true)}
                                        icon={faEye}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer' }}
                                        className="icon-login"
                                        onClick={() => setEye(false)}
                                        icon={faEyeSlash}
                                    />
                                )
                            ) : (
                                <FontAwesomeIcon className="icon-login" icon={faLock} />
                            )}
                        </Form.Group>
                        <Button
                            type="submit"
                            className="mt-5"
                            style={{
                                width: '100%',
                                color: 'black',
                                backgroundColor: 'white',
                                border: 'none',
                                borderRadius: '40px',
                                height: '40px',
                            }}
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
