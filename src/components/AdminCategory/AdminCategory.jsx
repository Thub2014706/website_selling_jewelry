import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { allType, deleteType } from '~/services/ProductService';
import ModalSelect from '../ModalSelect/ModalSelect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateCategory from '../UpdateCategory/UpdateCategory';
import AdminAddCategories from '../AdminProduct/AdminAddCategories';

const AdminCategory = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const [types, setTypes] = useState(null);

    useEffect(() => {
        const fetchType = async () => {
            const data = await allType();
            setTypes(data);
        };
        fetchType();
    }, [types]);

    const [show, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState(null);

    const handleShow = (id) => {
        setShow(true);
        setIdDelete(id);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = async () => {
        await deleteType(user.accessToken, toast, axiosJWT, idDelete);
        setShow(false);
    };

    const [showUpdate, setShowUpdate] = useState(false);

    const [idUpdate, setIdUpdate] = useState(null);

    const handleCloseUpdate = () => {
        setShowUpdate(false);
    };
    const handleShowUpdate = (id) => {
        setShowUpdate(true);
        setIdUpdate(id);
    };

    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => {
        setShowAdd(false);
    };
    const handleShowAdd = () => {
        setShowAdd(true);
    };

    // console.log(idUpdate)

    return (
        <div>
            <ToastContainer />
            <Button variant="danger" className="rounded-0" onClick={handleShowAdd}>
                Thêm phân loại
            </Button>
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
                            <tr key={index}>
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
                    <AdminAddCategories show={showAdd} handleClose={handleCloseAdd} />
                    {idUpdate && <UpdateCategory id={idUpdate} show={showUpdate} handleClose={handleCloseUpdate} />}
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
