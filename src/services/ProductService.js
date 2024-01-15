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
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/product/update-product/${id}`, data, {
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
        return response.data;
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
        return response.data;
    } catch (error) {
        console.log(error);
        toast('Không thể thêm', {
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

export const deleteProduct = async (id, token, toast) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/product/delete-product/${id}`, {
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
        return response.data;
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
