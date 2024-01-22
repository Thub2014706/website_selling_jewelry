import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import subVn from 'sub-vn';
import { createAxios } from '~/createInstance';
import { addAddress, getDetail, updateAddress } from '~/services/AddressService';

const FormAddress = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const { id } = useParams();

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
            setCheck(data.check);
            console.log(data.district);
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
    console.log(data);

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const handlesubmit = async (e) => {
        e.preventDefault();
        await updateAddress(axiosJWT, data, user?.accessToken);
    };

    return (
        <div>
            <Card className="w-50">
                <Card.Body>
                    <Card.Title>Thêm địa chỉ</Card.Title>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tỉnh</Form.Label>
                            <Form.Select value={province} onChange={handleProvince} aria-label="Default select example">
                                <option value="">---Chọn Tỉnh---</option>
                                {provinces.map((item) => (
                                    <option value={item.code}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Quận / Huyện</Form.Label>
                            <Form.Select value={district} onChange={handleDistrict} aria-label="Default select example">
                                <option value="">---Chọn Quận / Huyện---</option>
                                {districts.map((item) => (
                                    <option value={item.code}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Xã / Phường</Form.Label>
                            <Form.Select value={ward} onChange={handleWard} aria-label="Default select example">
                                <option value="">---Chọn Xã / Phường---</option>
                                {wards.map((item) => (
                                    <option value={item.name}>{item.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={handleAddress}
                                placeholder="Nhập địa chỉ"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                value={phone}
                                onChange={handlePhone}
                                placeholder="Nhập số điện thoại"
                            />
                        </Form.Group>
                        <Form.Check
                            className="mb-3"
                            type="checkbox"
                            value={check}
                            id="check"
                            onClick={handleCheck}
                            label="Đặt làm địa chỉ mặc định"
                        />

                        <Button variant="primary" type="submit" onClick={handlesubmit}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default FormAddress;
