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

export const allType = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getall-type`);
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

// export const filterAll = async (data) => {
//     try {
//         const { priceFrom, priceTo, numberStar, size } = data;
//         if (priceFrom && priceTo && numberStar && size) {
//             const response = await axios.get(
//                 `${process.env.REACT_APP_API_URL}/api/product/filter-all?priceFrom=${priceFrom}&priceTo=${priceTo}&numberStar=${numberStar}&size=${size}`,
//             );
//             return response.data;
//         } else if (priceFrom && priceTo && numberStar) {
//             const response = await axios.get(
//                 `${process.env.REACT_APP_API_URL}/api/product/filter-all?priceFrom=${priceFrom}&priceTo=${priceTo}&numberStar=${numberStar}`,
//             );
//             return response.data;
//         } else if (priceFrom && priceTo) {
//             const response = await axios.get(
//                 `${process.env.REACT_APP_API_URL}/api/product/filter-all?priceFrom=${priceFrom}&priceTo=${priceTo}`,
//             );
//             return response.data;
//         } else if (numberStar) {
//             const response = await axios.get(
//                 `${process.env.REACT_APP_API_URL}/api/product/filter-all?priceFrom=&numberStar=${numberStar}`,
//             );
//             return response.data;
//         } else if (size) {
//             const response = await axios.get(
//                 `${process.env.REACT_APP_API_URL}/api/product/filter-all?priceFrom=&size=${size}`,
//             );
//             return response.data;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

export const filterAll = async (data) => {
    try {
        const { search, priceFrom, priceTo, numberStar, size } = data;
        console.log(search, priceFrom, priceTo, numberStar, size);
        let url = `${process.env.REACT_APP_API_URL}/api/product/filter-all?`;
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
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
