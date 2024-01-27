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
        console.log(error)
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
}