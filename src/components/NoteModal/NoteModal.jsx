import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const NoteModal = ({handleClose, show, handleSave}) => {
    const [text, setText] = useState('')

    // handleSave(text) 
    //     handleChange(text)
    //     handleClose()
    // }
    return (
        <div>
            <Modal size="sm" centered show={show} onHide={handleClose}>
                <Modal.Body className="text-center">
                    <Form.Control
                        as="textarea"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={3}
                        placeholder="Lý do"
                    />
                    <Button className="px-3" variant="secondary" onClick={() => handleSave(text)}>
                        Lưu
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NoteModal;
