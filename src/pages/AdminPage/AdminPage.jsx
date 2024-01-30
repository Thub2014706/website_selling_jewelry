import React from 'react';
import { Accordion, Col, Container, Dropdown, Row } from 'react-bootstrap';
import logo from '~/assets/images/logo3.png';

const AdminPage = () => {
    return (
        <div>
            <Row>
                <Col sm={2} className="min-vh-100 py-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <img src={logo} className="mx-auto d-block mb-4" style={{ height: '60px' }} alt="" />
                    {/* <h5 className="text-white">Quản lý</h5> */}
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Quản lý</Accordion.Header>
                            <Accordion.Body>
                                <h5>Quản lý</h5>
                                <h5>Quản lý</h5>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
                <Col sm={10}></Col>
            </Row>
        </div>
    );
};

export default AdminPage;
