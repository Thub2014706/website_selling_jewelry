import axios from 'axios';

export const allUser = async (axiosJWT, token) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/user/all-account`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}