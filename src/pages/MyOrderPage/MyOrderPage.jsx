import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ModalSelect from '~/components/ModalSelect/ModalSelect';
import { createAxios } from '~/createInstance';
import { allOrderByUser, cancelOrder } from '~/services/OrderService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AddComment from '~/components/AddComment/AddComment';

const MyOrderPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);

    let axiosJWT = createAxios(user, dispatch);

    const [allOrder, setAllOrder] = useState(null);

    const [select, setSelect] = useState('all');

    useEffect(() => {
        const fetchOrder = async () => {
            const data = await allOrderByUser(axiosJWT, id, user?.accessToken);
            setAllOrder(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        };
        fetchOrder();
    }, [allOrder]);
    // console.log(allOrder);

    const [show, setShow] = useState(false);

    const [idOrder, setIdOrder] = useState(null);

    const handleShow = (id) => {
        setShow(true);
        setIdOrder(id);
    };

    const handleClose = () => setShow(false);

    const handleCancel = async () => {
        await cancelOrder(axiosJWT, idOrder, user?.accessToken, toast);
        setShow(false);
    };

    const Pages = () => {
        if (allOrder !== null) {
            if (select === 'all') {
                return allOrder;
            }
            if (select === 'rocessing') {
                return allOrder.filter((item) => item.status === 'Đang xử lý');
            }
            if (select === 'transport') {
                return allOrder.filter((item) => item.status === 'Đang vận chuyển');
            }
            if (select === 'delivered') {
                return allOrder.filter((item) => item.status === 'Đã giao');
            }
            if (select === 'cancelled') {
                return allOrder.filter((item) => item.status === 'Đã hủy');
            }
        }
    };

    const [showComment, setShowComment] = useState(false);
    const [idComment, setIdComment] = useState(null);

    // console.log(idComment)

    const handleShowComment = (id) => {
        setShowComment(true);
        setIdComment(id);
    };

    const handleCloseComment = () => setShowComment(false);

    return (
        <div>
            <ToastContainer />
            <Container>
                <Row className="shadow py-3 mt-3">
                    <Col style={{ borderBottom: select === 'all' ? '1px solid var(--font-color)' : '' }}>
                        <Button
                            variant="link"
                            className="mx-auto d-grid text-black text-decoration-none"
                            onClick={() => setSelect('all')}
                        >
                            <h5 style={{ color: select === 'all' ? 'var(--font-color)' : '' }}>Tất cả</h5>
                        </Button>
                    </Col>
                    <Col style={{ borderBottom: select === 'rocessing' ? '1px solid var(--font-color)' : '' }}>
                        <Button
                            variant="link"
                            className="mx-auto d-grid text-black text-decoration-none"
                            onClick={() => setSelect('rocessing')}
                        >
                            <h5 style={{ color: select === 'rocessing' ? 'var(--font-color)' : '' }}>Đang xử lý</h5>
                        </Button>
                    </Col>
                    <Col style={{ borderBottom: select === 'transport' ? '1px solid var(--font-color)' : '' }}>
                        <Button
                            variant="link"
                            className="mx-auto d-grid text-black text-decoration-none"
                            onClick={() => setSelect('transport')}
                        >
                            <h5 style={{ color: select === 'transport' ? 'var(--font-color)' : '' }}>
                                Đang vận chuyển
                            </h5>
                        </Button>
                    </Col>
                    <Col style={{ borderBottom: select === 'delivered' ? '1px solid var(--font-color)' : '' }}>
                        <Button
                            variant="link"
                            className="mx-auto d-grid text-black text-decoration-none"
                            onClick={() => setSelect('delivered')}
                        >
                            <h5 style={{ color: select === 'delivered' ? 'var(--font-color)' : '' }}>Đã giao hàng</h5>
                        </Button>
                    </Col>
                    <Col style={{ borderBottom: select === 'cancelled' ? '1px solid var(--font-color)' : '' }}>
                        <Button
                            variant="link"
                            className="mx-auto d-grid text-black text-decoration-none"
                            onClick={() => setSelect('cancelled')}
                        >
                            <h5 style={{ color: select === 'cancelled' ? 'var(--font-color)' : '' }}>Đã hủy</h5>
                        </Button>
                    </Col>
                </Row>
            </Container>
            {allOrder !== null ? (
                Pages().length > 0 ? (
                    Pages().map((item) => (
                        <Container className="shadow px-5 py-3 mt-4">
                            <h5>Trạng thái: {item.status}</h5>
                            <Table>
                                {item.cart.map((pro, index) => (
                                    <tbody>
                                        <tr key={index}>
                                            <td>
                                                <img src={pro.image} style={{ height: '100px' }} alt="" />
                                            </td>
                                            <td>
                                                <span>
                                                    <h5>{pro.name}</h5>
                                                    <p>Kích thước: {pro.size} cm</p>
                                                    <p>x {pro.quantity}</p>
                                                </span>
                                            </td>
                                            <td>
                                                <span className="text-end">
                                                    {pro.priceMain !== pro.price && (
                                                        <p className="text-decoration-line-through text-secondary">
                                                            {pro.price.toLocaleString('it-IT')}
                                                            <span>&#8363;</span>
                                                        </p>
                                                    )}
                                                    <p style={{ color: 'var(--font-color)' }}>
                                                        {pro.priceMain.toLocaleString('it-IT')}
                                                        <span>&#8363;</span>
                                                    </p>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </Table>
                            <h5 className="text-end">
                                Tổng cộng:
                                <span className="ms-2" style={{ color: 'var(--font-color)' }}>
                                    {item.total.toLocaleString('it-IT')}
                                    <span>&#8363;</span>
                                </span>
                            </h5>
                            {item.status === 'Đang xử lý' && (
                                <div className="mt-4 d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Button
                                        className="rounded-0 px-5"
                                        variant="outline-dark"
                                        onClick={() => handleShow(item._id)}
                                    >
                                        Huỷ đơn
                                    </Button>
                                </div>
                            )}
                            {item.status === 'Đang vận chuyển' && (
                                <div className="mt-4 d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Button className="rounded-0 px-5" variant="outline-dark">
                                        Đã nhận hàng
                                    </Button>
                                </div>
                            )}
                            {item.status === 'Đã giao' && (
                                <div className="mt-4 d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Button
                                        className="rounded-0 px-5"
                                        variant="outline-dark"
                                        onClick={() => handleShowComment(item._id)}
                                    >
                                        Đánh giá
                                    </Button>
                                </div>
                            )}
                            <ModalSelect
                                show={show}
                                text="Bạn có chắc muốn hủy đơn hàng này"
                                accept="Hủy đơn"
                                cancel="Thoát"
                                handleAction={handleCancel}
                                handleClose={handleClose}
                            />
                            {idComment && (
                                <AddComment id={idComment} show={showComment} handleClose={handleCloseComment} />
                            )}
                        </Container>
                    ))
                ) : (
                    <Row className="py-5">
                        <Col className="text-center">
                            <h3>Bạn chưa có đơn hàng nào.</h3>
                            <Link className="text-dark h5" to={'/'}>
                                <FontAwesomeIcon icon={faArrowLeft} /> Tiếp tục mua hàng
                            </Link>
                        </Col>
                    </Row>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MyOrderPage;
