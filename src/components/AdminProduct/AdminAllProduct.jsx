import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allProduct, deleteProduct } from '~/services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../ModalSelect/ModalSelect';
import { createAxios } from '~/createInstance';
import Search from '~/layouts/components/Search/Search';
import { searchProducts } from '~/redux/productSlice';

const AdminAllProduct = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch);

    const [products, setProducts] = useState(null);

    const [search, setSearch] = useState('');

    const searchInput = (e) => {
        setSearch(e.target.value);
    };

    const deleteSearch = () => {
        setSearch('')
    }

    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         e.preventDefault();
    //         // dispatch(searchProducts(search));
    //     }
    // };

    // const handleSearch = () => {
    //     // dispatch(searchProducts(search));
    // };

    useEffect(() => {
        const fetchAllProduct = async () => {
            const data = await allProduct();
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
            return () => clearTimeout(timer)
        };
        fetchAllProduct();
    }, [products]);
    // console.log(products);

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

    const handleDelete = () => {
        deleteProduct(idP, user.accessToken, toast, axiosJWT);
        setShow(false);
    };

    return (
        <div>
            <ToastContainer />
            <Row className="mb-4">
                <Search
                    color="black"
                    search={search}
                    searchInput={searchInput}
                    deleteSearch={deleteSearch}
                    // handleSearch={handleSearch}
                    // handleKeyDown={handleKeyDown}
                />
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
                            {products.map((product, index) => (
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
                                    <td className="text-center">{product.type}</td>
                                    <td className="text-center">
                                        <Link to={`/admin/update-product/${product._id}`}>
                                            <FontAwesomeIcon icon={faPenToSquare} color="black" />
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <FontAwesomeIcon
                                            onClick={() => handleShow(product._id)}
                                            icon={faTrashCan}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <Modal
                            text="Bạn chắc chắn muốn xóa sản phẩm này?"
                            accept="Xóa"
                            cancel="Hủy"
                            show={show}
                            handleAction={() => handleDelete()}
                            handleClose={handleClose}
                        />
                    </Table>
                ) : (
                    <p>Loading...</p>
                )}
            </Row>
        </div>
    );
};

export default AdminAllProduct;
