import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Star = ({ number }) => {
    const numberStar = [1, 2, 3, 4, 5];
    const numberNoStar = [1, 2, 3, 4];

    return (
        <div>
            {numberStar.map((item) => item <= number && <FontAwesomeIcon icon={faStar} color="var(--font-color)" />)}
            {numberNoStar.map((item) => item <= 5 - number && <FontAwesomeIcon icon={faStar} color="#ebdec8" />)}
        </div>
    );
};

export default Star;
