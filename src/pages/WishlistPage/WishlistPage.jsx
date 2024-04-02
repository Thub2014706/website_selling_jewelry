import { faArrowLeft, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImgSample from '~/components/ImgSample/ImgSample';
import TitleImage from '~/components/TitleImage/TitleImage';
import { allFavoriteByUser, deleteFavorite } from '~/services/UserService';
import img from '~/assets/images/title4.png'

const WishlistPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const [products, setProducts] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            const data = await allFavoriteByUser(user?.accessToken, user?.data.id);
            setProducts(data);
        };
        fetch();
    });
    const removeItem = async (id) => {
        await deleteFavorite(user?.accessToken, id, user?.data.id);
    };
    return (
        <div>
            <TitleImage title="DANH SÁCH YÊU THÍCH" img={img} />
            <Container className='py-5'>
                {products !== null && products.length > 0 ? (
                    <Table>
                        <thead>
                            <tr className="text-center">
                                <th className="w-50">Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Tình trạng tồn kho</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr style={{ height: '70px' }}>
                                    <td className="align-middle">
                                        <Link to={`/product/${item._id}`} className="text-decoration-none text-black">
                                            <Row className="d-flex align-items-center justify-content-center">
                                                <Col sm={2}>
                                                    <ImgSample
                                                        pathImg={item.image[0]}
                                                        style={{ height: '60px' }}
                                                        className="me-3"
                                                    />
                                                </Col>
                                                <Col sm={10}>
                                                    <p
                                                        className="text-long align-middle"
                                                        title={item.name}
                                                        style={{ maxWidth: '450px' }}
                                                    >
                                                        {item.name}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </td>
                                    <td className="text-center align-middle" key={item._id}>
                                        {item.discount !== 0 && (
                                            <p className="text-decoration-line-through mb-2">
                                                {item.price.toLocaleString('it-IT')}
                                                <span>&#8363;</span>
                                            </p>
                                        )}
                                        <b>
                                            {(item.price - (item.price * item.discount) / 100).toLocaleString('it-IT')}
                                            <span>&#8363;</span>
                                        </b>
                                    </td>
                                    <td className="text-center align-middle">{item ? 'Còn hàng' : 'Hết hàng'}</td>
                                    <td className="text-center align-middle">
                                        <FontAwesomeIcon
                                            onClick={() => removeItem(item._id)}
                                            icon={faX}
                                            style={{ color: 'rgb(157, 157, 157)1', cursor: 'pointer' }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <Row className="py-5">
                        <Col className="text-center">
                            <h3>Không có sản phẩm nào trong danh sách yêu thích.</h3>
                            <Link className="text-dark h5" to={'/'}>
                                <FontAwesomeIcon icon={faArrowLeft} /> Tiếp tục mua hàng
                            </Link>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default WishlistPage;
