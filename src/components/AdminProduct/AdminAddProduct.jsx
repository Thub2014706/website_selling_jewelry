import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addProduct, updateProduct } from '~/redux/apiRequest';

const AdminAddProduct = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);

    const [data, setData] = useState({
        name: '',
        image: [],
        type: '',
        price: '',
        information: '',
        discount: '',
    });

    const addLink = () => {
        const link = [...data.image, ''];
        setData((preData) => ({
            ...preData,
            image: link,
        }));
    };

    const deleteLink = (i) => {
        const deleteLink = [...data.image];
        setData((preData) => ({
            ...preData,
            image: deleteLink.filter((val, index) => index !== i),
        }));
    };

    const handleData = (e, i) => {
        const { name, value } = e.target;
        if (name === 'image') {
            const inputData = [...data.image];
            inputData[i] = value;
            setData((preData) => ({
                ...preData,
                image: inputData,
            }));
        } else if (name === 'price') {
            const format = value.replace(/[^\d]/g, '');
            setData((preData) => ({
                ...preData,
                price: Number(format).toLocaleString('it-IT'),
            }));
        } else if (name === 'discount') {
            setData((preData) => ({
                ...preData,
                discount: Number(value.replace(/[^\d]/g, '').slice(0, 2)),
            }));
        } else {
            setData((preData) => ({
                ...preData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        addProduct(dispatch, data, user.accessToken);
    };

    console.log(data);
    return (
        <div>
            <Card className="w-50">
                <Card.Body>
                    <Card.Title>Cập nhật sản phẩm</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column sm={2}>
                                Tên sản phẩm
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    placeholder="Nhập tên sản phẩm"
                                    required
                                    onChange={handleData}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column sm={2}>
                                Hình ảnh
                            </Form.Label>
                            <Col sm={10}>
                                Thêm link hình ảnh
                                <Button variant="outline-dark" className="rounded-0 ms-3" onClick={() => addLink()}>
                                    +
                                </Button>
                            </Col>
                            {data.image.map((data, index) => (
                                <Col sm={{ span: 10, offset: 2 }} className='mt-3'>
                                    <Form.Group as={Row}>
                                        <Col sm={11}>
                                            <Form.Control
                                                type="url"
                                                name="image"
                                                value={data}
                                                placeholder="Nhập link hình ảnh"
                                                required
                                                onChange={(e) => handleData(e, index)}
                                            />
                                        </Col>
                                        <Col sm={1}>
                                            <Button
                                                variant="outline-dark"
                                                className="rounded-0"
                                                onClick={() => deleteLink(index)}
                                            >
                                                x
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            ))}
                        </Form.Group>

                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column sm={2}>
                                Email address
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="type"
                                    value={data.type}
                                    placeholder="Nhập tên sản phẩm"
                                    required
                                    onChange={handleData}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column sm={2}>
                                Giá tiền
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    value={data.price}
                                    placeholder="Nhập giá tiền"
                                    required
                                    onChange={handleData}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column sm={2}>
                                Khuyến mãi (%)
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="discount"
                                    value={data.discount}
                                    placeholder="Nhập mã khuyến mãi"
                                    onChange={handleData}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mb-3'>
                            <Form.Label column sm={2}>
                                Thông tin
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="information"
                                    value={data.information}
                                    placeholder="Nhập thông tin"
                                    required
                                    onChange={handleData}
                                />
                            </Col>
                        </Form.Group>
                        <Button
                            type="submit"
                            className="mt-5"
                            style={{ width: '100%', backgroundColor: 'var(--primary-color)', border: 'none' }}
                        >
                            Thêm sản phẩm
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminAddProduct;
