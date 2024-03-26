import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Product from '~/components/Product/Product';
import TitleImage from '~/components/TitleImage/TitleImage';
import { allProduct, allSize, allType, filterAll } from '~/services/ProductService';
import title from '~/assets/images/title3.png';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Star from '~/components/Star/Star';

const ShopPage = () => {
    const [products, setProducts] = useState(null);

    const location = useLocation();
    // const history = useHistory()

    const { type } = useParams();
    console.log(type)

    const search = new URLSearchParams(location.search).get('query'); //lấy giá trị chuỗi truy vấn trên url

    // const [search, setSearch] = useState('')

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

    // const [data, setData] = useState(null);
    const [numberStar, setNumberStar] = useState('');
    const [size, setSize] = useState([]);

    const handleApply = async () => {
        setPriceFrom(valueFrom);
        setPriceTo(valueTo);
        const value = await filterAll({ type, search, priceFrom: valueFrom, priceTo: valueTo, numberStar, size });
        setProducts(value);
    };

    const handleStar = async (number) => {
        if (number === numberStar) {
            setNumberStar('');
            const value = await filterAll({ type, search, priceFrom, priceTo, size });
            setProducts(value);
        } else {
            setNumberStar(number);
            const value = await filterAll({ type, search, priceFrom, priceTo, numberStar: number, size });
            setProducts(value);
        }
    };

    const handleSize = async (thisSize) => {
        if (size.findIndex((item) => item === thisSize) < 0) {
            const copy = [...size, thisSize];
            setSize(copy);
            const value = await filterAll({ type, search, priceFrom, priceTo, numberStar, size: copy });
            setProducts(value);
        } else {
            const data = size.filter((item) => item !== thisSize);
            setSize(data);
            const value = await filterAll({ type, search, priceFrom, priceTo, numberStar, size: data });
            setProducts(value);
        }
    };
    // console.log(size);

    const [sizes, setSizes] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (search) {
                const data = await filterAll({ search });
                setProducts(data);
                setSizes(data);
            } else
            if (type) {
                const data = await filterAll({ type });
                setProducts(data);
                setSizes(data);
            }
            else {
                const data = await filterAll({});
                setProducts(data);
                setSizes(data);
                console.log(data)
            }
        };
        fetchProducts();
    }, [search, type]);

    const [button, setButton] = useState('button3');

    const showPage = () => {
        let copy = [...products];
        // if (data !== null) {
        //     copy = data;
        // }
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
                copy = copy.sort(
                    (a, b) => a.price - (a.price * a.discount) / 100 - (b.price - (b.price * b.discount) / 100),
                );
                break;
            case 'button5':
                copy = copy.sort(
                    (b, a) => b.price - (b.price * b.discount) / 100 - (a.price - (a.price * a.discount) / 100),
                );
                break;

            default:
                break;
        }
        return copy;
    };

    const array = [];

    if (sizes !== null) {
        [...sizes].map((item) =>
            item.variants.map((miniItem) => {
                if (!array.includes(miniItem.size) && miniItem.inStock !== 0) {
                    array.push(miniItem.size);
                }
            }),
        );
    }

    return (
        <div>
            <TitleImage title={type ? type.toUpperCase() : 'SHOP'} img={title} />
            <Container>
                {products !== null && (
                    <Row className="mt-3">
                        <Col sm={3}>
                            <Row>
                                <h5>Khoảng giá</h5>
                                <Form className="">
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                value={valueFrom.toLocaleString('it-IT')}
                                                onChange={handleFrom}
                                                placeholder="Từ"
                                                className="rounded-0"
                                                required
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                value={valueTo.toLocaleString('it-IT')}
                                                onChange={handleTo}
                                                placeholder="Đến"
                                                className="rounded-0"
                                                required
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
                            <Row xs="auto">
                                <Col>
                                    <h5 className="mt-3">Kích cỡ</h5>
                                    {array
                                        .sort((a, b) => a - b)
                                        .map((item) => (
                                            <div
                                                className="ms-2 d-flex text-decoration-none text-black"
                                                key={item}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleSize(item)}
                                            >
                                                <div className="checkbox px-1 me-2">
                                                    {size.find((mini) => mini === item) && (
                                                        <FontAwesomeIcon
                                                            className="check"
                                                            icon={faCheck}
                                                            color="var(--font-color)"
                                                        />
                                                    )}
                                                </div>
                                                <p>{item}cm</p>
                                            </div>
                                        ))}
                                </Col>
                            </Row>
                            <Row xs="auto">
                                <Col>
                                    <h5 className="mt-3">Đánh giá</h5>
                                    <div
                                        className={`p-2 ${numberStar === 5 && 'select-star'}`}
                                        onClick={() => handleStar(5)}
                                    >
                                        <Star number={5} />
                                    </div>
                                    <div
                                        className={`p-2 text-decoration-none text-black d-flex ${
                                            numberStar === 4 && 'select-star'
                                        }`}
                                        onClick={() => handleStar(4)}
                                    >
                                        <Star number={4} />
                                        <h6 className="ms-2">trở lên</h6>
                                    </div>
                                    <div
                                        className={`p-2 text-decoration-none text-black d-flex ${
                                            numberStar === 3 && 'select-star'
                                        }`}
                                        onClick={() => handleStar(3)}
                                    >
                                        <Star number={3} />
                                        <h6 className="ms-2">trở lên</h6>
                                    </div>
                                    <div
                                        className={`p-2 text-decoration-none text-black d-flex ${
                                            numberStar === 2 && 'select-star'
                                        }`}
                                        onClick={() => handleStar(2)}
                                    >
                                        <Star number={2} />
                                        <h6 className="ms-2">trở lên</h6>
                                    </div>
                                    <div
                                        className={`p-2 pt-2text-decoration-none text-black d-flex ${
                                            numberStar === 1 && 'select-star'
                                        }`}
                                        onClick={() => handleStar(1)}
                                    >
                                        <Star number={1} />
                                        <h6 className="ms-2">trở lên</h6>
                                    </div>
                                </Col>
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

export default ShopPage;
