import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Product from '~/components/Product/Product';
import TitleImage from '~/components/TitleImage/TitleImage';
import { allProduct, allSize, allType, filterAll, filterByPrice, filterByStar } from '~/services/ProductService';
import title from '~/assets/images/title3.png';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faListUl } from '@fortawesome/free-solid-svg-icons';
import Star from '../Star/Star';

const Shop = ({ products }) => {
    const [valueFrom, setValueFrom] = useState('');

    const [valueTo, setValueTo] = useState('');

    const [priceFrom, setPriceFrom] = useState('');

    const [priceTo, setPriceTo] = useState('');

    const handleFrom = (e) => {
        setValueFrom(Number(e.target.value.replace(/[^\d]/g, '')));
    };

    const handleTo = (e) => {
        setValueTo(Number(e.target.value.replace(/[^\d]/g, '')));
    };

    const [data, setData] = useState(null);
    const [numberStar, setNumberStar] = useState('');
    const [size, setSize] = useState([]);

    const handleApply = async () => {
        setPriceFrom(valueFrom);
        setPriceTo(valueTo);
        const value = await filterAll({ priceFrom: valueFrom, priceTo: valueTo, numberStar, size });
        setData(value);
    };

    const handleStar = async (numberStar) => {
        // if ()
        setNumberStar(numberStar);
        const value = await filterAll({ priceFrom, priceTo, numberStar, size });
        setData(value);
    };

    const handleSize = async (thisSize) => {
        if (size.findIndex((item) => item === thisSize) < 0) {
            const copy = [...size, thisSize];
            setSize(copy);
            const value = await filterAll({ priceFrom, priceTo, numberStar, size: copy });
            setData(value);
        } else {
            const data = size.filter((item) => item !== thisSize);
            setSize(data);
            const value = await filterAll({ priceFrom, priceTo, numberStar, size: data });
            setData(value);
        }
    };
    console.log(size);

    const [button, setButton] = useState('button3');

    const showPage = () => {
        let copy = [...products];
        if (data !== null) {
            copy = data;
        }
        switch (button) {
            case 'button1':
                copy = copy.sort((a, b) => b.discount - a.discount);
                break;
            case 'button2':
                copy = copy.sort((a, b) => b.selled - a.selled);
                break;
            case 'button3':
                copy = copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'button4':
                copy = copy.sort((a, b) => a.price - b.price);
                break;
            case 'button5':
                copy = copy.sort((a, b) => b.price - a.price);
                break;

            default:
                break;
        }
        return copy;
    };

    const array = [];

    if (products !== null) {
        [...products].map((item) =>
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
                        {/* <Col sm={3}></Col> */}
                        <Col sm={3}>
                            {/* <Row className="p-3">
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
                            </Row> */}
                            <Row>
                                <h5>Khoảng giá</h5>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                value={valueFrom.toLocaleString('it-IT')}
                                                onChange={handleFrom}
                                                placeholder="Từ"
                                                className="rounded-0"
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                value={valueTo.toLocaleString('it-IT')}
                                                onChange={handleTo}
                                                placeholder="Đến"
                                                className="rounded-0"
                                            />
                                        </Col>
                                    </Row>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => handleApply()}
                                        className="mt-2 rounded-0"
                                    >
                                        Áp dụng
                                    </Button>
                                </Form>
                            </Row>
                            <Row>
                                <h5 className="mt-3">Kích cỡ</h5>
                                {array
                                    .sort((a, b) => a - b)
                                    .map((item) => (
                                        <Button
                                            key={item}
                                            variant="outline-dark rounded-0"
                                            className="me-2"
                                            style={{ width: '50px' }}
                                            onClick={() => handleSize(item)}
                                        >
                                            <h6>{item}</h6>
                                        </Button>
                                    ))}
                            </Row>
                            <Row>
                                <h5 className="mt-3">Đánh giá</h5>
                                <a href="#" onClick={() => handleStar(numberStar === '' ? 5 : '')}>
                                    <Star number={5} />
                                </a>
                                <a href="#" onClick={() => handleStar(numberStar === '' ? 4 : '')}>
                                    <span className="mt-3 d-flex">
                                        <Star number={4} />
                                        <p className="ms-2">trở lên</p>
                                    </span>
                                </a>
                                <a href="#" onClick={() => handleStar(numberStar === '' ? 3 : '')}>
                                    <span className="d-flex">
                                        <Star number={3} />
                                        <p className="ms-2">trở lên</p>
                                    </span>
                                </a>
                                <a href="#" onClick={() => handleStar(numberStar === '' ? 2 : '')}>
                                    <span className="d-flex">
                                        <Star number={2} />
                                        <p className="ms-2">trở lên</p>
                                    </span>
                                </a>
                                <a href="#" onClick={() => handleStar(numberStar === '' ? 1 : '')}>
                                    <span className="d-flex">
                                        <Star number={1} />
                                        <p className="ms-2">trở lên</p>
                                    </span>
                                </a>
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

export default Shop;
