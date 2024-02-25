import axios from 'axios';

export const allProduct = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/all-product`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const productDetail = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/detail-product/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (data, id, token, toast) => {
    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/product/update-product/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        toast('Cập nhật sản phẩm thành công', {
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
    } catch (error) {
        console.log(error);
        toast('Cập nhật sản phẩm không thành công', {
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

export const addProduct = async (data, token, toast) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/add-product`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        toast('Thêm sản phẩm thành công', {
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
        return response.status
    } catch (error) {
        console.log(error);
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
    }
};

export const deleteProduct = async (id, token, toast, axiosJWT) => {
    try {
        await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/product/delete-product/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        toast('Xóa sản phẩm thành công', {
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
        // return response.data;
    } catch (error) {
        console.log(error);
        toast('Không thể xóa', {
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

export const createType = async (data, token, axiosJWT, toast) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/product/create-type`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        toast('Thêm phân loại thành công', {
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
        return response.status
    } catch (error) {
        console.log(error.response);
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
    }
};

export const allType = async (token, axiosJWT) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/product/getall-type`, {
            headers: { authorization: `Bearer ${token}` },
        });
        // console.log("dfghj",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteType = async (token, toast, axiosJWT, id) => {
    try {
        await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/product/delete-type/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        toast('Xóa thành công', {
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
        // console.log("dfghj",response.data)
    } catch (error) {
        console.log(error);
        toast('Không thể xóa', {
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

export const updateType = async (token, toast, data, axiosJWT, id) => {
    try {
        await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/product/update-type/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        toast('Cập nhật thành công', {
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
        // console.log("dfghj",response.data)
    } catch (error) {
        console.log(error);
        toast('Không thể cập nhật', {
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

export const typeDetail = async (id, axiosJWT, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/product/detail-type/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
