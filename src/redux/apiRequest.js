import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';

let axiosJWT = axios.create();

const refreshToken = async () => {
    console.log('token');
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/user/refresh-token`,
            // {},
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const setInterceptor = (user, dispatch) => {
    axiosJWT.interceptors.request.use(
        //trước khi gửi request nào đó thì interceptors sẽ check này trước khi gọi api nào đó
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accesToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();

                const refreshUser = {
                    ...user,
                    accesToken: data.accesToken,
                };
                dispatch(loginSuccess(refreshUser));
                config.headers['authorization'] = 'Bearer ' + data.accesToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
};

const ensureInterceptor = (user, dispatch) => {
    setInterceptor(user, dispatch);
};

export const loginUser = async (user, dispatch, navigate, toast) => {
    dispatch(loginStart());
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/user/signin`, user);
        dispatch(loginSuccess(res.data));
        ensureInterceptor(res.data, dispatch);
        navigate('/');
    } catch (error) {
        // console.log("loi",error)
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
            console.log(error);
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

export const logout = async (dispatch, token) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(
            `${process.env.REACT_APP_API_URL}/api/user/logout`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        dispatch(loginSuccess());
    } catch (error) {
        dispatch(logoutSuccess());
    }
};

