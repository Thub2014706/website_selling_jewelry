import React from 'react';
import { Card } from 'react-bootstrap';

const Product = ({ image, name, price, discount }) => {
    return (
        <Card style={{ width: '18rem', border: 'none' }}>
            <div className="card-product">
                <Card.Img className="card-img rounded-0" variant="top" src={image[0]} />
            </div>
            <Card.Body>
                <Card.Title className="text-center">
                    <h4>{name}</h4>
                </Card.Title>
                <Card.Text className="mt-3">
                    <h5 className="text-center" style={{ color: 'var(--font-color)' }}>
                        {(price - (price * discount) / 100).toLocaleString('it-IT')}
                        <span>&#8363;</span>
                    </h5>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
