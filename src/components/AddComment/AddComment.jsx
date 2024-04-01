import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import HandleStar from '../HandleStar/HandleStar';
import { orderDetail } from '~/services/OrderService';
import { useDispatch, useSelector } from 'react-redux';

import { createComment } from '~/services/CommentService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImgSample from '../ImgSample/ImgSample';

const AddComment = ({ id, show, handleClose }) => {
    const [order, setOrder] = useState(null);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);

    // let axiosJWT = createAxios(user, dispatch);

    const [shortComment, setShortComment] = useState([]);

    const [star, setStar] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            const data = await orderDetail( id, user?.accessToken);
            setOrder(data);
            setShortComment(shortComment.fill(''));
        };
        fetchOrder();
    }, [id, show]);

    const handleComment = (e, i) => {
        const copy = [...shortComment];
        copy[i] = e.target.value;
        setShortComment(copy);
    };

    const onStar = (i, number) => {
        const copy = [...star];
        copy[i] = number;
        setStar(copy);
    };

    // console.log(id)

    const data = [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createComment(user?.accessToken, data, id, toast);
    };

    return (
        <div>
            <ToastContainer />
            <Modal centered show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <h4>Đánh giá sản phẩm</h4>
                    </Modal.Header>
                    <Modal.Body>
                        {order !== null &&
                            order.cart.map((item, index) => {
                                data.push({
                                    user: {
                                        iduser: user?.accessToken,
                                        username: user?.data.username,
                                    },
                                    order: id,
                                    product: item.idProduct,
                                    shortComment: shortComment[index],
                                    star: star[index] ? star[index] : 5,
                                });

                                return (
                                    <div key={item._id} className="mb-2">
                                        <span className="d-flex mb-2">
                                            <ImgSample
                                                pathImg={item.image}
                                                className="me-2"
                                                style={{ height: '50px' }}
                                                alt=""
                                            />
                                            <p className="mt-2">{item.name}</p>
                                        </span>
                                        <span className="d-flex">
                                            <p className="me-2">Đánh giá sao:</p>
                                            <HandleStar key={index} value={(val) => onStar(index, val)} />
                                        </span>
                                        <Form.Control
                                            as="textarea"
                                            value={shortComment[index]}
                                            onChange={(e) => handleComment(e, index)}
                                            rows={3}
                                            placeholder="Viết đánh giá"
                                        />
                                    </div>
                                );
                            })}
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
                </Form>
            </Modal>
        </div>
    );
};

export default AddComment;
