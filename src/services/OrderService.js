export const createOrder = async (axiosJWT, data, token, toast) => {
    try {
        await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/order/create-order`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        toast('Đặt hàng thành công', {
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
        toast('Không thể đặt hàng', {
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

export const cancelOrder = async (axiosJWT, id, token, toast) => {
    try {
        await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/order/cancel-order/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        toast('Đơn hàng đã được hủy', {
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
        console.log(error)
        toast('Không thể hủy đơn hàng', {
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

export const allOrderByUser = async (axiosJWT, id, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/allorder-byuser/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allOrder = async (axiosJWT, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/allorder`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const orderDetail = async (axiosJWT, id, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/order-detail/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
