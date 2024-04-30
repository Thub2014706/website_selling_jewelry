import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import UpdateAdress from '../../components/UpdateAddress/UpdateAddress';
import AddAdress from '../../components/AddAddress/AddAddress';
import { deleteByUser, getAllByUser } from '~/services/AddressService';
import Modal from '~/components/ModalSelect/ModalSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AllAddressPage = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const [allAddress, setAllAddress] = useState(null);

    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => {
        setShowAdd(false);
    };

    const handleShowAdd = () => {
        setShowAdd(true);
    };

    const [showUpdate, setShowUpdate] = useState(false);

    const [idShow, setIdShow] = useState(null);

    const handleCloseUpdate = () => {
        setShowUpdate(false);
    };

    const handleShowUpdate = (id) => {
        setShowUpdate(true);
        setIdShow(id);
    };

    useEffect(() => {
        const fetchAll = async () => {
            const data = await getAllByUser(user?.accessToken, user?.data.id);
            setAllAddress(data);
        };
        fetchAll();
    }, [allAddress, handleCloseUpdate, handleCloseAdd]);

    const [select, setSelect] = useState(false);

    const [idDelete, setIdDelete] = useState(null);

    const handleShowModal = (id) => {
        setSelect(true);
        setIdDelete(id);
    };

    const handleCloseModal = (id) => {
        setSelect(false);
        setIdDelete(null);
    };

    const handleDeleteAddress = async () => {
        await deleteByUser(user?.accessToken, idDelete);
    };

    return (
        <Container className="py-5">
            <Row>
                <Col>
                    <h3>Địa chỉ của tôi</h3>
                </Col>
                <Col>
                    <Button
                        className="px-4 rounded-0 float-end"
                        onClick={() => handleShowAdd()}
                        style={{ backgroundColor: 'var(--font-color)', border: 'none' }}
                    >
                        Thêm địa chỉ
                    </Button>
                </Col>
            </Row>
            {allAddress !== null ? (
                allAddress.length > 0 ? (
                    allAddress.map((item) => (
                        <Row>
                            <hr />
                            <Col>
                                <h5>
                                    {item.name} | {item.phone}
                                </h5>
                                <p>
                                    {item.address}, {item.ward}, {item.district}, {item.province}
                                    {item.main && <p className="ms-3 text-danger">Mặc định</p>}
                                </p>
                            </Col>
                            <Col>
                                <a href="#" onClick={() => handleShowUpdate(item._id)} className="float-end">
                                    Cập nhật
                                </a>
                                <br />
                                {!item.main && (
                                    <a href="#" onClick={() => handleShowModal(item._id)} className="float-end">
                                        Xoá
                                    </a>
                                )}
                            </Col>
                        </Row>
                    ))
                ) : (
                    <Row className='mt-3'>
                        <hr />
                        <Col className="text-center py-5">
                            <h3>Bạn chưa có địa chỉ nào.</h3>
                            <Link className="text-dark h5" to={'/'}>
                                <FontAwesomeIcon icon={faArrowLeft} /> Tiếp tục mua hàng
                            </Link>
                        </Col>
                    </Row>
                )
            ) : (
                <p>Loading...</p>
            )}
            {idShow && <UpdateAdress id={idShow} show={showUpdate} handleClose={handleCloseUpdate} />}
            <AddAdress show={showAdd} handleClose={handleCloseAdd} disabled={allAddress?.length === 0 ? true : false} />
            <Modal
                text="Bạn chắc chắn muốn xóa địa chỉ này?"
                accept="Xóa"
                cancel="Hủy"
                show={select}
                handleAction={() => handleDeleteAddress()}
                handleClose={handleCloseModal}
            />
        </Container>
    );
};

export default AllAddressPage;
