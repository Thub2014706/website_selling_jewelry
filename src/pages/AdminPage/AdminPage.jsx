import { faChartPie, faChevronDown, faChevronUp, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Container, Dropdown, ListGroup, Row } from 'react-bootstrap';
import logo from '~/assets/images/logo3.png';
import AdminCategory from '~/components/AdminCategory/AdminCategory';
import AdminOrder from '~/components/AdminOrder/AdminOrder';
import AdminAllProduct from '~/components/AdminProduct/AdminAllProduct';
import ListMenu from '~/components/ListMenu/ListMenu';

const AdminPage = () => {
    const [showPage, setShowPage] = useState('');

    const Pages = () => {
        if (showPage === 'allProduct') {
            return <AdminAllProduct />;
        } else if (showPage === 'allOrder') {
            return <AdminOrder />;
        } else if (showPage === 'categories') {
            return <AdminCategory />;
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col sm={2} className="min-vh-100 py-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <img src={logo} className="mx-auto d-block mb-4" style={{ height: '50px' }} alt="" />

                    <ListMenu title="Quản lý" icon={faClipboard}>
                        <li
                            className="menu mb-1 px-3 py-2 rounded"
                            style={{ backgroundColor: showPage === 'allUser' ? 'var(--list-menu)' : '' }}
                        >
                            <a className="text-decoration-none text-white" href="javascript:void(0)">
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
