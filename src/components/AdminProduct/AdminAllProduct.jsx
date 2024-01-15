import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allProduct, deleteProduct } from '~/services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../ModalSelect/ModalSelect';

const AdminAllProduct = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [products, setProducts] = useState(null);
    useEffect(() => {
        const fetchAllProduct = async () => {
            const data = await allProduct();
            setProducts(data);
        };
        fetchAllProduct();
    }, [products]);
    console.log(products);

    const sumArray = (array) => {
        let sum = 0;
        array.forEach((element) => {
            sum += element.inStock;
        });
        return sum;
    };

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id, user.accessToken, toast);
        setShow(false);
    };

    return (
        <div>
            <ToastContainer />
            {products !== null ? (
                <Table bordered>
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
                        {products !== null ? (
                            products.map((product, index) => (
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
                                            <FontAwesomeIcon icon={faPenToSquare} color='black'/>
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <FontAwesomeIcon onClick={handleShow} icon={faTrashCan} style={{ cursor: 'pointer' }} />
                                    </td>
                                    <Modal
                                        text="Bạn chắc chắn muốn xóa sản phẩm này?"
                                        accept="Xóa"
                                        cancel="Hủy"
                                        show={show}
                                        handleAction={() => handleDelete(product._id)}
                                        handleClose={handleClose}
                                    />
                                </tr>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </tbody>
                </Table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminAllProduct;
