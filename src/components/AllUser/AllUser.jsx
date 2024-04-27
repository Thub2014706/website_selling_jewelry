import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { allUser } from '~/services/UserService';
import PaginationSearch from '../PaginationSearch/PaginationSearch';

const AllUser = () => {
    const user = useSelector((state) => state.auth.login.currentUser);

    const [allData, setAllData] = useState(null);

    const [search, setSearch] = useState('');

    const [number, setNumber] = useState(1);

    const [length, setLength] = useState(1)

    const handleNumber = (number) => {
        setNumber(number)
    }

    const handleSearch = (search) => {
        setSearch(search)
    }

    useEffect(() => {
        const fetchUser = async () => {
            const data = await allUser(user?.accessToken, search, number, 3);
            setAllData(data.data);
            setLength(data.length)
        };
        fetchUser();
    }, [allData]);
    return (
        <div className="shadow rounded p-5">
            <PaginationSearch length={length} selectNumber={handleNumber} handleSubmit={handleSearch} />

            {allData !== null && (
                <Table bordered striped className="text-center">
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
