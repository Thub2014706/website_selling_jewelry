import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import HandleStar from '../HandleStar/HandleStar';
import { orderDetail } from '~/services/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';

const AddComment = ({ id, show, handleClose }) => {
    const [order, setOrder] = useState(null);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);

    let axiosJWT = createAxios(user, dispatch);

    useEffect(() => {
        const fetchOrder = async () => {
            const data = await orderDetail(axiosJWT, id, user?.accessToken);
            setOrder(data);
        };
        fetchOrder();
    }, []);
    // console.log(order)

    return (
        <div>
            <Form>
                <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h4>Đánh giá sản phẩm</h4>
                    </Modal.Header>
                    <Modal.Body>
                        {order !== null &&
                            order.cart.map((item) => (
                                <div>
                                    <img src={item.image} style={{ height: '50px' }} alt="" />
                                    <p>{item.name}</p>
                                    <span>
                                        Đánh giá sao:
                                        <HandleStar />
                                    </span>
                                    <Form.Control as="textarea" rows={3} placeholder="Viết đánh giá" />
                                </div>
                            ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="rounded-0 px-4" variant="outline-dark" onClick={handleClose}>
                            Huỷ
                        </Button>
                        <Button
                            className="px-4 rounded-0"
                            style={{ backgroundColor: 'var(--font-color)', border: 'none' }}
                            onClick={handleClose}
                            type="submit"
                        >
                            Hoàn thành
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </div>
    );
};

export default AddComment;
