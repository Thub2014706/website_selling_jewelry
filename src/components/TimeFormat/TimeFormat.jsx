import React from 'react';
import moment from 'moment';

const TimeFormat = ({ time }) => {
    const formattedTime = moment(time).format('HH:mm:ss DD-MM-YYYY');
    return <div>{formattedTime}</div>;
};

export default TimeFormat;
