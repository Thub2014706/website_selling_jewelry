import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

const Search = ({ color, search, searchInput, handleSearch }) => {

    return (
        <Col xs="auto">
            <div className="search p-2 mb-2" style={{ borderBottom: `1px solid ${color}`, }}>
                <Form onSubmit={handleSearch}>
                    <input
                        className="search-input"
                        type="text"
                        value={search}
                        onChange={searchInput}
                        style={{ color: `${color}` }}
                        placeholder="Tìm kiếm"
                        required
                    />
                    <Button variant="link" type='submit'>
                        <FontAwesomeIcon style={{ color: `${color}` }} icon={faMagnifyingGlass} />
                    </Button>
                </Form>
            </div>
        </Col>
    );
};

export default Search;

{/* {search !== '' && (
    <Button variant="link text-decoration-none" style={{ color: `${color}` }} onClick={deleteSearch}>
        <FontAwesomeIcon  onClick={deleteSearch} style={{ color: 'var(--grey-color)' }} icon={faXmark} />
    </Button>
)} */}