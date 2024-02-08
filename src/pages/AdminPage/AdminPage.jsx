import { faChartPie, faChevronDown, faChevronUp, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Container, Dropdown, ListGroup, Row } from 'react-bootstrap';
import logo from '~/assets/images/logo3.png';
import AdminOrder from '~/components/AdminOrder/AdminOrder';
import AdminAllProduct from '~/components/AdminProduct/AdminAllProduct';
import ListMenu from '~/components/ListMenu/ListMenu';

const AdminPage = () => {
    const [manage, setManage] = useState(false);

    const [statistical, setStatistical] = useState(false);

    const [showPage, setShowPage] = useState('');

    const Pages = () => {
        if (showPage === 'allProduct') {
            return <AdminAllProduct />;
        } else if (showPage === 'allOrder') {
            return <AdminOrder />;
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col sm={2} className="min-vh-100 py-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <img src={logo} className="mx-auto d-block mb-4" style={{ height: '60px' }} alt="" />
                    {/* <a
                        href="javascript:void(0)"
                        className="text-decoration-none text-white fs-5"
                        onClick={() => setManage(!manage)}
                    >
                        <div className="px-3 mb-3">
                            <FontAwesomeIcon icon={faClipboard} className="me-2" /> Quản lý
                            <FontAwesomeIcon
                                className="float-end"
                                icon={faChevronDown}
                                style={{ transform: manage ? 'rotate(180deg)' : '' }}
                            />
                        </div>
                    </a>
                    {manage === true && (
                        <ul className="ms-2 h5" style={{ listStyle: 'none' }}>
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
                        </ul>
                    )} */}

                    <ListMenu
                        condition={manage}
                        title="Quản lý"
                        icon={faClipboard}
                        handleAction={() => setManage(!manage)}
                    >
                        <li
                            className="mb-3 px-3 py-2 rounded"
                            style={{ backgroundColor: showPage === 'allUser' ? 'var(--list-menu)' : '' }}
                        >
                            <a className="text-decoration-none text-white" href="javascript:void(0)">
                                Người dùng
                            </a>
                        </li>
                        <li
                            className="mb-3 px-3 py-2 rounded"
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
                            className="mb-3 px-3 py-2 rounded"
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
                    </ListMenu>

                    <ListMenu
                        condition={statistical}
                        title="Thống kê"
                        icon={faChartPie}
                        handleAction={() => setStatistical(!statistical)}
                    >
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
