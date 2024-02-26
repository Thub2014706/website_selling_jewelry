import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Product from '~/components/Product/Product';
import TitleImage from '~/components/TitleImage/TitleImage';
import { allProduct, allType } from '~/services/ProductService';
import title from '~/assets/images/title3.png';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faListUl } from '@fortawesome/free-solid-svg-icons';

const ProductPage = () => {
    // const search = useSelector((state) => state.product.search);
    const location = useLocation();

    const search = new URLSearchParams(location.search).get('query'); //lấy giá trị chuỗi truy vấn trên url

    const [products, setProducts] = useState(null);

    const [types, setTypes] = useState(null);

    const [button, setButton] = useState('');

    const [type, setType] = useState('');
    console.log(types, products);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await allProduct();
            const dataType = await allType();
            setTypes(dataType.filter((item) => item.father === null));
            console.log(search);
            if (search) {
                const newData = data.filter((item) =>
                    item.name
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                        .includes(
                            search
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '')
                                .toLowerCase(),
                        ),
                );
                setProducts(newData);
            } else if (type === '') {
                setProducts(data);
            } else if (type !== '') {
                const findType = dataType.find((val) => val.name === type);
                setProducts(data.filter((item) => item.type === findType._id));
            }
        };
        fetchProducts();
    }, [search, type]);

    const showPage = () => {
        if (button === 'button1') {
            return products.sort((a, b) => b.discount - a.discount);
        }
        if (button === 'button2') {
            return products.sort((a, b) => b.selled - a.selled);
        }
        if (button === 'button3') {
            return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        if (button === 'button4') {
            return products.sort((a, b) => b.price - a.price);
        }
        if (button === 'button5') {
            return products.sort((a, b) => a.price - b.price);
        }
        return products;
    };

    // console.log(types);

    return (
        <div>
            <TitleImage title="SHOP" img={title} />
            <Container>
                {products !== null && (
                    <Row className="mt-3">
                        <Col sm={3}>
                            <Row className="p-3">
                                <h5 className="mt-1">
                                    <FontAwesomeIcon icon={faListUl} className="me-2" /> Tất cả danh mục
                                </h5>
                                <hr />
                                {types !== null &&
                                    types.map((item) => (
                                        <a
                                            key={item._id}
                                            href="#"
                                            className="text-black text-decoration-none"
                                            onClick={() => setType(item.name)}
                                        >
                                            <span className="d-flex">
                                                <FontAwesomeIcon icon={faCaretRight} className="me-2" color={type === item.name ? 'var(--font-color)' : 'white'} />
                                                <h6 style={{color: type === item.name ? 'var(--font-color)' : 'black'}}>{item.name}</h6>
                                            </span>
                                        </a>
                                    ))}
                            </Row>
                        </Col>
                        <Col sm={9}>
                            <Row className="p-3 shadow">
                                <span className="d-flex">
                                    <h5 className="mt-1">Sắp xếp theo: </h5>
                                    <Button
                                        variant="light"
                                        style={{ border: button === 'button1' ? '1px solid #9a702a' : '' }}
                                        className="rounded-0 ms-2"
                                        onClick={() => setButton('button1')}
                                    >
                                        Khuyến mãi
                                    </Button>
                                    <Button
                                        variant="light"
                                        style={{ border: button === 'button2' ? '1px solid #9a702a' : '' }}
                                        className="rounded-0 ms-2"
                                        onClick={() => setButton('button2')}
                                    >
                                        Bán chạy
                                    </Button>
                                    <Button
                                        variant="light"
                                        style={{ border: button === 'button3' ? '1px solid #9a702a' : '' }}
                                        className="rounded-0 ms-2"
                                        onClick={() => setButton('button3')}
                                    >
                                        Mới nhất
                                    </Button>
                                    <Button
                                        variant="light"
                                        style={{ border: button === 'button4' ? '1px solid #9a702a' : '' }}
                                        className="rounded-0 ms-2"
                                        onClick={() => setButton('button4')}
                                    >
                                        Giá cao đến thấp
                                    </Button>
                                    <Button
                                        variant="light"
                                        style={{ border: button === 'button5' ? '1px solid #9a702a' : '' }}
                                        className="rounded-0 ms-2"
                                        onClick={() => setButton('button5')}
                                    >
                                        Giá thấp đến cao
                                    </Button>
                                </span>
                            </Row>
                            <Row className="mt-4">
                                {showPage().map((product) => (
                                    <Col key={product._id} sm={4}>
                                        <Product
                                            key={product._id}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            discount={product.discount}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default ProductPage;
