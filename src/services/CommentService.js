export const createComment = async (axiosJWT, token, data, id, toast) => {
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