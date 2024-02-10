import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { allType, deleteType } from '~/services/ProductService';
import ModalSelect from '../ModalSelect/ModalSelect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateCategory from '../UpdateCategory/UpdateCategory';

const AdminCategory = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const [types, setTypes] = useState(null);

    useEffect(() => {
        const fetchType = async () => {
            const data = await allType(user?.accessToken, axiosJWT);
            setTypes(data);
        };
        fetchType();
    }, [types]);

    const [show, setShow] = useState(false);
    const [idType, setIdType] = useState(null);

    const handleShow = (id) => {
        setShow(true);
        setIdType(id);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = async () => {
        await deleteType(user.accessToken, toast, axiosJWT, idType);
        setShow(false);
    };

    const [showUpdate, setShowUpdate] = useState(false);

    const handleCloseUpdate = () => {
        setShowUpdate(false);
    };
    const handleShowUpdate = (id) => {
        setShowUpdate(true);
        setIdType(id);
    };

    return (
        <div>
            <ToastContainer />
            {types !== null && (
                <Table bordered striped className="w-50 text-center">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên danh mục</th>
                            <th>Danh mục cha</th>
                            <th>Sửa</th>
                            <th>Xoá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.father}</td>
                                <td className="text-center">
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        color="green"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleShowUpdate(item._id)}
                                    />
                                </td>
                                <td className="text-center">
                                    <FontAwesomeIcon
                                        color="red"
                                        onClick={() => handleShow(item._id)}
                                        icon={faTrashCan}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <UpdateCategory id={idType} show={showUpdate} handleClose={handleCloseUpdate} />
                    <ModalSelect
                        text="Bạn chắc chắn muốn xóa phân loại này?"
                        accept="Xóa"
                        cancel="Hủy"
                        show={show}
                        handleAction={() => handleDelete()}
                        handleClose={handleClose}
                    />
                </Table>
            )}
        </div>
    );
};

export default AdminCategory;
