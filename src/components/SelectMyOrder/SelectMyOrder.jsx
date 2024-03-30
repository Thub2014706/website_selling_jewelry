import React from 'react';
import { Button, Col } from 'react-bootstrap';

const SelectMyOrder = ({ styleCol, onClick, styleTitle, title }) => {
    return (
        <Col style={styleCol}>
            <Button variant="link" className="mx-auto d-grid text-black text-decoration-none" onClick={onClick}>
                <h5 style={styleTitle}>{title}</h5>
            </Button>
        </Col>
    );
};

export default SelectMyOrder;
