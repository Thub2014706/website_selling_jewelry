import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import anhthu from '~/assets/images/logo2.png';

const Product = () => {
    return (
        <Card style={{ width: '18rem', border: 'none' }}>
            <div className="card-product">
                <Card.Img className="card-img rounded-0" variant="top" src={anhthu} />
            </div>
            <Card.Body>
                <Card.Title className="text-center">
                    Mặt dây chuyền Kim cương Kim tiền Vàng trắng 14K PNJ DDDDW060340
                </Card.Title>
                <Card.Text className="mt-3">
                    <h5 className="text-center" style={{ color: 'var(--font-color)' }}>
                        200.000đ
                    </h5>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
