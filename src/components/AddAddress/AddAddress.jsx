import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import subVn from 'sub-vn';

import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { addAddress, getAllByUser } from '~/services/AddressService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAdress = ({ show, handleClose, disabled }) => {
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

    // const axiosJWT = createAxios(user, dispatch);

    const handlesubmit = async (e) => {
        e.preventDefault();
        const add = await addAddress(data, user?.accessToken, toast);
        if (add === 200) {
            handleClose();
        }
        // console.log(add)
    };

    // const [allAddress, setAllAddress] = useState(null);

    useEffect(() => {
        const fetchAddress = async () => {
            // const addresses = await getAllByUser(user?.accessToken, user?.data.id);
            // setAllAddress(addresses);
            if (!show) {
                setName('');
                setProvince('');
                setDistrict('');
                setWard('');
                setAddress('');
                setPhone('');
                setCheck(true);
            }
        };
        fetchAddress();
    }, []);
    // console.log(allAddress)

    return (
        <div>
            <ToastContainer />
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
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3" as={Row}>
                            <Form.Label column sm={4}>
                                Tỉnh
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Select
                                    value={province}
                                    onChange={handleProvince}
                                    aria-label="Default select example"
                                    required
                                >
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
                                <Form.Select
                                    value={district}
                                    onChange={handleDistrict}
                                    aria-label="Default select example"
                                    required
                                >
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
                                <Form.Select
                                    value={ward}
                                    onChange={handleWard}
                                    aria-label="Default select example"
                                    required
                                >
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
                                    required
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
                                    required
                                />
                            </Col>
                        </Form.Group>

                        {/* {allAddress !== null && ( */}
                        <Col sm={{ offset: 2, span: 10 }}>
                            <Form.Check
                                className="mb-3"
                                type="checkbox"
                                disabled={disabled}
                                value={check}
                                id="check"
                                checked={check}
                                onChange={handleCheck}
                                label="Đặt làm địa chỉ mặc định"
                            />
                        </Col>
                        {/* )} */}
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
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default AddAdress;
