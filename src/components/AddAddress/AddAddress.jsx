import React from 'react';
import FormAddress from '../FormAddress/FormAddress';
import { addAddress } from '~/services/AddressService';

const AddAddress = () => {
    const handlesubmit = async (axiosJWT, data, token) => {
        await addAddress(axiosJWT, data, token)
    }
    return (
        <div>
            <FormAddress onSubmit={handlesubmit} />
        </div>
    );
};

export default AddAddress;
