import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess } from './redux/authSlice';

axios.defaults.withCredentials = true;

export const refreshToken = async () => {
    console.log('tokennnn');
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/refresh-token`);
        console.log('thu nghiem', response);
        return response.data;
    } catch (error) {
        console.log('loi', error);
    }
};

export const createAxios = (user, dispatch) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        //trước khi gửi request nào đó thì interceptors sẽ check này trước khi gọi api nào đó
        async (config) => {
            // let date = new Date();
            let decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < new Date().getTime() / 1000) {
                try {
                    const newToken = await refreshToken();
                    const newData = user?.data;

                    const refreshUser = {
                        data: newData,
                        accessToken: newToken.accessToken,
                    };
                    // console.log("thu nghiem", refreshUser)
                    dispatch(loginSuccess(refreshUser));
                    config.headers.Authorization = 'Bearer ' + newToken.accessToken;
                } catch (error) {
                    // logout(dispatch, user?.accessToken, newInstance);
                    console.log(error);
                }
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};
