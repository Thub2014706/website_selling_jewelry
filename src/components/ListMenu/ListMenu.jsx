import { faAngleRight, faChevronDown, faChevronUp, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const ListMenu = ({ children, title, icon }) => {
    const [click, setClick] = useState(false);

    const [numberClick, setNumberClick] = useState(0);

    const handleClick = () => {
        setClick(!click);
        setNumberClick(numberClick + 1);
    };

    return (
        <div className="px-1">
            <a
                href="javascript:void(0)"
                className="text-decoration-none text-white fs-5"
                onClick={() => {
                    handleClick();
                }}
            >
                <div className="py-2 px-3 rounded menu">
                    <div>
                        <FontAwesomeIcon icon={icon} className="me-2" /> {title}
                        <FontAwesomeIcon className={`float-end mt-1 ${click ? 'down' : 'up'}`} icon={faAngleRight} />
                    </div>
                </div>
            </a>
            {click && <ul
                className={`mt-1 h5 ${numberClick > 0 && click && 'list'} ${numberClick > 0 && !click && 'unlist'}`}
                style={{
                    listStyle: 'none',
                    maxHeight: numberClick === 0 ? '0' : '',
                    overflow: numberClick === 0 ? 'hidden' : '',
                }}
            >
                {children}
            </ul>}
        </div>
    );
};

export default ListMenu;
