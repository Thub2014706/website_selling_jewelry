import React from 'react';
import { Col } from 'react-bootstrap';

const Search = () => {
    return (
        <Col xs="auto">
            <div className="search p-2">
                <input className="search-input" type="text" placeholder="Tìm kiếm" />
                <a href="#">
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                </a>
            </div>
        </Col>
    );
};

export default Search;
