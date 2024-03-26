import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MenuSelect from '~/components/MenuSelect/MenuSelect';
import logo from '~/assets/images/logo3.png';
import ShipperHandle from '~/components/ShipperHandle/ShipperHandle';
import { allOrderConfirm, allOrderTransport } from '~/services/OrderService';

const ShipperPage = () => {
    const [statusOrder, setStatusOrder] = useState(null);

    const handleOrder = async (value) => {
        setStatusOrder(value.toString());
    };

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm={2} className="min-vh-100 py-2" style={{ backgroundColor: 'var(--primary-color)' }}>
                        <Link to={'/'}>
                            <img src={logo} className="mx-auto d-block mb-4" style={{ height: '50px' }} alt="" />
                        </Link>
                        <MenuSelect
                            title="Chuẩn bị hàng giao"
                            handleClick={() => handleOrder('prepare')}
                            styleMenu={{ backgroundColor: statusOrder === 'prepare' ? 'var(--list-menu)' : '' }}
                        />
                        <MenuSelect
                            title="Xác nhận đơn giao"
                            handleClick={() => handleOrder('confirm')}
                            styleMenu={{ backgroundColor: statusOrder === 'confirm' ? 'var(--list-menu)' : '' }}
                        />
                    </Col>

                    <Col sm={10} className="p-3">
                        {statusOrder !== null && <ShipperHandle statusOrder={statusOrder} />}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ShipperPage;
