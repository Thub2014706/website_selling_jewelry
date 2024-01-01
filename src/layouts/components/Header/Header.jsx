import React, { useState } from 'react';
import logo from '~/assets/images/logo3.png';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Search from '../Search/Search';
import TextStatus from '../TextStatus/TextStatus';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const Header = () => {
    // localStorage.removeItem('user');
    const [userInfo, setUserInfo] = useState(null)
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData) {
        const accessToken = userData['accessToken']
        const dataFromAccess = jwtDecode(accessToken)
        const idUser = dataFromAccess.id
        const Account = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/detail-account/${idUser}`, {
                    headers: {
                        authorization: `Beaer ${accessToken}`
                    }
                })
                // console.log(response.data)
                setUserInfo(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        Account()   

    }
    const refreshToken = userData?.['refreshToken']
    const getNewAccessToken = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/refresh-token`, refreshToken)
            console.log('jhgfd', response)
        } catch (error) {
            console.log(error)
        }
    }

    getNewAccessToken()
    // if ()

    return (
        <div>
            <TextStatus />
            <Container fluid className="p-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                <Container>
                    <Row>
                        <Col md="1">
                            <img src={logo} style={{ height: '50px' }} alt="" />
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
                                    <Link to={'/signin'} className="text-decoration-none text-white">
                                        <ion-icon
                                            name="person-outline"
                                            size="small"
                                            style={{ marginRight: '5px' }}
                                        ></ion-icon>{' '}
                                    </Link>
                                    {userInfo !== null ? (userInfo.username) : (

                                    <Link to={'/signin'} className="text-decoration-none text-white">
                                        Tài Khoản
                                    </Link>
                                    )}
                                </Col>
                                <Col xs="auto" className="d-flex align-items-center mt-3" style={{ color: 'white' }}>
                                    <ion-icon
                                        name="bag-handle-outline"
                                        size="small"
                                        style={{ marginRight: '5px' }}
                                    ></ion-icon>{' '}
                                    Giỏ Hàng
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
