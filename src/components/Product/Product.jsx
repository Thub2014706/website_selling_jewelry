import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import ImgSample from '../ImgSample/ImgSample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Product = ({ image, name, price, discount, numberStar, selled }) => {
    return (
        <Card className='card' style={{ width: '18rem', border: 'none' }}>
            <div className="card-product">
                <ImgSample className="card-img rounded-0 w-100" variant="top" pathImg={image[0]} />
                {discount !== 0 && (
                    <Badge bg="danger" style={{ position: 'absolute', top: '0', right: '0' }}>
                        -{discount}%
                    </Badge>
                )}
            </div>
            <Card.Body>
                <Card.Title>
                    <h5>{name}</h5>
                </Card.Title>
                <Card.Text className="mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6
                            className="float-start text-decoration-line-through"
                            style={{
                                verticalAlign: 'middle',
                                display: 'inline-block',
                                marginRight: '10px',
                            }}
                        >
                            {price.toLocaleString('it-IT')}
                            <span>&#8363;</span>
                        </h6>
                        <h5 className="float-end" style={{ color: 'var(--font-color)' }}>
                            {(price - (price * discount) / 100).toLocaleString('it-IT')}
                            <span>&#8363;</span>
                        </h5>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p>
                            {numberStar} <FontAwesomeIcon icon={faStar} color="var(--font-color)" />
                        </p>
                        <p>Đã bán: {selled}</p>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
