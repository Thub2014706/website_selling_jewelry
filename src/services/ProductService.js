import axios from 'axios';
import { axiosJWT } from '~/redux/apiRequest';

export const typeDetail = async (id, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/product/detail-type/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allProduct = async (search, number, show) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/all-product?search=${search}&number=${number}&show=${show}`);
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
        const response = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/product/update-product/${id}`, data, {
            headers: { authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
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
        return response.status
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

export const getImage = async (name) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/image/${name}`)
        return response.config.url;
    } catch (error) {
        console.log(error);
    }
};

export const addProduct = async (data, token, toast) => {
    try {
        const response = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/product/add-product`, data, {
            headers: { authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
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
        return response.status;
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

export const deleteProduct = async (id, token, toast) => {
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

export const createType = async (data, token, toast) => {
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
        return response.status;
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

export const allTypeSearch = async (search, number, show) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getall-type?search=${search}&number=${number}&show=${show}`);
        // console.log("dfghj",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allType = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/all-type`);
        // console.log("dfghj",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const typeByFather = async (father) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/product/get-type-by-father?father=${father}`,
        );
        // console.log("dfghj",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteType = async (token, toast, id) => {
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

export const updateType = async (token, toast, data, id) => {
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


export const allSize = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/all-size`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const filterByPrice = async (priceFrom, priceTo) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/product/filter-by-price?priceFrom=${priceFrom}&priceTo=${priceTo}`,
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const filterByType = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/filter-by-type/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const filterByStar = async (numberStar) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/product/filter-by-star?numberStar=${numberStar}`,
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const filterAll = async (data) => {
    try {
        const { type, search, priceFrom, priceTo, numberStar, size, number } = data;
        console.log(search, priceFrom, priceTo, numberStar, size);
        let url = `${process.env.REACT_APP_API_URL}/api/product/filter-all?`;
        if (type) {
            url = url + `type=${type}&`;
        }
        if (search) {
            url = url + `search=${search}&`;
        }
        if (priceFrom && priceTo) {
            url = url + `priceFrom=${priceFrom}&priceTo=${priceTo}&`;
        }
        if (numberStar) {
            url = url + `numberStar=${numberStar}&`;
        }
        if (size && Array.isArray(size)) {
            size.map((item) => (url = url + `size=${item}&`));
        }
        const response = await axios.get(url + `number=${number}&show=6`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const randomProduct = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/product/random-products/?id=${id}&length=4`,
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};