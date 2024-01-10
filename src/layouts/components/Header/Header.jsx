import React, { useState } from 'react';
import logo from '~/assets/images/logo3.png';
import { Container, Row, Col, Navbar, Nav, Badge, Button, Dropdown, NavDropdown } from 'react-bootstrap';
import Search from '../Search/Search';
import TextStatus from '../TextStatus/TextStatus';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '~/redux/authSlice';
import { logout } from '~/redux/apiRequest';
import userImg from '~/assets/images/person-outline.svg'

const Header = () => {
    // localStorage.removeItem('user');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);

    console.log(user);
    const length = useSelector((state) => state.cart.cartItems.length);

    const handleLogout = () => {
        logout(dispatch, user?.accessToken);
    };
    return (
        <div>
            <TextStatus />
            <Container fluid className="p-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                <Container>
                    <Row>
                        <Col md="1">
                            <Link to={'/'}>
                                <img src={logo} style={{ height: '50px' }} alt="" />
                            </Link>
                        </Col>
                        <Col md="7">
                            <Navbar sticky="top" expand="lg" className="text-white">
                                <Navbar.Collapse>
                                    <Nav className="ms-4">
                                        <Nav.Link className="text-white me-5 nav" href="#">
                                            TRANG SỨC
                                        </Nav.Link>
                                        <Nav.Link className="text-white me-5 nav" href="#">
                                            TRANG SỨC CƯỚI
                                        </Nav.Link>
                                        <Nav.Link className="text-white me-5 nav" href="#">
                                            ĐỒNG HỒ
                                        </Nav.Link>
                                        <Nav.Link className="text-white me-5 nav" href="#">
                                            QUÀ TẶNG
                                        </Nav.Link>
                                        {/* <Nav.Link className="text-white me-5" href="#">PHỤ KIỆN</Nav.Link> */}
                                        <Nav.Link className="text-white me-5 nav" href="#">
                                            BLOG
                                        </Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                        <Col md="4">
                            <Row>
                                <Search />
                                <Col xs="auto" className="d-flex align-items-center mt-3" style={{ color: 'white' }}>
                                    {/* <Link to={'/signin'} className="text-decoration-none text-white">
                                        <ion-icon
                                            name="person-outline"
                                            size="small"
                                            style={{ marginRight: '5px' }}
                                        ></ion-icon>{' '}
                                    </Link> */}
                                    {user === null ? (
                                        <Link to={'/signin'} className="text-decoration-none text-white">
                                            {/* <img src={userImg} style={{width: '20px'}} alt="" />{' '} */}
                                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                                <ion-icon
                                                    name="person-outline"
                                                    size="small"
                                                    style={{ marginRight: '4px' }}
                                                ></ion-icon>
                                                Tài Khoản
                                            </span>
                                        </Link>
                                    ) : (
                                        <div>
                                            <Dropdown>
                                                
                                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                                        <ion-icon
                                                            name="person-outline"
                                                            size="small"
                                                            style={{ marginRight: '4px' }}
                                                        ></ion-icon>{' '}
                                                        {user.data.username}
                                                    </span>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    )}
                                </Col>
                                {/* <Col>
                                    <Button onClick={handleLogout}>Đăng xuất</Button>
                                </Col> */}
                                <Col xs="auto" className="d-flex align-items-center mt-3" style={{ color: 'white' }}>
                                    <Link to={'/cart'} className="text-decoration-none text-white">
                                        <ion-icon
                                            name="bag-handle-outline"
                                            size="small"
                                            // style={{ marginRight: '5px' }}
                                        ></ion-icon>
                                        <span class="position-absolute translate-middle badge rounded-pill bg-danger">
                                            {length}
                                        </span>{' '}
                                    </Link>
                                    <Link to={'/cart'} className="text-decoration-none text-white ms-2">
                                        Giỏ Hàng
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
};

export default Header;
