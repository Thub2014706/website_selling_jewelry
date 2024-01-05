import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Col } from 'react-bootstrap';

const Search = () => {
    return (
        <Col xs="auto">
            <div className="search p-2">
                <input className="search-input" type="text" placeholder="Tìm kiếm" />
                <a href="#">
                <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
                </a>
            </div>
        </Col>
    );
};

export default Search;
