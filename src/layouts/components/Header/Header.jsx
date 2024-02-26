import React, { useEffect, useState } from 'react';
import logo from '~/assets/images/logo3.png';
import { Container, Row, Col, Navbar, Nav, Dropdown } from 'react-bootstrap';
import Search from '../Search/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/apiRequest';
import { createAxios } from '~/createInstance';
import { removeSearch, searchProducts } from '~/redux/productSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCaretDown, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    // localStorage.removeItem('user');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login.currentUser);

    const length = useSelector((state) => state.cart.cartItems.length);

    let axiosJWT = createAxios(user, dispatch);

    const handleLogout = () => {
        logout(dispatch, user?.accessToken, axiosJWT);
    };

    const [search, setSearch] = useState('');
    const searchInput = (e) => {
        setSearch(e.target.value);
    };
    // console.log(search)
    const handleSearch = (e) => {
        e.preventDefault();
        // dispatch(searchProducts(search));
        navigate(`/search?query=${search}`);
        // setSearch('')
        // dispatch(removeSearch());
    };

    const deleteSearch = () => {
        setSearch('');
    };

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    };

    const handleHide = () => {
        setShow(false);
    };

    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <Container fluid className="py-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                <div>
                    <Row className='px-3'>
                        <Col md="1">
                            <Link to={'/'}>
                                <img src={logo} style={{ height: '45px' }} alt="" />
                            </Link>
                        </Col>
                        <Col md="6">
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
                        <Col md="5">
                            <Row className='float-end me-3'>
                                <Search
                                    color="white"
                                    search={search}
                                    searchInput={searchInput}
                                    handleSearch={handleSearch}
                                    deleteSearch={deleteSearch}
                                />
                                <Col xs="auto" className="d-flex align-items-center mt-3" style={{ color: 'white' }}>
                                    {user === null ? (
                                        <Link to={`/signin`} className="text-decoration-none text-white">
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
                                            <a
                                                href="javascript:void(0)"
                                                className="list-user text-white text-decoration-none"
                                                style={{ display: 'flex', alignItems: 'center' }}
                                                onMouseOver={handleShow}
                                                onMouseOut={handleHide}
                                            >
                                                <ion-icon
                                                    name="person-outline"
                                                    size="small"
                                                    style={{ marginRight: '4px' }}
                                                ></ion-icon>
                                                {user?.data.username}
                                                <FontAwesomeIcon icon={faChevronDown} className="ms-2" />
                                            </a>
                                            {show && (
                                                <div
                                                    onMouseOver={handleShow}
                                                    onMouseOut={handleHide}
                                                    style={{
                                                        position: 'absolute',
                                                        zIndex: '100',
                                                    }}
                                                >
                                                    <ul
                                                        style={{
                                                            backgroundColor: 'white',
                                                            listStyle: 'none',
                                                        }}
                                                        className="p-3 mt-2 shadow"
                                                    >
                                                        <li className="mb-2">
                                                            <Link
                                                                to={`/myorder/${user.data.id}`}
                                                                className="text-black text-decoration-none"
                                                            >
                                                                Đơn hàng của bạn
                                                            </Link>
                                                        </li>
                                                        {user.data.isAdmin && (
                                                            <li className="mb-2">
                                                                <Link
                                                                    to={'/admin'}
                                                                    className="text-black text-decoration-none"
                                                                >
                                                                    Quản lý
                                                                </Link>
                                                            </li>
                                                        )}
                                                        <li>
                                                            <FontAwesomeIcon
                                                                icon={faArrowRightFromBracket}
                                                                color="black"
                                                            />
                                                            <a
                                                                href="javascript:void(0)"
                                                                onClick={handleLogout}
                                                                className="ms-1 text-black text-decoration-none"
                                                            >
                                                                Đăng xuất
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Col>
                                <Col xs="auto" className="d-flex align-items-center mt-3" style={{ color: 'white' }}>
                                    <Link to={'/cart'} className="text-decoration-none text-white">
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <ion-icon
                                                name="bag-handle-outline"
                                                size="small"
                                                style={{ marginRight: '5px' }}
                                            ></ion-icon>
                                            <span
                                                className="position-absolute translate-middle badge rounded-pill bg-danger"
                                                style={{ marginLeft: '18px' }}
                                            >
                                                {length}
                                            </span>{' '}
                                            Giỏ Hàng
                                        </span>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Header;
