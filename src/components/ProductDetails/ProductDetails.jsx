import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productDetail } from '~/redux/apiRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from '~/redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const navigate = useNavigate();

    // lấy thông tin chi tiết sp
    const product = useSelector((state) => state.product.getDetail.currentProduct);

    useEffect(() => {
        productDetail(dispatch, id);
        console.log(product);
    }, []);

    const [number, setNumber] = useState(1);

    const [war, setWar] = useState('');

    const handleDecrease = () => {
        setWar('');
        if (number > 1) {
            setNumber(number - 1);
        }
    };

    const handleIncrease = () => {
        if (number < product.inStock) {
            setNumber(Number(number) + 1);
        }
    };

    const handleEdit = (e) => {
        const val = Number(e.target.value.replace(/[^\d]/g, ''));
        setWar('');
        if (val <= product.inStock) {
            setNumber(val);
        } else {
            setNumber(product.inStock);
        }
    };

    const data = {
        product,
        cartQuantity: number,
    };

    const handleToCart = () => {
        const products = JSON.parse(localStorage.getItem('cartProduct'));
        if (products) {
            const findId = products.find((item) => item.product._id === id);
            console.log('ghjdfghj', findId);

            if (findId && findId.cartQuantity + number > product.inStock) {
                setWar('Số lượng bạn chọn vượt quá số lượng sản phẩm trong kho.');
            } else {
                dispatch(addToCart(data));
                setWar('');
                toast('Thêm giỏ hàng thành công', {
                    position: 'top-center',
                    autoClose: 2000,
                    type: 'success',
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            }
        } else {
            dispatch(addToCart(data));
            setWar('');
            toast('Thêm giỏ hàng thành công', {
                position: 'top-center',
                autoClose: 2000,
                type: 'success',
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    const buyNow = () => {
        const products = JSON.parse(localStorage.getItem('cartProduct'));
        if (products) {
            const findId = products.find((item) => item.product._id === id);
            console.log('ghjdfghj', findId);

            if (findId && findId.cartQuantity + number > product.inStock) {
                setWar('Số lượng bạn chọn vượt quá số lượng sản phẩm trong kho.');
            } else {
                dispatch(addToCart(data));
                navigate('/cart');
                setWar('');
            }
        } else {
            dispatch(addToCart(data));
            navigate('/cart');
            setWar('');
        }
    };

    const [photo, setPhoto] = useState(0);

    return (
        <Container>
            <ToastContainer />
            {product !== null ? (
                <Row>
                    <Col md={1}>
                        {/* <FontAwesomeIcon icon={faChevronUp} onClick={() => setMove('up')} /> */}
                        {product.image.map((img, index) => (
                            <img
                                onClick={() => setPhoto(index)}
                                src={img}
                                className={`d-block mx-auto w-75 border rounded mt-2 ${
                                    photo === index ? 'border-secondary' : ''
                                }`}
                            />
                        ))}
                        {/* <FontAwesomeIcon icon={faChevronDown} onClick={() => setMove('down')} /> */}
                    </Col>
                    <Col md={5}>
                        <img src={product.image[photo]} alt="" className="d-block mx-auto w-100" />
                    </Col>
                    <Col md={6} className="mt-5 ps-5">
                        <h2>{product.name}</h2>
                        <h5>
                            Đã bán: {product.selled} | Kho còn: {product.inStock}
                        </h5>
                        <div className="my-4">
                            {product.discount !== 0 && (
                                <h5
                                    className="text-decoration-line-through"
                                    style={{ verticalAlign: 'middle', display: 'inline-block', marginRight: '10px' }}
                                >
                                    {product.price.toLocaleString('it-IT')}
                                    <span>&#8363;</span>
                                </h5>
                            )}
                            <h3
                                style={{ color: 'var(--font-color)', verticalAlign: 'middle', display: 'inline-block' }}
                            >
                                {(product.price - (product.price * product.discount) / 100).toLocaleString('it-IT')}
                                <span>&#8363;</span>
                            </h3>
                        </div>
                        <div>
                            <ButtonGroup size="sm" aria-label="Basic example">
                                <Button variant="outline-secondary" className="rounded-0" onClick={handleDecrease}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                                <input
                                    type="text"
                                    style={{ width: '40px' }}
                                    className="text-center"
                                    onChange={handleEdit}
                                    value={number !== 0 ? number : ''}
                                />
                                <Button variant="outline-secondary" className="rounded-0" onClick={handleIncrease}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </ButtonGroup>
                        </div>
                        <p className="text-danger mt-2">{war}</p>
                        <Button
                            className="py-2 px-4 mt-4 me-3 rounded-0"
                            style={{ backgroundColor: 'var(--primary-color)', border: 'none' }}
                            onClick={handleToCart}
                        >
                            <FontAwesomeIcon icon={faBagShopping} className="me-2" />
                            Thêm vào giỏ
                        </Button>
                        <Button
                            className="py-2 px-4 mt-4 rounded-0"
                            style={{ backgroundColor: 'var(--font-color)', border: 'none' }}
                            onClick={buyNow}
                        >
                            Mua ngay
                        </Button>
                    </Col>
                </Row>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default ProductDetails;
