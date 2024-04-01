import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const NoteModal = ({handleClose, show, handleSave}) => {
    const [text, setText] = useState('')

    const handleCloseNote = () => {
        setText('')
        handleClose()
    }

    return (
        <div>
            <Modal size="sm" centered show={show} onHide={handleCloseNote}>
                <Modal.Body className="text-center">
                    <Form.Control
                        as="textarea"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={3}
                        placeholder="Lý do không hoàn thành đơn hàng"
                    />
                    <Button className="px-3 mt-2" variant="danger" onClick={() => {handleSave(text); handleCloseNote()}}>
                        Lưu
                    </Button>
                    <Button className="px-3 mt-2 ms-2" variant="secondary" onClick={handleCloseNote}>
                        Hủy
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default NoteModal;
