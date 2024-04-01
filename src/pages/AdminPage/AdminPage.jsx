import { faChartLine, faChartPie, faChevronDown, faChevronUp, faClipboard, faFilePen } from '@fortawesome/free-solid-svg-icons';
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
import Statistical from '~/components/Statistical/Statistical';

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
        } else if (showPage === 'statistical') {
            return <Statistical />;
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
                        <a
                            className="text-decoration-none text-white"
                            href="javascript:void(0)"
                            onClick={() => setShowPage('allUser')}
                        >
                            <li
                                className="menu mb-1 px-3 py-2 rounded"
                                style={{ backgroundColor: showPage === 'allUser' ? 'var(--list-menu)' : '' }}
                            >
                                Người dùng
                            </li>
                        </a>
                        <a
                            className="text-decoration-none text-white"
                            href="javascript:void(0)"
                            onClick={() => setShowPage('allProduct')}
                        >
                            <li
                                className="menu mb-1 px-3 py-2 rounded"
                                style={{ backgroundColor: showPage === 'allProduct' ? 'var(--list-menu)' : '' }}
                            >
                                Sản phẩm
                            </li>
                        </a>
                        <a
                            className="text-decoration-none text-white"
                            href="javascript:void(0)"
                            onClick={() => setShowPage('allOrder')}
                        >
                            <li
                                className="menu mb-1 px-3 py-2 rounded"
                                style={{ backgroundColor: showPage === 'allOrder' ? 'var(--list-menu)' : '' }}
                            >
                                Đơn hàng
                            </li>
                        </a>
                        <a
                            className="text-decoration-none text-white"
                            href="javascript:void(0)"
                            onClick={() => setShowPage('categories')}
                        >
                            <li
                                className="menu mb-1 px-3 py-2 rounded"
                                style={{ backgroundColor: showPage === 'categories' ? 'var(--list-menu)' : '' }}
                            >
                                Danh mục
                            </li>
                        </a>
                    </ListMenu>

                    {/* Xử lý đơn hàng */}
                    <MenuSelect
                        title="Xử lý đơn hàng"
                        icon={faFilePen}
                        handleClick={() => setShowPage('handleOrder')}
                        styleMenu={{ backgroundColor: showPage === 'handleOrder' ? 'var(--list-menu)' : '' }}
                    />

                    {/* Thống kê */}
                    <MenuSelect
                        title="Thống kê"
                        icon={faChartLine}
                        handleClick={() => setShowPage('statistical')}
                        styleMenu={{ backgroundColor: showPage === 'statistical' ? 'var(--list-menu)' : '' }}
                    />
                    {/* <ListMenu title="Thống kê" icon={faChartPie}>
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
                    </ListMenu> */}
                </Col>

                <Col sm={10} className="p-3">
                    {Pages()}
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPage;
