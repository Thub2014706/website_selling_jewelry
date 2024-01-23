export const addAddress = async (axiosJWT, data, token) => {
    try {
        await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/address/add-address`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.log(error)
    }
}

export const updateAddress = async (axiosJWT, data, token, id) => {
    try {
        await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/address/update-address/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.log(error)
    }
}

export const getDetail = async (axiosJWT, token, id) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/address/detail-address/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllByUser = async (axiosJWT, token, id) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/address/getall-by-user/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}