import { axiosJWT } from '~/redux/apiRequest';

export const addAddress = async (data, token, toast) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/address/add-address`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        // console.log(response)
        toast('Thêm địa chỉ thành công', {
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
        return response.status;
    } catch (error) {
        console.log(error);
        toast(error.response.data.message, {
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
    }
};

export const updateAddress = async (data, token, id, toast) => {
    try {
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/address/update-address/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        if (response) {
            toast('Cập nhật địa chỉ thành công', {
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
        }
    } catch (error) {
        console.log(error);
        toast('Cập nhật địa chỉ không thành công', {
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
    }
};

export const getDetail = async (token, id) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/address/detail-address/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllByUser = async (token, id) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/address/getall-by-user/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllAddress = async (token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/address/getall`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
