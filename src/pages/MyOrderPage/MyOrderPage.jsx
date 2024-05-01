import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ModalSelect from '~/components/ModalSelect/ModalSelect';
import {
    allOrderByUser,
    cancelOrder,
    cancelledByUser,
    deliveringByUser,
    finishedByUser,
    finishedUpdate,
    rocessingByUser,
    transportByUser,
} from '~/services/OrderService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AddComment from '~/components/AddComment/AddComment';
import { allCommentByUser } from '~/services/CommentService';
import ButtonStatus from '~/components/ButtonStatus/ButtonStatus';
import ImgSample from '~/components/ImgSample/ImgSample';
import OrderStatus from '~/constants/OrderStatus';
import SelectMyOrder from '~/components/SelectMyOrder/SelectMyOrder';

const MyOrderPage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login.currentUser);

    const id = user?.data.id;

    const [select, setSelect] = useState('all');

    const [allOrder, setAllOrder] = useState(null);

    const [comments, setComments] = useState(null);

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

    const handleUpdateDelivered = async (id) => {
        await finishedUpdate(id);
    };

    useEffect(() => {
        const fetchOrder = async () => {
            switch (select) {
                case 'all':
                    const data1 = await allOrderByUser(id, user?.accessToken);
                    setAllOrder(
                        data1.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    );
                    break;
                case 'rocessing':
                    const data2 = await rocessingByUser(id, user?.accessToken);
                    setAllOrder(
                        data2.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    );
                    break;
                case 'transport':
                    const data3 = await transportByUser(id, user?.accessToken);
                    setAllOrder(
                        data3.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    );
                    break;
                case 'delivering':
                    const data4 = await deliveringByUser(id, user?.accessToken);
                    setAllOrder(
                        data4.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    );
                    break;
                case 'delivered':
                    const data5 = await finishedByUser(id, user?.accessToken);
                    setAllOrder(
                        data5.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    );
                    break;
                case 'cancelled':
                    const data6 = await cancelledByUser(id, user?.accessToken);
                    setAllOrder(
                        data6.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
                    );
                    break;
                default:
                    break;
            }
            const dataComment = await allCommentByUser(user?.accessToken, id);
            setComments(dataComment);
        };
        fetchOrder();
    }, [allOrder]);

    return (
        <div>
            <ToastContainer />
            <Container>
                <Row className="shadow py-3 mt-3">
                    <SelectMyOrder
                        styleCol={{ borderBottom: select === 'all' ? '1px solid var(--font-color)' : '' }}
                        onClick={() => setSelect('all')}
                        styleTitle={{ color: select === 'all' ? 'var(--font-color)' : '' }}
                        title="Tất cả"
                    />
                    <SelectMyOrder
                        styleCol={{ borderBottom: select === 'rocessing' ? '1px solid var(--font-color)' : '' }}
                        onClick={() => setSelect('rocessing')}
                        styleTitle={{ color: select === 'rocessing' ? 'var(--font-color)' : '' }}
                        title="Đang xử lý"
                    />
                    <SelectMyOrder
                        styleCol={{ borderBottom: select === 'transport' ? '1px solid var(--font-color)' : '' }}
                        onClick={() => setSelect('transport')}
                        styleTitle={{ color: select === 'transport' ? 'var(--font-color)' : '' }}
                        title="Đang vận chuyển"
                    />
                    <SelectMyOrder
                        styleCol={{ borderBottom: select === 'delivering' ? '1px solid var(--font-color)' : '' }}
                        onClick={() => setSelect('delivering')}
                        styleTitle={{ color: select === 'delivering' ? 'var(--font-color)' : '' }}
                        title="Đang giao hàng"
                    />
                    <SelectMyOrder
                        styleCol={{ borderBottom: select === 'delivered' ? '1px solid var(--font-color)' : '' }}
                        onClick={() => setSelect('delivered')}
                        styleTitle={{ color: select === 'delivered' ? 'var(--font-color)' : '' }}
                        title="Hoàn thành"
                    />
                    <SelectMyOrder
                        styleCol={{ borderBottom: select === 'cancelled' ? '1px solid var(--font-color)' : '' }}
                        onClick={() => setSelect('cancelled')}
                        styleTitle={{ color: select === 'cancelled' ? 'var(--font-color)' : '' }}
                        title="Đã hủy"
                    />
                </Row>
            </Container>
            {allOrder !== null && comments !== null ? (
                allOrder.length > 0 ? (
                    allOrder.map((item) => (
                        <Container className="shadow px-5 py-3 mt-4">
                            <span className="d-flex">
                                <h5>Trạng thái: </h5>
                                <h6 style={{ color: '#26AA99' }} className="ms-2 mt-1">
                                    {item.variants[item.variants.length - 1].status !== OrderStatus[2]
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
                                                    <p>Kích thước: {pro.size}</p>
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
                            {item.variants[item.variants.length - 1].status === OrderStatus[0] && (
                                <ButtonStatus title="Huỷ đơn" handleButton={() => handleShow(item._id)} />
                            )}
                            {[OrderStatus[1], OrderStatus[2], OrderStatus[3]].includes(
                                item.variants[item.variants.length - 1].status,
                            ) && <ButtonStatus title="Đã nhận hàng" disabled={true} />}
                            {OrderStatus[4] === item.variants[item.variants.length - 1].status && (
                                <ButtonStatus
                                    title="Đã nhận hàng"
                                    handleButton={() => handleUpdateDelivered(item._id)}
                                />
                            )}
                            {item.variants[item.variants.length - 1].status === OrderStatus[6] &&
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
