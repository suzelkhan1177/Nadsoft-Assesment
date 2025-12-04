import React from "react";
import { Modal, Table, Button } from "react-bootstrap";

export default function StudentView({ show, handleClose, student }) {
    if (!student) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Student Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h5>Basic Info</h5>
                <p><strong>Name:</strong> {student.student?.Name}</p>
                <p><strong>Email:</strong> {student.student?.Email}</p>
                <p><strong>Age:</strong> {student.student?.Age}</p>

                <hr />

                <h5>Marks</h5>

                <Table bordered>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {student.marks?.map((m, index) => (
                            <tr key={index}>
                                <td>{m.Subject}</td>
                                <td>{m.Score}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
