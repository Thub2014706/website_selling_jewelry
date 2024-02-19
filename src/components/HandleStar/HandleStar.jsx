import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const HandleStar = ({value}) => {
    const [star, setStar] = useState(5);

    const handleStar = (number) => {
        setStar(number);
        value(number)
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((item) => (
                <FontAwesomeIcon
                    icon={faStar}
                    color={star >= item ? 'var(--font-color)' : '#ebdec8'}
                    onClick={() => handleStar(item)}
                />
            ))}
        </div>
    );
};

export default HandleStar;
