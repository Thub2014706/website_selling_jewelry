import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonStatus = ({ title, handleButton, disabled }) => {
    return (
        <div className="mt-4 d-grid gap-2 d-md-flex justify-content-md-end">
            <Button className="rounded-0 px-5" disabled={disabled} variant="outline-dark" onClick={handleButton}>
                {title}
            </Button>
        </div>
    );
};

export default ButtonStatus;
