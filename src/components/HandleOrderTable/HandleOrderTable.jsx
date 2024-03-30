import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import OrderStatus from '~/constants/OrderStatus';

const HandleOrderTable = ({ orders, handleShow, handleClick }) => {
    return (
        <div>
            <Table bordered striped className="text-center align-middle">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID đơn hàng</th>
                        <th>Chi tiết</th>
                        {handleClick && <th>Xử lý</th>}
                    </tr>
                </thead>
                <tbody>
                    {orders !==null &&
                    orders.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item._id}</td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        onClick={() => handleShow(item._id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                                {handleClick && (
                                    <td>
                                        <Button variant="warning" onClick={() => handleClick(item._id)}>
                                            Vận chuyển
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default HandleOrderTable;
