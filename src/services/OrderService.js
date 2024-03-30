import { axiosJWT } from '~/redux/apiRequest';

export const createOrder = async (data, token, toast) => {
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
        console.log(data);
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

export const cancelOrder = async (id, token, toast, shipper) => {
    try {
        await axiosJWT.put(
            `${process.env.REACT_APP_API_URL}/api/order/cancel-order/${id}`,
            shipper,
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
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
        console.log(error);
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

export const allOrderByUser = async (id, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/allorder-byuser/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const rocessingByUser = async (id, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/rocessing-byuser/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const transportByUser = async (id, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/transport-byuser/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deliveringByUser = async (id, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/delivering-byuser/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const finishedByUser = async (id, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/finished-byuser/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const cancelledByUser = async (id, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/cancelled-byuser/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allOrder = async (token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/allorder`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const orderDetail = async (id, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/order-detail/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const transportUpdate = async (id, token) => {
    try {
        await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/order/transport-update/${id}`, {}, {
            headers: { authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.log(id, token)
        console.log(error);
    }
};

export const deliveringUpdate = async (id, data) => {
    try {
        // console.log(id, status)
        await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/order/delivering-update/${id}`, data);
    } catch (error) {
        console.log(error);
    }
};

export const deliveredUpdate = async (id, data) => {
    try {
        console.log(id, data)
        await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/order/delivered-update/${id}`, data);
    } catch (error) {
        console.log(error);
    }
};

export const unfinishedUpdate = async (id, data) => {
    try {
        // console.log(id, status)
        await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/order/unfinished-update/${id}`, data);
    } catch (error) {
        console.log(error);
    }
};

export const finishedUpdate = async (id) => {
    try {
        // console.log(id, status)
        await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/order/finished-update/${id}`, {});
    } catch (error) {
        console.log(error);
    }
};

export const allStatus = async (id) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/all-status/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allOrderTransport = async () => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/all-order-transport`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allOrderConfirm = async () => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/all-order-confirm`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allTransport = async () => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/all-transport`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allRocessing = async () => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/all-rocessing`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allDelivered = async () => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/all-delivered`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allUnfinished = async () => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/all-unfinished`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};