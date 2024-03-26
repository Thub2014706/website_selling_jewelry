import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProduct, allType } from '~/services/ProductService';

const FormProduct = ({
    showName,
    showImage,
    showVariants,
    showType,
    showPrice,
    showInformation,
    showDiscount,
    onSubmit,
}) => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    // const axiosJWT = createAxios(user, dispatch);

    const [name, setName] = useState(showName ? showName : '');
    const [image, setImage] = useState(showImage ? showImage : []);
    const [variants, setVariants] = useState(showVariants ? showVariants : []);
    const [type, setType] = useState(showType ? showType : '');
    const [price, setPrice] = useState(showPrice ? showPrice : '');
    const [information, setInformation] = useState(showInformation ? showInformation : '');
    const [discount, setDiscount] = useState(showDiscount ? showDiscount : '');

    const addLink = () => {
        const link = [...image, ''];
        setImage(link);
    };

    const deleteLink = (i) => {
        const link = [...image];
        setImage(link.filter((val, index) => index !== i));
    };

    const handleImg = (e, i) => {
        const inputData = [...image];
        inputData[i] = e.target.value;
        setImage(inputData);
    };

    const handleType = (e) => {
        setType(e.target.value);
    };

    const addSize = () => {
        const add = [...variants, { size: '', inStock: '' }];
        setVariants(add);
    };

    const deleteSize = (i) => {
        const copyAdd = [...variants];
        setVariants(copyAdd.filter((value, index) => index !== i));
    };

    const handleVariants = (e, i) => {
        const { name, value } = e.target;
        const inSize = name === 'size' ? value : variants[i].size;
        const inInStock = name === 'inStock' ? value.replace(/[^\d]/g, '') : variants[i].inStock;
        const copyAdd = [...variants];
        copyAdd[i] = { size: inSize, inStock: inInStock };
        setVariants(copyAdd);
    };

    const handlePrice = (e) => {
        const format = e.target.value.replace(/[^\d]/g, '');
        setPrice(Number(format));
    };

    const handleDiscount = (e) => {
        setDiscount(Number(e.target.value.replace(/[^\d]/g, '').slice(0, 2)));
    };

    const handleInfo = (e, editor) => {
        const data = editor.getData();
        setInformation(data);
    };

    const data = {
        name,
        image,
        type,
        variants,
        price,
        information,
        discount,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await addProduct(data, user?.accessToken, toast);
        onSubmit(data, user?.accessToken, toast);
    };

    const [types, setTypes] = useState(null);

    useEffect(() => {
        const fetchTypes = async () => {
            const data = await allType();
            setTypes(data);
        };
        fetchTypes();
    }, []);

    console.log('kq', data);

    return (
        <div>
            <ToastContainer />
            <Card className="w-50">
                <Card.Body>
                    <Card.Title>Thêm sản phẩm</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Tên sản phẩm
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Nhập tên sản phẩm"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Hình ảnh
                            </Form.Label>
                            <Col sm={10}>
                                Thêm link hình ảnh
                                <Button variant="outline-dark" className="rounded-0 ms-3" onClick={() => addLink()}>
                                    +
                                </Button>
                            </Col>
                            {image.map((data, index) => (
                                <Col key={index} sm={{ span: 10, offset: 2 }} className="mt-3">
                                    <Form.Group as={Row}>
                                        <Col sm={11}>
                                            <Form.Control
                                                type="url"
                                                name="image"
                                                value={data}
                                                placeholder="Nhập link hình ảnh"
                                                required
                                                onChange={(e) => handleImg(e, index)}
                                            />
                                        </Col>
                                        <Col sm={1}>
                                            <Button
                                                variant="outline-dark"
                                                className="rounded-0"
                                                onClick={() => deleteLink(index)}
                                            >
                                                x
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            ))}
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Phân loại
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Select aria-label="Default select example" value={type} onChange={handleType}>
                                    <option value="">---Chọn phân loại---</option>
                                    {types !== null &&
                                        types.map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.name}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column={2}>Kích cỡ - Kho</Form.Label>
                            <Col sm={10}>
                                Thêm kích cỡ và kho
                                <Button variant="outline-dark" className="rounded-0 ms-3" onClick={() => addSize()}>
                                    +
                                </Button>
                            </Col>
                            {variants.map((data, index) => (
                                <Col sm={{ span: 10, offset: 2 }} className="mt-3 w-100">
                                    <Form.Group as={Row}>
                                        <Col sm="auto">
                                            <Form.Control
                                                type="text"
                                                name="size"
                                                value={data.size}
                                                placeholder="Nhập kích cỡ"
                                                required
                                                onChange={(e) => handleVariants(e, index)}
                                            />
                                        </Col>
                                        <Col sm="auto">
                                            <Form.Control
                                                type="text"
                                                name="inStock"
                                                value={data.inStock}
                                                placeholder="Nhập số lượng kho"
                                                required
                                                onChange={(e) => handleVariants(e, index)}
                                            />
                                        </Col>
                                        <Col sm={1}>
                                            <Button
                                                variant="outline-dark"
                                                className="rounded-0"
                                                onClick={() => deleteSize(index)}
                                            >
                                                x
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            ))}
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Giá tiền
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    value={price.toLocaleString('it-IT')}
                                    placeholder="Nhập giá tiền"
                                    required
                                    onChange={handlePrice}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Khuyến mãi (%)
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="discount"
                                    value={discount}
                                    placeholder="Nhập mã khuyến mãi"
                                    onChange={handleDiscount}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Thông tin
                            </Form.Label>
                            <Col sm={10}>
                                <CKEditor
                                    editor={Editor}
                                    data={information}
                                    onReady={(editor) => {
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={handleInfo}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </Col>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="mt-5"
                            style={{ width: '100%', backgroundColor: 'var(--primary-color)', border: 'none' }}
                        >
                            Thêm sản phẩm
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default FormProduct;
