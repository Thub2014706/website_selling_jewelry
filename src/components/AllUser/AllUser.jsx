import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { allUser } from '~/services/UserService';

const AllUser = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch);

    const [allData, setAllData] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const data = await allUser(axiosJWT, user?.accessToken);
            setAllData(data);
        };
        fetchUser();
    }, []);
    return (
        <div>
            {allData !== null && (
                <Table bordered striped className='text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên người dùng</th>
                            <th>email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                {item.isAdmin ? <td>Admin</td> : <td>Không</td>}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default AllUser;
