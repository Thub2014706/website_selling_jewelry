import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allType, productDetail, updateProduct } from '~/services/ProductService';

import AdminAddCategories from './AdminAddCategories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ImgSample from '../ImgSample/ImgSample';

const AdminUpdateProduct = ({ show, handleClose, id }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState([]);
    const [deleteImg, setDeleteImg] = useState([]);
    const [imageEncode, setImageEncode] = useState([]);
    const [size, setSize] = useState([]);
    const [inStock, setInStock] = useState([]);
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [information, setInformation] = useState('');
    const [discount, setDiscount] = useState('');

    const user = useSelector((state) => state.auth.login.currentUser);

    // console.log(image);
    useEffect(() => {
        const fetchProductDetail = async () => {
            const data = await productDetail(id);
            setName(data.name);
            setDeleteImg(data.image);
            setSize(data.variants.map((item) => item.size));
            setInStock(data.variants.map((item) => item.inStock));
            setType(data.type);
            setPrice(data.price);
            setInformation(data.information);
            setDiscount(data.discount);
        };
        fetchProductDetail();
    }, [id, show]);

    const deleteImageOld = (img) => {
        const copyImg = [...deleteImg];
        setDeleteImg(copyImg.filter((val) => val !== img)); //cac san pham con lai khi xoa sp nao do
    };

    const deleteImageNew = (img, i) => {
        const copyImg = [...image];
        const copyEncode = [...imageEncode];
        URL.revokeObjectURL(img);
        setImage(copyImg.filter((val, index) => index !== i));
        setImageEncode(copyEncode.filter((val, index) => index !== i));
    };

    const handleImg = (e) => {
        const newFiles = e.target.files;
        const updatedImage = [...image, ...newFiles];
        setImage(updatedImage);
        setImageEncode(Array.from(updatedImage).map((item) => URL.createObjectURL(item)));
    };

    const addSize = () => {
        const addSize = [...size, ''];
        const addInStock = [...inStock, ''];
        setSize(addSize);
        setInStock(addInStock);
    };

    const deleteSize = (i) => {
        const copySize = [...size];
        const copyInStock = [...inStock];
        setSize(copySize.filter((value, index) => index !== i));
        setInStock(copyInStock.filter((value, index) => index !== i));
    };

    const handleSize = (e, i) => {
        const value = e.target.value;
        const copyAdd = [...size];
        copyAdd[i] = value;
        setSize(copyAdd);
    };

    const handleInStock = (e, i) => {
        const copyAdd = [...inStock];
        copyAdd[i] = e.target.value;
        setInStock(copyAdd);
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

    const [types, setTypes] = useState(null);

    const dispatch = useDispatch();

    // const axiosJWT = createAxios(user, dispatch);

    const variants = [];

    for (let i = 0; i < size.length; i++) {
        variants.push({
            size: size[i],
            inStock: inStock[i],
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        image.forEach((image) => formData.append('image', image));
        formData.append('deleteImg', JSON.stringify(deleteImg));
        formData.append('type', type);
        formData.append('variants', JSON.stringify(variants));
        formData.append('price', price);
        formData.append('information', information);
        formData.append('discount', discount);
        const update = await updateProduct(formData, id, user.accessToken, toast);
        if (update === 200) {
            handleClose();
            setImage([]);
            setImageEncode([]);
        }
    };

    useEffect(() => {
        const fetchTypes = async () => {
            const data = await allType();
            setTypes(data);
        };
        fetchTypes();
    }, []);

    const handleType = (e) => {
        setType(e.target.value);
    };

    return (
        <div>
            <Modal show={show} centered size="lg" onHide={handleClose}>
                <ToastContainer />
                <Form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <Modal.Header closeButton>
                        <Modal.Title>Cập nhật sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                <Form.Control
                                    type="file"
                                    name="image"
                                    required={deleteImg.length === 0 ? true : false}
                                    multiple
                                    accept=".jpg, .png"
                                    onChange={(e) => handleImg(e)}
                                />
                            </Col>

                            <Col sm={{ span: 10, offset: 2 }} className="mt-3">
                                {deleteImg.map((item) => (
                                    <div className="p-2" style={{ position: 'relative', display: 'inline-block' }}>
                                        <ImgSample pathImg={item} style={{ height: '90px', width: 'auto' }} />
                                        <Badge
                                            bg="secondary"
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => deleteImageOld(item)}
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </Badge>
                                    </div>
                                ))}
                                {imageEncode.map((item, index) => (
                                    <div className="p-2" style={{ position: 'relative', display: 'inline-block' }}>
                                        <img key={index} src={item} style={{ height: '90px', width: 'auto' }} />
                                        <Badge
                                            bg="secondary"
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => deleteImageNew(item, index)}
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </Badge>
                                    </div>
                                ))}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Phân loại
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Select aria-label="Default select example" value={type} onChange={handleType}>
                                    <option value="">---Chọn phân loại---</option>
                                    {types !== null &&
                                        types.map((item) => <option value={item._id}>{item.name}</option>)}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column={2}>Kích cỡ - Kho</Form.Label>
                            <Col sm={10}>
                                Thêm kích cỡ
                                <Button variant="outline-dark" className="rounded-0 ms-3" onClick={() => addSize()}>
                                    +
                                </Button>
                            </Col>
                            {size?.map((data, index) => (
                                <Col sm={{ span: 10, offset: 2 }} className="mt-3 w-100">
                                    <Form.Group as={Row}>
                                        <Col sm="auto">
                                            <Form.Control
                                                type="text"
                                                name="size"
                                                value={data}
                                                placeholder="Nhập kích cỡ"
                                                required
                                                onChange={(e) => handleSize(e, index)}
                                            />
                                        </Col>
                                        <Col sm="auto">
                                            <Form.Control
                                                type="text"
                                                name="inStock"
                                                value={inStock[index]}
                                                placeholder="Nhập số lượng kho"
                                                required
                                                onChange={(e) => handleInStock(e, index)}
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="rounded-0 px-4" variant="outline-dark" onClick={handleClose}>
                            Huỷ
                        </Button>
                        <Button
                            className="px-4 rounded-0"
                            style={{ backgroundColor: 'var(--font-color)', border: 'none' }}
                            type="submit"
                        >
                            Cập nhật
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminUpdateProduct;
