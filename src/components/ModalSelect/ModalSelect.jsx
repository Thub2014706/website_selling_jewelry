import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalSelect = ({ text, accept, cancel, show, handleAction, handleClose }) => {
    return (
        <Modal size="sm" centered show={show} onHide={handleClose}>
            <Modal.Body className="text-center">
                <p>{text}</p>
                <Button className="me-2 px-3" variant="danger" onClick={handleAction}>
                    {accept}
                </Button>
                <Button className="px-3" variant="secondary" onClick={handleClose}>
                    {cancel}
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default ModalSelect;
