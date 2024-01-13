import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allProduct } from '~/redux/apiRequest';

const AdminAllProduct = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        allProduct(dispatch);
    }, []);
    const products = useSelector((state) => state.product.getAllProduct.currentProduct);
    console.log(products);

    const sumArray = (array) => {
        let sum = 0;
        array.forEach((element) => {
            sum += element.inStock;
        });
        return sum;
    };
    return (
        <div>
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
                            <tr key={index} className="align-middle">
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
                                    <Link to={`/admin/update-product/${product._id}`}><FontAwesomeIcon icon={faPenToSquare} /></Link>
                                </td>
                                <td className="text-center">
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminAllProduct;
