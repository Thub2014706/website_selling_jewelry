import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const HandleStar = () => {
    const [star, setStar] = useState(5);

    return (
        <div>
            <FontAwesomeIcon icon={faStar} color="var(--font-color)" onClick={() => setStar(1)} />
            {star >= 2 ? (
                <FontAwesomeIcon icon={faStar} color="var(--font-color)" onClick={() => setStar(2)} />
            ) : (
                <FontAwesomeIcon icon={faStar} color="#ebdec8" onClick={() => setStar(2)} />
            )}
            {star >= 3 ? (
                <FontAwesomeIcon icon={faStar} color="var(--font-color)" onClick={() => setStar(3)} />
            ) : (
                <FontAwesomeIcon icon={faStar} color="#ebdec8" onClick={() => setStar(3)} />
            )}
            {star >= 4 ? (
                <FontAwesomeIcon icon={faStar} color="var(--font-color)" onClick={() => setStar(4)} />
            ) : (
                <FontAwesomeIcon icon={faStar} color="#ebdec8" onClick={() => setStar(4)} />
            )}
            {star >= 5 ? (
                <FontAwesomeIcon icon={faStar} color="var(--font-color)" onClick={() => setStar(5)} />
            ) : (
                <FontAwesomeIcon icon={faStar} color="#ebdec8" onClick={() => setStar(5)} />
            )}
        </div>
    );
};

export default HandleStar;
