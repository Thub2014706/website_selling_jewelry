import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import subVn from 'sub-vn';
import { createAxios } from '~/createInstance';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { addAddress, getAllByUser } from '~/services/AddressService';

const AddAdress = ({ show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const [name, setName] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const provinces = subVn.getProvinces();
    const [province, setProvince] = useState('');
    const [nameProvince, setNameProvince] = useState('');
    const districts = subVn.getDistrictsByProvinceCode(province);
    const [district, setDistrict] = useState('');
    const [nameDistrict, setNameDistrict] = useState('');
    const wards = subVn.getWardsByDistrictCode(district);
    const [ward, setWard] = useState('');

    const handleProvince = (e) => {
        const code = e.target.value;
        setProvince(code);
        const idProvince = provinces.find((item) => item.code === code);
        setNameProvince(idProvince.name);
    };

    const handleDistrict = (e) => {
        const code = e.target.value;
        setDistrict(code);
        const idDistrict = districts.find((item) => item.code === code);
        setNameDistrict(idDistrict.name);
    };

    const handleWard = (e) => {
        setWard(e.target.value);
    };

    const [address, setAddress] = useState('');

    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const [phone, setPhone] = useState('');

    const handlePhone = (e) => {
        const data = e.target.value.replace(/[^\d]/g, '');
        setPhone(data);
    };

    const [check, setCheck] = useState(true);

    const handleCheck = () => {
        setCheck(!check);
    };

    const data = {
        name,
        province: nameProvince,
        district: nameDistrict,
        ward,
        address,
        phone,
        main: check,
        user: user?.data.id,
    };

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const handlesubmit = async (e) => {
        e.preventDefault();
        await addAddress(axiosJWT, data, user?.accessToken);
    };

    const [allAddress, setAllAddress] = useState(null);

    useEffect(() => {
        const fetchAddress = async () => {
            const addresses = await getAllByUser(axiosJWT, user?.accessToken, user?.data.id);
            setAllAddress(addresses);
        };
        fetchAddress();
    }, []);

    return (
        <Modal centered backdrop="static" show={show} handleClose={handleClose}>
            <Form onSubmit={handlesubmit}>
                <Modal.Header>
                    <Modal.Title>Thêm địa chỉ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" as={Row} controlId="formBasicEmail">
                        <Form.Label column sm={4}>
                            Tên nhận hàng
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={handleName}
                                placeholder="Nhập tên nhận hàng"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={4}>
                            Tỉnh
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Select value={province} onChange={handleProvince} aria-label="Default select example">
                                <option value="">---Chọn Tỉnh---</option>
                                {provinces.map((item) => (
                                    <option value={item.code}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={4}>
                            Quận / Huyện
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Select value={district} onChange={handleDistrict} aria-label="Default select example">
                                <option value="">---Chọn Quận / Huyện---</option>
                                {districts.map((item) => (
                                    <option value={item.code}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={4}>
                            Xã / Phường
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Select value={ward} onChange={handleWard} aria-label="Default select example">
                                <option value="">---Chọn Xã / Phường---</option>
                                {wards.map((item) => (
                                    <option value={item.name}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row} controlId="formBasicEmail">
                        <Form.Label column sm={4}>
                            Địa chỉ
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={handleAddress}
                                placeholder="Nhập địa chỉ"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row} controlId="formBasicEmail">
                        <Form.Label column sm={4}>
                            Số điện thoại
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                value={phone}
                                onChange={handlePhone}
                                placeholder="Nhập số điện thoại"
                            />
                        </Col>
                    </Form.Group>

                    {allAddress !== null && allAddress.length === 0 ? (
                        <Col sm={{ offset: 2, span: 10 }}>
                            <Form.Check
                                className="mb-3"
                                type="checkbox"
                                disabled
                                value={check}
                                id="check"
                                checked={check}
                                onChange={handleCheck}
                                label="Đặt làm địa chỉ mặc định"
                            />
                        </Col>
                    ) : (
                        <Col sm={{ offset: 2, span: 10 }}>
                            <Form.Check
                                className="mb-3"
                                type="checkbox"
                                value={check}
                                id="check"
                                checked={check}
                                onChange={handleCheck}
                                label="Đặt làm địa chỉ mặc định"
                            />
                        </Col>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="rounded-0 px-4"
                        variant='outline-dark'
                        onClick={handleClose}
                    >
                        Huỷ
                    </Button>
                    <Button
                        className="px-4 rounded-0"
                        style={{ backgroundColor: 'var(--font-color)', border: 'none' }}
                        onClick={handleClose}
                        type="submit"
                    >
                        Thêm
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddAdress;
