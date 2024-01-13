import React, { useEffect, useState } from 'react';
import { Card, Form, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateProduct } from '~/redux/apiRequest';

const AdminUpdateProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    // useEffect(() => {
    //     updateProduct(dispatch, id, user.accessToken);
    // }, []);
    const product = useSelector((state) => state.product.getDetail.currentProduct);

    const [data, setData] = useState({
        name: '',
        image: [],
        price: '',
        information: '',
        discount: ''
    });
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Cập nhật sản phẩm</Card.Title>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={product.name}
                                placeholder="Nhập tên sản phẩm"
                                required
                                // onChange={handleData}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Hình ảnh</Form.Label>
                            <Form.Control
                                type="url"
                                name="image"
                                value={product.image}
                                placeholder="Nhập link hình ảnh"
                                required
                            />
                        </Form.Group>

                        {/* <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={product.name}
                                placeholder="Nhập tên sản phẩm"
                                required
                            />
                        </Form.Group> */}

                        <Form.Group>
                            <Form.Label>Giá tiền</Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                value={product.price}
                                placeholder="Nhập giá tiền"
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Thông tin</Form.Label>
                            <Form.Control
                                type="text"
                                name="information"
                                value={product.information}
                                placeholder="Nhập thông tin"
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Khuyến mãi (%)</Form.Label>
                            <Form.Control
                                type="text"
                                name="discount"
                                value={product.discount}
                                placeholder="Nhập mã khuyến mãi"
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminUpdateProduct;
