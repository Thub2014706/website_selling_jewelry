import { faCircleXmark, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const PaginationSearch = ({ length, selectNumber, handleSubmit }) => {
    let options = [];
    for (let i = 1; i <= length; i++) {
        options.push(i);
    }

    const [number, setNumber] = useState(1);

    const [search, setSearch] = useState('');

    const handleNumber = (e) => {
        setNumber(e.target.value);
        selectNumber(e.target.value);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const deleteSearch = () => {
        setSearch('');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        selectNumber(1);
        handleSubmit(search);
    };

    return (
        <Row>
            <Col>
                <div className="input-group" style={{ width: '130px' }}>
                    <Form.Label className="me-2 mt-1">Hiện trang: </Form.Label>
                    <Form.Select size="sm" value={number} onChange={handleNumber}>
                        {options.map((item) => (
                            <option value={item}>{item}</option>
                        ))}
                    </Form.Select>
                </div>
            </Col>
            <Col>
                <Form className="input-group float-end w-50 position-relative" onSubmit={handleSearchSubmit}>
                    <Form.Control
                        size="sm"
                        type="text"
                        value={search}
                        placeholder="Tìm kiếm..."
                        onChange={handleSearch}
                        style={{ paddingRight: '40px' }}
                    />
                    {search !== '' && (
                        <FontAwesomeIcon
                            className="position-absolute top-50 translate-middle"
                            style={{ right: '40px', zIndex: 100 }}
                            icon={faXmark}
                            color="grey"
                            onClick={deleteSearch}
                        />
                    )}
                    <Button variant="info" type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default PaginationSearch;
