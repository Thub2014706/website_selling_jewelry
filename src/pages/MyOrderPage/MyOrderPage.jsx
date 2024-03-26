import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ModalSelect from '~/components/ModalSelect/ModalSelect';
import { allOrderByUser, cancelOrder } from '~/services/OrderService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AddComment from '~/components/AddComment/AddComment';
import { allCommentByUser } from '~/services/CommentService';
import ButtonStatus from '~/components/ButtonStatus/ButtonStatus';
import ImgSample from '~/components/ImgSample/ImgSample';

const MyOrderPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);

    const id = user?.data.id;

    const [select, setSelect] = useState('all');

    const [allOrder, setAllOrder] = useState(null);

    const [comments, setComments] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (select === 'all') {
                const data = await allOrderByUser(id, user?.accessToken);
                setAllOrder(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
            }
            const dataComment = await allCommentByUser(user?.accessToken, id);
            setComments(dataComment);
        };
        fetchOrder();
    }, [allOrder]);

    const handleAll = async () => {
        setSelect('all');
        const data = await allOrderByUser(id, user?.accessToken);
        setAllOrder(data);
    };

    const handleRocessing = async (value) => {
        setSelect('rocessing');
        const data = await allOrderByUser(id, user?.accessToken, value.toString());
        setAllOrder(data);
    };

    const handleTransport = async (value) => {
        setSelect('transport');
        const data = await allOrderByUser(id, user?.accessToken, value.toString());
        setAllOrder(data);
    };

    const handleDelivered = async (value) => {
        setSelect('delivered');
        const data = await allOrderByUser(id, user?.accessToken, value.toString());
        setAllOrder(data);
    };

    const handleCancelled = async (value) => {
        setSelect('cancelled');
        const data = await allOrderByUser(id, user?.accessToken, value.toString());
        setAllOrder(data);
    };

    const [show, setShow] = useState(false);

    const [idOrder, setIdOrder] = useState(null);

    const handleShow = (id) => {
        setShow(true);
        setIdOrder(id);
    };

    const handleClose = () => setShow(false);

    const handleCancel = async () => {
        await cancelOrder(idOrder, user?.accessToken, toast);
        setShow(false);
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
                            onClick={() => handleAll()}
                        >
                            <h5 style={{ color: select === 'all' ? 'var(--font-color)' : '' }}>Tất cả</h5>
                        </Button>
                    </Col>
                    <Col style={{ borderBottom: select === 'rocessing' ? '1px solid var(--font-color)' : '' }}>
                        <Button
                            variant="link"
                            className="mx-auto d-grid text-black text-decoration-none"
                            onClick={() => handleRocessing('rocessing')}
                        >
                            <h5 style={{ color: select === 'rocessing' ? 'var(--font-color)' : '' }}>Đang xử lý</h5>
                        </Button>
                    </Col>
                    <Col style={{ borderBottom: select === 'transport' ? '1px solid var(--font-color)' : '' }}>
                        <Button
                            variant="link"
                            className="mx-auto d-grid text-black text-decoration-none"
                            onClick={() => handleTransport('transport')}
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
                            onClick={() => handleDelivered('delivered')}
                        >
                            <h5 style={{ color: select === 'delivered' ? 'var(--font-color)' : '' }}>Đã giao hàng</h5>
                        </Button>
                    </Col>
                    <Col style={{ borderBottom: select === 'cancelled' ? '1px solid var(--font-color)' : '' }}>
                        <Button
                            variant="link"
                            className="mx-auto d-grid text-black text-decoration-none"
                            onClick={() => handleCancelled('cancelled')}
                        >
                            <h5 style={{ color: select === 'cancelled' ? 'var(--font-color)' : '' }}>Đã hủy</h5>
                        </Button>
                    </Col>
                </Row>
            </Container>
            {allOrder !== null && comments !== null ? (
                allOrder.length > 0 ? (
                    allOrder.map((item) => (
                        <Container className="shadow px-5 py-3 mt-4">
                            <span className="d-flex">
                                <h5>Trạng thái: </h5>
                                <h6 style={{ color: '#26AA99' }} className="ms-2 mt-1">
                                    {item.variants[item.variants.length - 1].status !== 'Giao hàng'
                                        ? item.variants[item.variants.length - 1].status
                                        : 'Đơn hàng đang trên đường giao đến bạn, hãy giữ máy nhé!'}
                                </h6>
                            </span>
                            <Table>
                                {item.cart.map((pro, index) => (
                                    <tbody>
                                        <tr key={index}>
                                            <td>
                                                <ImgSample pathImg={pro.image} style={{ height: '100px' }} />
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
                            {item.variants[item.variants.length - 1].status === 'Đang xử lý' && (
                                <ButtonStatus title="Huỷ đơn" handleButton={() => handleShow(item._id)} />
                            )}
                            {(item.variants[item.variants.length - 1].status === 'Đang vận chuyển' ||
                                item.variants[item.variants.length - 1].status === 'Giao hàng') && (
                                <ButtonStatus title="Đã nhận hàng" />
                            )}
                            {item.variants[item.variants.length - 1].status === 'Đã giao' &&
                                (!comments.find((miniItem) => miniItem.order === item._id) ? (
                                    <ButtonStatus title="Đánh giá" handleButton={() => handleShowComment(item._id)} />
                                ) : (
                                    <div className="mt-4 d-grid gap-2 d-md-flex justify-content-md-end">
                                        <h5 className="text-danger">Đã đánh giá</h5>
                                    </div>
                                ))}
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
            <ModalSelect
                show={show}
                text="Bạn có chắc muốn hủy đơn hàng này"
                accept="Hủy đơn"
                cancel="Thoát"
                handleAction={handleCancel}
                handleClose={handleClose}
            />
            {idComment && <AddComment id={idComment} show={showComment} handleClose={handleCloseComment} />}
        </div>
    );
};

export default MyOrderPage;
