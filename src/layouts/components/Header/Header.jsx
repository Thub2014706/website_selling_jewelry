import React, { useEffect, useState } from 'react';
import logo from '~/assets/images/logo3.png';
import { Container, Row, Col, Navbar, Nav, Dropdown } from 'react-bootstrap';
import Search from '../Search/Search';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/apiRequest';

import { removeSearch, searchProducts } from '~/redux/productSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCaretDown, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { allType, typeByFather } from '~/services/ProductService';
import green from '~/assets/images/green.jpg';
import watch from '~/assets/images/watch.jpg';
import jewery from '~/assets/images/jewerynav.jpg';

const Header = () => {
    // localStorage.removeItem('user');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login.currentUser);

    const length = useSelector((state) => state.cart.cartItems.length);

    // let axiosJWT = createAxios(user, dispatch);

    const handleLogout = () => {
        logout(dispatch, user?.accessToken);
    };

    const [search, setSearch] = useState('');
    const searchInput = (e) => {
        setSearch(e.target.value);
    };
    // console.log(search)
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${search}`);
        // setSearch('')
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

    const [types, setTypes] = useState(null);

    const [dataShow, setDataShow] = useState(null);

    const [showNav, setShowNav] = useState(false);

    const handleShowNav = async (name) => {
        const data = await typeByFather(name);
        setDataShow(data);
        setShowNav(true);
    };

    const handleHideNav = () => {
        setDataShow(null);
        setShowNav(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await allType();
            setTypes(data);
        };
        fetchData();
    }, [user]);
    // console.log('uuu', user);

    const [select, setSelect] = useState('');
    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <Container fluid style={{ backgroundColor: 'var(--primary-color)' }}>
                <div>
                    <Row className="px-3">
                        <Col md="1">
                            <Link
                                to={'/'}
                                onClick={() => {
                                    setSelect('');
                                    setSearch('');
                                }}
                            >
                                <img src={logo} style={{ height: '45px', marginTop: '3px' }} alt="" />
                            </Link>
                        </Col>
                        <Col md="6">
                            {types !== null && (
                                <ul style={{ display: 'flex', height: '100%' }}>
                                    {types.map(
                                        (item) =>
                                            item.father === null && (
                                                <li
                                                    onMouseEnter={() => {
                                                        handleShowNav(item.name);
                                                    }}
                                                    onMouseLeave={() => handleHideNav()}
                                                    style={{ alignItems: 'center' }}
                                                    key={item._id}
                                                    className="text-white px-4 nav"
                                                >
                                                    {item.name.toUpperCase()}
                                                    <FontAwesomeIcon icon={faChevronDown} className="ms-2" />
                                                </li>
                                            ),
                                    )}
                                </ul>
                            )}
                        </Col>
                        <Col md="5">
                            <Row className="float-end me-3">
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
                                                onMouseEnter={handleShow}
                                                onMouseLeave={handleHide}
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
                                                    onMouseEnter={handleShow}
                                                    onMouseLeave={handleHide}
                                                    style={{
                                                        position: 'absolute',
                                                        zIndex: '10000',
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
                                                                to={`/myorder`}
                                                                className="text-black text-decoration-none"
                                                            >
                                                                Đơn hàng của bạn
                                                            </Link>
                                                        </li>
                                                        <li className="mb-2">
                                                            <Link
                                                                to={`/myaddress`}
                                                                className="text-black text-decoration-none"
                                                            >
                                                                Địa chỉ của bạn
                                                            </Link>
                                                        </li>
                                                        <li className="mb-2">
                                                            <Link
                                                                to={`/wishlist`}
                                                                className="text-black text-decoration-none"
                                                            >
                                                                Danh sách yêu thích
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
            {showNav && dataShow !== null && (
                <Container
                    fluid
                    className="w-100"
                    onMouseEnter={() => handleShowNav(dataShow[0]?.father)}
                    onMouseLeave={() => handleHideNav()}
                    style={{
                        display: 'block',
                        position: 'absolute',
                        left: 0,
                        zIndex: 1000,
                        backgroundColor: 'var(--primary-color)',
                    }}
                >
                    <Row className="py-4">
                        <Col md={{ span: 2, offset: 3 }}>
                            <h5 className="text-white">Danh mục</h5>
                            <ul style={{ listStyle: 'none' }}>
                                {dataShow.map((item) => (
                                    <Link
                                        key={item._id}
                                        to={`/${item.name}`}
                                        className="text-decoration-none"
                                        onClick={() => setSelect(item.name)}
                                    >
                                        <li
                                            key={item._id}
                                            className="dropdown-nav py-2"
                                            style={{ color: select === item.name ? 'var(--font-color)' : '' }}
                                        >
                                            {item.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </Col>
                        <Col md={3}>
                            {dataShow[0]?.father === 'Phụ kiện' && (
                                <img src={green} style={{ height: '200px' }} alt="" />
                            )}
                            {dataShow[0]?.father === 'Đồng hồ' && (
                                <img src={watch} style={{ height: '200px' }} alt="" />
                            )}
                            {dataShow[0]?.father === 'Trang sức' && (
                                <img src={jewery} style={{ height: '200px' }} alt="" />
                            )}
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default Header;
