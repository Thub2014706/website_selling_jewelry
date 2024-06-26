import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import AllAddress from '~/components/AllAddress/AllAddress';
import AddAdress from '~/components/AddAddress/AddAddress';

import { getAllByUser } from '~/services/AddressService';
import img1 from '~/assets/images/title_cart2.png';
import TitleImage from '~/components/TitleImage/TitleImage';
import { createOrder } from '~/services/OrderService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCart } from '~/redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import ImgSample from '~/components/ImgSample/ImgSample';
import OrderStatus from '~/constants/OrderStatus';

const CheckoutPage = () => {
    const navigate = useNavigate();

    const products = useSelector((state) => state.cart.cartItems);

    const [allProduct, setAllProduct] = useState([]);

    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    // const axiosJWT = createAxios(user, dispatch);
    const [showAddress, setShowAddress] = useState(null);
    const [select, setSelect] = useState(null);
    const handleSelect = (id) => {
        setSelect(id);
    };
    // console.log(allProduct)
    const [allAddress, setAllAddress] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAll, setShowAll] = useState(false);
    const [idSelect, setIdSelect] = useState(null);

    const handleCloseAll = () => setShowAll(false);
    const handleShowAll = (id) => {
        setIdSelect(id);
        setShowAll(true);
    };

    useEffect(() => {
        const fetchAddress = async () => {
            const addresses = await getAllByUser(user?.accessToken, user?.data.id);
            setAllAddress(addresses);
            if (products && products.length > 0) {
                const copy = [...allProduct];
                products.map(
                    (element, index) =>
                        (copy[index] = {
                            name: element.product.name,
                            image: element.product.image[0],
                            size: element.idSize.size,
                            price: element.product.price,
                            priceMain: element.product.price * (1 - element.product.discount / 100),
                            priceBuy: element.totalPriceItem,
                            quantity: element.cartQuantity,
                            idVariant: element.idSize._id,
                            idProduct: element.product._id,
                        }),
                );
                setAllProduct(copy);
            }
            if (addresses) {
                const selectId = addresses.find((item) => item._id === select);
                const main = addresses.find((item) => item.main === true);
                setShowAddress(selectId ? selectId : main);
                // console.log(addresses)
            }
        };
        fetchAddress();
    }, [showAddress, allAddress, handleCloseAll, showAddress]);
    console.log(allAddress);

    const total = useSelector((state) => state.cart.totalPay);

    const data = {
        total,
        amount: products.length,
        cart: allProduct,
        user: user?.data.id,
        shipping: {
            name: showAddress?.name,
            province: showAddress?.province,
            district: showAddress?.district,
            ward: showAddress?.ward,
            address: showAddress?.address,
            phone: showAddress?.phone,
        },
        status: OrderStatus[0],
    };
    // console.log(showAddress);

    const handleOrder = async () => {
        if (showAddress) {
            await createOrder(data, user?.accessToken, toast);
            setTimeout(() => {
                navigate(`/myorder`);
                dispatch(clearCart());
            }, 2000);
        } else {
            toast('Hãy thêm địa chỉ', {
                position: 'top-center',
                autoClose: 2000,
                type: 'warning',
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };

    return (
        <div>
            <ToastContainer />
            <TitleImage title="THANH TOÁN" img={img1} />
            <Container className="p-4">
                <Row>
                    <Col sm={6}>
                        <h4>Địa chỉ nhận hàng</h4>
                        {showAddress ? (
                            <div>
                                <p>
                                    {showAddress.name}, {showAddress.phone} <br /> {showAddress.address},{' '}
                                    {showAddress.ward}, {showAddress.district}, {showAddress.province}
                                    {showAddress.main === true && <span className="ms-2 text-danger">Mặc định</span>}
                                    <a href="#" onClick={() => handleShowAll(showAddress._id)} className="ms-3">
                                        Thay đổi
                                    </a>
                                </p>
                            </div>
                        ) : (
                            <div>
                                <Button
                                    variant="outline-dark"
                                    onClick={handleShow}
                                    className="rounded-0"
                                    style={{ width: '120px' }}
                                >
                                    Thêm địa chỉ
                                </Button>
                                <AddAdress show={show} handleClose={handleClose} disabled={true} />
                            </div>
                        )}
                    </Col>
                    <Col sm={6}>
                        <Card className="rounded-0 w-100 p-2">
                            <Card.Body>
                                <h4>Thanh toán</h4>
                                <Table className="my-3">
                                    <tbody>
                                        {products.map((item) => (
                                            <tr className="align-middle">
                                                <td>
                                                    <ImgSample
                                                        pathImg={item.product.image[0]}
                                                        style={{ height: '50px' }}
                                                    />
                                                </td>
                                                <td>
                                                    {item.product.name} <br /> size: {item.idSize.size}
                                                </td>
                                                <td>x{item.cartQuantity}</td>
                                                <td>
                                                    {item.totalPriceItem.toLocaleString('it-IT')}
                                                    <span>&#8363;</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <h5 className="text-end mt-5" style={{ color: 'var(--font-color)' }}>
                                    Tổng: {total.toLocaleString('it-IT')}
                                    <span>&#8363;</span>
                                </h5>
                                <Button
                                    className="w-25 mt-2 float-end rounded-0"
                                    style={{ backgroundColor: 'var(--primary-color)', border: 'none' }}
                                    onClick={handleOrder}
                                >
                                    Đặt hàng
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            {idSelect && (
                <AllAddress
                    idSelect={handleSelect}
                    show={showAll}
                    allAddress={allAddress}
                    handleCloseAll={handleCloseAll}
                    selectMain={showAddress?._id}
                />
            )}
        </div>
    );
};

export default CheckoutPage;
