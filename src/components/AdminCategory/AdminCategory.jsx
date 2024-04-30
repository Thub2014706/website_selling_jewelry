import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { allType, allTypeSearch, deleteType } from '~/services/ProductService';
import ModalSelect from '../ModalSelect/ModalSelect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateCategory from '../UpdateCategory/UpdateCategory';
import AdminAddCategories from '../AdminProduct/AdminAddCategories';
import PaginationSearch from '../PaginationSearch/PaginationSearch';

const AdminCategory = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const [types, setTypes] = useState(null);

    const [search, setSearch] = useState('');

    const [number, setNumber] = useState(1);

    const [length, setLength] = useState(1);

    const handleNumber = (number) => {
        setNumber(number);
    };

    const handleSearch = (search) => {
        setSearch(search);
    };


    useEffect(() => {
        const fetchType = async () => {
            const data = await allTypeSearch(search, number, 15);
            setTypes(data.data);
            setLength(data.length)
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
        await deleteType(user.accessToken, toast, idDelete);
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
        <div className="shadow rounded p-5">
            <ToastContainer />
            <Button variant="danger" className="rounded-0" onClick={handleShowAdd}>
                Thêm phân loại
            </Button>
            <PaginationSearch length={length} selectNumber={handleNumber} handleSubmit={handleSearch} />

            {types !== null && (
                <Table bordered striped className="text-center">
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
                                <td>{index + 1 + 15 * (number - 1)}</td>
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
