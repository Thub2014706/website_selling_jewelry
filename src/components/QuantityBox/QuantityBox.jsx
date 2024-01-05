import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

const QuantityBox = ({ inStock }) => {
    const [number, setNumber] = useState(1);

    const [war, setWar] = useState(false);

    const handleEdit = (e) => {
        const val = e.target.value.replace(/[^\d]/g, '');
        setWar(false);
        if (val <= inStock) {
            setNumber(val);
        } else {
            setNumber(inStock);
            setWar(true);
        }
    };

    const handleDecrease = () => {
        setWar(false);
        if (number > 1) {
            setNumber(number - 1);
        }
    };

    const handleIncrease = () => {
        if (number < inStock) {
            setNumber(Number(number) + 1);
        }
    };

    return (
        <div>
            <ButtonGroup size="sm" aria-label="Basic example">
                <Button variant="outline-secondary" className="rounded-0" onClick={handleDecrease}>
                    <FontAwesomeIcon icon={faMinus} />
                </Button>
                <input
                    type="text"
                    style={{ width: '40px' }}
                    className="text-center"
                    onChange={handleEdit}
                    value={number}
                />
                {/* <Form.Control type="password" placeholder="Password" /> */}
                {/* <Button variant="outline-secondary">Middle</Button> */}
                <Button variant="outline-secondary" className="rounded-0" onClick={handleIncrease}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </ButtonGroup>
            {war === true && (
                <p className="text-danger mt-2">Số lượng bạn chọn vượt quá số lượng sản phẩm trong kho.</p>
            )}
        </div>
    );
};

export default QuantityBox;
