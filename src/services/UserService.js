import axios from 'axios';
import { axiosJWT } from '~/redux/apiRequest';

export const allUser = async (token, search, number, show) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/user/all-account?search=${search}&number=${number}&show=${show}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addFavorite = async (token, product, id) => {
    try {
        const response = await axiosJWT.put(
            `${process.env.REACT_APP_API_URL}/api/user/add-favorite/${id}`,
            { product },
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const testFavorite = async (product, id) => {
    try {
        const response = await axiosJWT.get(
            `${process.env.REACT_APP_API_URL}/api/user/test-favorite/${id}?product=${product}`,
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteFavorite = async (token, product, id) => {
    try {
        const response = await axiosJWT.put(
            `${process.env.REACT_APP_API_URL}/api/user/delete-favorite/${id}`,
            { product },
            {
                headers: { authorization: `Bearer ${token}` },
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const allFavoriteByUser = async (token, id) => {
    try {
        const response = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/user/all-favorite-by-user/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const numberFavoriteByProduct = async (id) => {
    try {
        const response = await axiosJWT.get(
            `${process.env.REACT_APP_API_URL}/api/user/number-favorite-by-product/${id}`,
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
