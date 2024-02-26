import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allProduct, allType, deleteProduct } from '~/services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../ModalSelect/ModalSelect';
import { createAxios } from '~/createInstance';
import Search from '~/layouts/components/Search/Search';
import { searchProducts } from '~/redux/productSlice';
import AdminUpdateProduct from './AdminUpdateProduct';
import AdminAddProduct from './AdminAddProduct';

const AdminAllProduct = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch);

    const [products, setProducts] = useState(null);

    const [categories, setCategories] = useState(null);

    const [search, setSearch] = useState('');

    const searchInput = (e) => {
        setSearch(e.target.value);
    };

    const deleteSearch = () => {
        setSearch('');
    };

    useEffect(() => {
        const fetchAllProduct = async () => {
            const data = await allProduct();
            const dataType = await allType();
            setCategories(dataType);
            const timer = setTimeout(() => {
                if (search !== '') {
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
                } else {
                    setProducts(data);
                }
            }, 1200);
            return () => clearTimeout(timer);
        };
        fetchAllProduct();
    }, [products]);
    // console.log(categories);

    const sumArray = (array) => {
        let sum = 0;
        array.forEach((element) => {
            sum += element.inStock;
        });
        return sum;
    };

    const [show, setShow] = useState(false);
    const [idP, setIdP] = useState(null);

    const handleShow = (id) => {
        setShow(true);
        setIdP(id);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = async () => {
        await deleteProduct(idP, user.accessToken, toast, axiosJWT);
        setShow(false);
    };

    const [showUpdate, setShowUpdate] = useState(false);
    // const [idShow, setIdShow] = useState(null);

    const handleCloseUpdate = () => {
        setShowUpdate(false);
    };
    const handleShowUpdate = (id) => {
        setShowUpdate(true);
        setIdP(id);
    };

    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => {
        setShowAdd(false);
    };
    const handleShowAdd = () => {
        setShowAdd(true);
    };

    return (
        <div>
            <ToastContainer />
            <Row className="mb-4">
                <Col>
                    <Search
                        color="black"
                        search={search}
                        searchInput={searchInput}
                        deleteSearch={deleteSearch}
                        // handleSearch={handleSearch}
                        // handleKeyDown={handleKeyDown}
                    />
                </Col>
                <Col>
                    <Button variant="danger" className="rounded-0" onClick={handleShowAdd}>
                        Thêm sản phẩm
                    </Button>
                    <AdminAddProduct show={showAdd} handleClose={handleCloseAdd} />
                </Col>
            </Row>
            <Row>
                {products !== null ? (
                    <Table bordered striped>
                        <thead>
                            <tr className="text-center">
                                <th>STT</th>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Kho</th>
                                <th>Phân loại</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => {
                                let idType = categories.find((item) => item._id === product.type);
                                return (
                                    <tr key={product._id} className="align-middle">
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">
                                            <img src={product.image[0]} style={{ height: '50px' }} alt="" />
                                        </td>
                                        <td>{product.name}</td>
                                        <td className="text-center">
                                            {product.price.toLocaleString('it-IT')}
                                            <span>&#8363;</span>
                                        </td>
                                        <td className="text-center">{sumArray(product.variants)}</td>
                                        {idType ? (
                                            <td className="text-center">{idType.name}</td>
                                        ) : (
                                            <td className="text-center">(Không có)</td>
                                        )}
                                        <td className="text-center">
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                                color="green"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleShowUpdate(product._id)}
                                            />
                                        </td>
                                        <td className="text-center">
                                            <FontAwesomeIcon
                                                color="red"
                                                onClick={() => handleShow(product._id)}
                                                icon={faTrashCan}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <Modal
                            text="Bạn chắc chắn muốn xóa sản phẩm này?"
                            accept="Xóa"
                            cancel="Hủy"
                            show={show}
                            handleAction={() => handleDelete()}
                            handleClose={handleClose}
                        />
                        {idP && <AdminUpdateProduct show={showUpdate} handleClose={handleCloseUpdate} id={idP} />}
                    </Table>
                ) : (
                    <p>Loading...</p>
                )}
            </Row>
        </div>
    );
};

export default AdminAllProduct;
