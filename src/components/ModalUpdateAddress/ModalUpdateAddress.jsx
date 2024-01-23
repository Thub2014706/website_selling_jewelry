import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import subVn from 'sub-vn';
import { createAxios } from '~/createInstance';
import { getDetail, updateAddress } from '~/services/AddressService';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

const ModalUpdateAdress = ({ id, show, handleClose }) => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const provinces = subVn.getProvinces();
    const [province, setProvince] = useState('');
    const [nameProvince, setNameProvince] = useState('');
    const districts = subVn.getDistrictsByProvinceCode(province);
    const [district, setDistrict] = useState('');
    const [nameDistrict, setNameDistrict] = useState('');
    const wards = subVn.getWardsByDistrictCode(district);
    const [ward, setWard] = useState('');

    useEffect(() => {
        const fetchAddress = async () => {
            const data = await getDetail(axiosJWT, user?.accessToken, id);
            const idProvince = provinces.find((item) => item.name === data.province);
            const codeProvince = idProvince.code;
            const inDistricts = subVn.getDistrictsByProvinceCode(codeProvince);
            const idDistrict = inDistricts.find((item) => item.name === data.district);
            const codeDistrict = idDistrict.code;
            setProvince(codeProvince);
            setNameProvince(data.province);
            setDistrict(codeDistrict);
            setNameDistrict(data.district);
            setWard(data.ward);
            setAddress(data.address);
            setPhone(data.phone);
            setCheck(data.main);
            console.log(data);
        };
        fetchAddress();
    }, [id]);

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

    const [check, setCheck] = useState(false);

    const handleCheck = () => {
        setCheck(!check);
    };

    const data = {
        province: nameProvince,
        district: nameDistrict,
        ward,
        address,
        phone,
        main: check,
        user: user?.data.id,
    };
    // console.log("gff",check)

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const handlesubmit = async (e) => {
        e.preventDefault();
        await updateAddress(axiosJWT, data, user?.accessToken, id);
    };
    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật địa chỉ</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center p-5">
                <Form onSubmit={handlesubmit}>
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

                    <Form.Group className="mb-3" controlId="formBasicEmail" as={Row}>
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

                    <Form.Group className="mb-3" controlId="formBasicEmail" as={Row}>
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

                    {check === true ? (
                        <Col sm={{ offset: 2, span: 10 }}>
                            <Form.Check
                                className="mb-3"
                                type="checkbox"
                                disabled
                                value={check}
                                id="check"
                                onChange={handleCheck}
                                checked={check}
                                label="Đặt làm địa chỉ mặc định (disabled)"
                                data-bs-toggle="tooltip"
                                title="Bạn không thể xóa mặc định. Hãy chọn địa chỉ khác làm mặc định!"
                            />
                        </Col>
                    ) : (
                        <Col sm={{ offset: 2, span: 10 }}>
                            <Form.Check
                                className="mb-3"
                                type="checkbox"
                                value={check}
                                id="check"
                                onChange={handleCheck}
                                label="Đặt làm địa chỉ mặc định"
                            />
                        </Col>
                    )}

                    <Button
                        className="w-100 rounded-0"
                        style={{ backgroundColor: 'var(--primary-color)', border: 'none' }}
                        type="submit"
                        onClick={handleClose}
                    >
                        Cập nhật
                    </Button>
                </Form>
                {/* </Card.Body>
                </Card> */}
            </Modal.Body>
        </Modal>
    );
};

export default ModalUpdateAdress;
