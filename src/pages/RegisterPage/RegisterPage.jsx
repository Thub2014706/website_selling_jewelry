import { faEnvelope, faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '~/redux/apiRequest';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        registerUser(data, dispatch, navigate, toast);
    };

    const [eye1, setEye1] = useState(false);
    const [eye2, setEye2] = useState(false);

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center background">
            <ToastContainer />
            <Card className="py-4 px-3 card-login">
                <Card.Body>
                    <h4 className="text-center" style={{ color: 'white' }}>
                        ĐĂNG KÝ
                    </h4>
                    <Form onSubmit={submitRegister}>
                        <Form.Group className="input-group-login">
                            <Form.Control
                                className="mt-5 input-login"
                                type="text"
                                name="username"
                                value={data.username}
                                placeholder="Nhập tên"
                                required
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon className="icon-login" icon={faUser} />
                        </Form.Group>
                        <Form.Group className="input-group-login">
                            <Form.Control
                                className="mt-3 input-login"
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
                                type={!eye1 ? 'password' : 'text'}
                                name="password"
                                value={data.password}
                                placeholder="Nhập mật khẩu"
                                required
                                onChange={handleChange}
                            />
                            {data.password !== '' ? (
                                !eye1 ? (
                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer' }}
                                        className="icon-login"
                                        onClick={() => setEye1(true)}
                                        icon={faEye}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer' }}
                                        className="icon-login"
                                        onClick={() => setEye1(false)}
                                        icon={faEyeSlash}
                                    />
                                )
                            ) : (
                                <FontAwesomeIcon className="icon-login" icon={faLock} />
                            )}
                        </Form.Group>
                        <Form.Group className="input-group-login">
                            <Form.Control
                                className="mt-3 input-login"
                                type={!eye2 ? 'password' : 'text'}
                                name="confirmPassword"
                                value={data.confirmPassword}
                                placeholder="Nhập lại mật khẩu"
                                required
                                onChange={handleChange}
                            />
                            {data.confirmPassword !== '' ? (
                                !eye2 ? (
                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer' }}
                                        className="icon-login"
                                        onClick={() => setEye2(true)}
                                        icon={faEye}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer' }}
                                        className="icon-login"
                                        onClick={() => setEye2(false)}
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
                            Đăng ký
                        </Button>
                    </Form>
                    <p className="mt-3">
                        Bạn đã có tài khoản? <Link to="/signin">Đăng nhập ngay</Link>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default RegisterPage;
