import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';
import {
    getAllFailed,
    getAllStart,
    getAllSuccess,
    getDetailFailed,
    getDetailStart,
    getDetailSuccess,
} from './productSlice';

export const loginUser = async (user, dispatch, navigate, toast) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signin`, user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
        if (error.response) {
            toast(error.response.data.message, {
                position: 'top-center',
                autoClose: 2000,
                type: 'error',
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            console.log('Lỗi mạng');
            alert('Lỗi mạng');
        }
    }
};

export const registerUser = async (user, dispatch, navigate, toast) => {
    dispatch(registerStart());
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signup`, user);
        dispatch(registerSuccess());
        toast('Đăng ký thành công', {
            position: 'top-center',
            autoClose: 2000,
            type: 'success',
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
        navigate('/signin');
    } catch (error) {
        dispatch(registerFailed());
        if (error.response) {
            toast(error.response.data.message, {
                position: 'top-center',
                autoClose: 2000,
                type: 'error',
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } else {
            alert('Lỗi mạng');
        }
    }
};

export const allProduct = async (dispatch) => {
    dispatch(getAllStart());
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/all-product`);
        dispatch(getAllSuccess(response.data));
    } catch (error) {
        dispatch(getAllFailed());
    }
};

export const productDetail = async (dispatch, id) => {
    dispatch(getDetailStart());
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/detail-product/${id}`);
        dispatch(getDetailSuccess(response.data));
    } catch (error) {
        dispatch(getDetailFailed());
    }
};
