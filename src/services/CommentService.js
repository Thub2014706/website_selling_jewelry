import axios from "axios";
import { axiosJWT } from "~/redux/apiRequest";

export const createComment = async ( token, data, id, toast) => {
    try {
        await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/comment/add-comment/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        });
        toast('Đánh giá thành công', {
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
        toast('Đánh giá không thành công', {
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

export const detailComment = async ( token, id) => {
    try {
        const response =  await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/comment/detail-comment/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const allCommentByUser = async ( token, id) => {
    try {
        const response =  await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/comment/all-comment-by-user/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const allCommentByProduct = async (id) => {
    try {
        const response =  await axios.get(`${process.env.REACT_APP_API_URL}/api/comment/all-comment-by-product/${id}`);
        return response.data
    } catch (error) {
        console.log(error);
    }
}