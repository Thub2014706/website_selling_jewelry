import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import { clearCart } from './cartSlice';


// export const refreshToken = async () => {
//     console.log('token');
//     try {
//         const response = await axios.post(
//             `${process.env.REACT_APP_API_URL}/api/user/refresh-token`,
//             {},
//             {
//                 withCredentials: true,
//             },
//         );
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const setInterceptor = (user, dispatch) => {
//     axiosJWT.interceptors.request.use(
//         //trước khi gửi request nào đó thì interceptors sẽ check này trước khi gọi api nào đó
//         async (config) => {
//             // let date = new Date();
//             let decodedToken = jwtDecode(user?.accessToken);
//             if (decodedToken.exp < new Date().getTime() / 1000) {
//                 const newToken = await refreshToken();
//                 const newData = user?.data

//                 const refreshUser = {
//                     newData,
//                     accessToken: newToken.accessToken,
//                 };
//                 dispatch(loginSuccess(refreshUser));
//                 config.headers.Authorization = 'Bearer ' + newToken.accessToken;
//             }
//             return config;
//         },
//         (err) => {
//             return Promise.reject(err);
//         },
//     );
// };

export const loginUser = async (user, dispatch, navigate, toast) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/signin`, user);
        dispatch(loginSuccess(res.data));
        // setInterceptor(res.data, dispatch);
        console.log(res.data)
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

export const logout = async (dispatch, token, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(
            `${process.env.REACT_APP_API_URL}/api/user/logout`,
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        dispatch(clearCart())
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFailed());
    }
};

