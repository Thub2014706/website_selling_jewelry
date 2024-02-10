import { faChevronDown, faChevronUp, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';

const ListMenu = ({ condition, handleAction, children, title, icon }) => {
    return (
        <div className="px-1">
            <div
                className="py-2 px-3 rounded menu"
                // style={{ backgroundColor: condition ? 'var(--list-menu)' : ''}}
            >
                <a href="javascript:void(0)" className="text-decoration-none text-white fs-5" onClick={handleAction}>
                    <div>
                        <FontAwesomeIcon icon={icon} className="me-2" /> {title}
                        <FontAwesomeIcon
                            className="float-end"
                            icon={faChevronDown}
                            style={{ transform: condition ? 'rotate(180deg)' : '' }}
                        />
                    </div>
                </a>
            </div>
            {condition && (
                <ul className=" mt-1 h5" style={{ listStyle: 'none' }}>
                    {children}
                </ul>
            )}
        </div>
    );
};

export default ListMenu;
