import { faChartPie, faChevronDown, faChevronUp, faClipboard, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Container, Dropdown, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '~/assets/images/logo3.png';
import AdminCategory from '~/components/AdminCategory/AdminCategory';
import AdminOrder from '~/components/AdminOrder/AdminOrder';
import AdminAllProduct from '~/components/AdminProduct/AdminAllProduct';
import AllUser from '~/components/AllUser/AllUser';
import HandleOrder from '~/components/HandleOrder/HandleOrder';
import ListMenu from '~/components/ListMenu/ListMenu';
import MenuSelect from '~/components/MenuSelect/MenuSelect';

const AdminPage = () => {
    const [showPage, setShowPage] = useState('');

    const Pages = () => {
        if (showPage === 'allUser') {
            return <AllUser />;
        } else if (showPage === 'allProduct') {
            return <AdminAllProduct />;
        } else if (showPage === 'allOrder') {
            return <AdminOrder />;
        } else if (showPage === 'categories') {
            return <AdminCategory />;
        } else if (showPage === 'handleOrder') {
            return <HandleOrder />;
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col sm={2} className="min-vh-100 py-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <Link to={'/'}>
                        <img src={logo} className="mx-auto d-block mb-4" style={{ height: '50px' }} alt="" />
                    </Link>

                    {/* Quản lý */}
                    <ListMenu title="Quản lý" icon={faClipboard}>
                        <li
                            className="menu mb-1 px-3 py-2 rounded"
                            style={{ backgroundColor: showPage === 'allUser' ? 'var(--list-menu)' : '' }}
                        >
                            <a
                                className="text-decoration-none text-white"
                                href="javascript:void(0)"
                                onClick={() => setShowPage('allUser')}
                            >
                                Người dùng
                            </a>
                        </li>
                        <li
                            className="menu mb-1 px-3 py-2 rounded"
                            style={{ backgroundColor: showPage === 'allProduct' ? 'var(--list-menu)' : '' }}
                        >
                            <a
                                className="text-decoration-none text-white"
                                href="javascript:void(0)"
                                onClick={() => setShowPage('allProduct')}
                            >
                                Sản phẩm
                            </a>
                        </li>
                        <li
                            className="menu mb-1 px-3 py-2 rounded"
                            style={{ backgroundColor: showPage === 'allOrder' ? 'var(--list-menu)' : '' }}
                        >
                            <a
                                className="text-decoration-none text-white"
                                href="javascript:void(0)"
                                onClick={() => setShowPage('allOrder')}
                            >
                                Đơn hàng
                            </a>
                        </li>
                        <li
                            className="menu mb-1 px-3 py-2 rounded"
                            style={{ backgroundColor: showPage === 'categories' ? 'var(--list-menu)' : '' }}
                        >
                            <a
                                className="text-decoration-none text-white"
                                href="javascript:void(0)"
                                onClick={() => setShowPage('categories')}
                            >
                                Danh mục
                            </a>
                        </li>
                    </ListMenu>

                    {/* Xử lý đơn hàng */}
                    <MenuSelect
                        title="Xử lý đơn hàng"
                        handleClick={() => setShowPage('handleOrder')}
                        styleMenu={{ backgroundColor: showPage === 'handleOrder' ? 'var(--list-menu)' : '' }}
                    />

                    {/* Thống kê */}
                    <ListMenu title="Thống kê" icon={faChartPie}>
                        <li className="mb-3">
                            <a className="text-decoration-none text-white" href="javascript:void(0)">
                                quanly
                            </a>
                        </li>
                        <li className="mb-3">
                            <a className="text-decoration-none text-white" href="javascript:void(0)">
                                quanly
                            </a>
                        </li>
                        <li className="mb-3">
                            <a className="text-decoration-none text-white" href="javascript:void(0)">
                                quanly
                            </a>
                        </li>
                    </ListMenu>
                </Col>

                <Col sm={10} className="p-3">
                    {Pages()}
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPage;
