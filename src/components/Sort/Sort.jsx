import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const Sort = ({ products, setProducts }) => {
    const [button, setButton] = useState('button3');

    useEffect(() => {
        if (products !== null) {
            let sortedProducts = [...products]; // Tạo một bản sao của mảng sản phẩm

            if (button === 'button1') {
                sortedProducts.sort((a, b) => b.discount - a.discount);
            } else if (button === 'button2') {
                sortedProducts.sort((a, b) => b.selled - a.selled);
            } else if (button === 'button3') {
                sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            } else if (button === 'button4') {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else if (button === 'button5') {
                sortedProducts.sort((a, b) => b.price - a.price);
            }

            // Cập nhật state products với danh sách sản phẩm đã được sắp xếp
            setProducts(sortedProducts);
        }
    }, [button, products, setProducts]);

    return (
        <div>
            <Form.Group as={Row}>
                <Form.Label column sm={3}>
                    Sắp xếp:{' '}
                </Form.Label>
                <Col sm={9}>
                    <Form.Select
                        aria-label="Default select example"
                        value={button}
                        className="rounded-0"
                        onChange={(e) => setButton(e.target.value)}
                    >
                        <option value="button1">Khuyến mãi</option>
                        <option value="button2">Bán chạy</option>
                        <option value="button3">Mới nhất</option>
                        <option value="button4">Giá thấp đến cao</option>
                        <option value="button5">Giá cao đến thấp</option>
                    </Form.Select>
                </Col>
            </Form.Group>
        </div>
    );
};

export default Sort;
