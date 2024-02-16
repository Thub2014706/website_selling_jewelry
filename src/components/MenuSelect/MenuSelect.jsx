import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const MenuSelect = ({title, handleClick, styleMenu}) => {
    return (
        <div className="px-1">
            <div className="py-2 px-3 rounded menu" style={styleMenu}>
                <a
                    href="javascript:void(0)"
                    className="text-decoration-none text-white fs-5"
                    onClick={handleClick}
                >
                    <div>
                        <FontAwesomeIcon icon={faFilePen} className="me-2" /> {title}
                    </div>
                </a>
            </div>
        </div>
    );
};

export default MenuSelect;
