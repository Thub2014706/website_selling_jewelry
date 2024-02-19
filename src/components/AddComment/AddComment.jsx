import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, ToastContainer } from 'react-bootstrap';
import HandleStar from '../HandleStar/HandleStar';
import { orderDetail } from '~/services/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { createComment } from '~/services/CommentService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddComment = ({ id, show, handleClose }) => {
    const [order, setOrder] = useState(null);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);

    let axiosJWT = createAxios(user, dispatch);

    const [shortComment, setShortComment] = useState([]);

    const [star, setStar] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            const data = await orderDetail(axiosJWT, id, user?.accessToken);
            setOrder(data);
            setShortComment(shortComment.fill(''))
        };
        fetchOrder();
    }, [id]);


    const handleComment = (e, i) => {
        const copy = [...shortComment];
        copy[i] = e.target.value;
        setShortComment(copy);
    };


    const onStar = (i, number) => {
        const copy = [...star]
        copy[i] = number
        setStar(copy);
    };

    const data = [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createComment(axiosJWT, user?.accessToken, data, id, toast);
    };

    // const handleShow = () => {
    //     shortComment.fill('')
    //     // show
    // }

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
                                    user: user?.accessToken,
                                    order: id,
                                    product: item.idProduct,
                                    shortComment: shortComment[index],
                                    star: star[index] ? star[index] : 5,
                                });

                                return (
                                    <div key={item._id} className='mb-2'>
                                        <span>
                                            <img src={item.image} style={{ height: '50px' }} alt="" />
                                            <p>{item.name}</p>
                                        </span>
                                        <p style={{ display: 'inline-block' }}>
                                            Đánh giá sao:
                                            <HandleStar key={index} value={(val) => onStar(index, val)} />
                                        </p>
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
