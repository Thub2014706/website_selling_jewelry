import React, { useEffect } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { deliveringUpdate } from '~/services/OrderService';

const ShipDetail = ({ order }) => {
    useEffect(() => {}, [order]);
    console.log(order)

    return (
        <div>
            {order !== null && (
                <Card className="p-4">
                    <Card.Title>Chi tiết</Card.Title>
                    <Card.Body>
                        <Row>
                            <Col sm={4} className="fw-bold">
                                Họ tên người nhận:
                            </Col>
                            <Col sm={8}>{order.ship.name}</Col>
                        </Row>
                        <Row>
                            <Col sm={4} className="fw-bold">
                                Số điện thoại:
                            </Col>
                            <Col sm={8}>{order.ship.phone}</Col>
                        </Row>
                        <Row>
                            <Col sm={4} className="fw-bold">
                                Địa chỉ:
                            </Col>
                            <Col sm={8}>
                                {order.ship.address}, {order.ship.ward}, {order.ship.district}, {order.ship.province}
                            </Col>
                        </Row>
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
                                {order.data.cart.map((pro, index) => (
                                    <tr key={index} className="align-middle">
                                        <td>
                                            <img src={pro.image} style={{ height: '50px' }} alt="" />
                                        </td>
                                        <td>
                                            <span className="ms-2">
                                                <p className="text-long" title={pro.name} style={{ maxWidth: '240px' }}>
                                                    {pro.name}
                                                </p>
                                                Kích thước: {pro.size}
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
                            Tổng đơn: {order.data.total.toLocaleString('it-IT')}
                            <span>&#8363;</span>
                        </p>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default ShipDetail;
