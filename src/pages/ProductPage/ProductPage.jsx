import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Product from '~/components/Product/Product';
import TitleImage from '~/components/TitleImage/TitleImage';
import { allProduct, allSize, allType } from '~/services/ProductService';
import title from '~/assets/images/title3.png';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faListUl } from '@fortawesome/free-solid-svg-icons';

const ProductPage = () => {
    const location = useLocation();

    const search = new URLSearchParams(location.search).get('query'); //lấy giá trị chuỗi truy vấn trên url

    const [products, setProducts] = useState(null);

    const [types, setTypes] = useState(null);

    const [size, setSize] = useState('');

    const [sizes, setSizes] = useState(null);

    const [button, setButton] = useState('button3');

    const [type, setType] = useState('');
    // console.log(types, products);

    // console.log(types);
    const [priceFrom, setPriceFrom] = useState('');

    const [priceTo, setPriceTo] = useState('');

    const handleFrom = (e) => {
        setPriceFrom(Number(e.target.value.replace(/[^\d]/g, '')));
    };

    const handleTo = (e) => {
        setPriceTo(Number(e.target.value.replace(/[^\d]/g, '')));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await allProduct();
            const dataType = await allType();
            const dataSize = await allSize()
            setTypes(dataType.filter((item) => item.father === null));
            setSizes(dataSize)
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
            } else if (type === '' && size === '') {
                setProducts(data);
            } else if (type !== '') {
                const findType = dataType.find((val) => val.name === type);
                setProducts(data.filter((item) => item.type === findType._id));
            } else if (size !== '') {
                const value = data.filter((item) => item.variants.some((mini) => mini.size === size));
                // console.log(value)
                setProducts(value);
            }
        };
        fetchProducts();
    }, [search, type, size]);
    // console.log(sizes);

    const [dataPrice, setDataPrice] = useState(null);

    const handleApply = () => {
        const value = products.filter((item) => item.price <= priceTo && item.price >= priceFrom);
        setDataPrice(value);
    };

    const showPage = () => {
        if (dataPrice !== null) {
            if (button === 'button1') {
                return dataPrice.sort((a, b) => b.discount - a.discount);
            }
            if (button === 'button2') {
                return dataPrice.sort((a, b) => b.selled - a.selled);
            }
            if (button === 'button3') {
                return dataPrice.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
            if (button === 'button4') {
                return dataPrice.sort((a, b) => a.price - b.price);
            }
            if (button === 'button5') {
                return dataPrice.sort((a, b) => b.price - a.price);
            }
        } else {
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
                return products.sort((a, b) => a.price - b.price);
            }
            if (button === 'button5') {
                return products.sort((a, b) => b.price - a.price);
            }
        }
        return products;
    };

    const array = [];

    if (sizes !== null) {
        sizes.map((item) =>
            item.variants.map((miniItem) => {
                if (!array.includes(miniItem.size) && miniItem.inStock !== 0) {
                    array.push(miniItem.size);
                }
            }),
        );
    }

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
                                        <Button
                                            key={item._id}
                                            variant="link"
                                            className="text-black text-decoration-none"
                                            onClick={() => setType(item.name)}
                                        >
                                            <span className="d-flex">
                                                <FontAwesomeIcon
                                                    icon={faCaretRight}
                                                    className="me-2"
                                                    color={type === item.name ? 'var(--font-color)' : 'white'}
                                                />
                                                <h6
                                                    style={{
                                                        color: type === item.name ? 'var(--font-color)' : 'black',
                                                    }}
                                                >
                                                    {item.name}
                                                </h6>
                                            </span>
                                        </Button>
                                    ))}
                            </Row>
                            <Row>
                                <h5>Khoảng giá</h5>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                value={priceFrom.toLocaleString('it-IT')}
                                                onChange={handleFrom}
                                                placeholder="Từ"
                                                className="rounded-0"
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                value={priceTo.toLocaleString('it-IT')}
                                                onChange={handleTo}
                                                placeholder="Đến"
                                                className="rounded-0"
                                            />
                                        </Col>
                                    </Row>
                                    <Button variant="outline-danger" onClick={handleApply} className="mt-2 rounded-0">
                                        Áp dụng
                                    </Button>
                                </Form>
                            </Row>
                            <Row>
                                <h5 className="mt-3">Kích cỡ</h5>
                                {array
                                    .sort((a, b) => a - b)
                                    .map((item) => (
                                        <Button key={item} onClick={() => setSize(item)} variant="link">
                                            <h6>{item}</h6>
                                        </Button>
                                    ))}
                            </Row>
                        </Col>
                        <Col sm={9}>
                            <Row className="p-2 shadow">
                                <Col sm={8}>
                                    <h5>{showPage().length} sản phẩm</h5>
                                </Col>
                                <Col sm={4} className="float-end">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={3}>
                                            Sắp xếp:{' '}
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Select
                                                aria-label="Default select example"
                                                value={button}
                                                className="rounded-0"
                                                onChange={(e) => setButton(e.target.value)}
                                            >
                                                <option value="button1">Khuyến mãi</option>
                                                <option value="button2">Bán chạy</option>
                                                <option value="button3">Mới nhất</option>
                                                <option value="button4">Giá thấp đến cao</option>
                                                <option value="button5">Giá cao đến thấp</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                {showPage().map((product) => (
                                    <Col key={product._id} sm={4}>
                                        <Link to={`/product/${product._id}`} className="text-decoration-none">
                                            <Product
                                                key={product._id}
                                                image={product.image}
                                                name={product.name}
                                                price={product.price}
                                                discount={product.discount}
                                            />
                                        </Link>
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
