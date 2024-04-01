import React from 'react';
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import TimeFormat from '../TimeFormat/TimeFormat';

const OrderDetail = ({ show, handleClose, orderShow }) => {
    return (
        <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={3} className="fw-bold">
                        Họ tên người nhận:
                    </Col>
                    <Col sm={9}>{orderShow.shipping.name}</Col>
                </Row>
                <Row>
                    <Col sm={3} className="fw-bold">
                        Số điện thoại:
                    </Col>
                    <Col sm={9}>{orderShow.shipping.phone}</Col>
                </Row>
                <Row>
                    <Col sm={3} className="fw-bold">
                        Địa chỉ:
                    </Col>
                    <Col sm={9}>
                        {orderShow.shipping.address}, {orderShow.shipping.ward}, {orderShow.shipping.district},{' '}
                        {orderShow.shipping.province}
                    </Col>
                </Row>
                {orderShow.variants.map((item) => (
                    <Row>
                        <Col sm={3} className="fw-bold">
                            Thời gian {item.status}:
                        </Col>
                        <Col sm={9}>
                            <TimeFormat time={item.date} />
                        </Col>
                    </Row>
                ))}
                <Table className="mt-3">
                    <thead>
                        <tr>
                            <th colSpan={2}>Sản phẩm</th>
                            <th className="text-center">Giá</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-center">Tổng giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderShow.cart.map((pro, index) => (
                            <tr key={index} className="align-middle">
                                <td>
                                    <img src={pro.image} style={{ height: '50px' }} alt="" />
                                </td>
                                <td>
                                    <span className="ms-2">
                                        {pro.name} <br /> Kích thước: {pro.size}cm
                                    </span>
                                </td>
                                <td className="text-center">
                                    {pro.price.toLocaleString('it-IT')}
                                    <span>&#8363;</span>
                                </td>
                                <td className="text-center">{pro.quantity}</td>
                                <td className="text-center">
                                    {pro.priceBuy.toLocaleString('it-IT')}
                                    <span>&#8363;</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <p className="text-end">
                    Tổng đơn: {orderShow.total.toLocaleString('it-IT')}
                    <span>&#8363;</span>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="rounded-0 px-5" variant="outline-dark" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderDetail;
