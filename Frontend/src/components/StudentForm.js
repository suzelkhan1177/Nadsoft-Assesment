import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function StudentForm({ show, handleClose, onAdded }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    marks: [{ Subject: '', Score: '' }]
  });

  const addMark = () => {
    setForm({
      ...form,
      marks: [...form.marks, { Subject: '', Score: '' }]
    });
  };

  const removeMark = (index) => {
    if (form.marks.length > 1) {
      const updatedMarks = [...form.marks];
      updatedMarks.splice(index, 1);
      setForm({ ...form, marks: updatedMarks });
    }
  };

  const handleMarkChange = (index, field, value) => {
    const updatedMarks = [...form.marks];
    updatedMarks[index][field] = value;
    setForm({ ...form, marks: updatedMarks });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/students", {
        Name: form.name,
        Email: form.email,
        Age: parseInt(form.age),
        Marks: form.marks
      });

      Swal.fire("Success", "Student added successfully!", "success");
      setForm({ name: "", email: "", age: "", marks: [{ Subject: "", Score: "" }] });
      handleClose();
      onAdded();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Student</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Age *</Form.Label>
            <Form.Control
              type="number"
              value={form.age}
              onChange={e => setForm({ ...form, age: e.target.value })}
            />
          </Form.Group>

          <hr />

          <h5>Marks</h5>

          {form.marks.map((m, i) => (
            <div className="d-flex gap-2 mb-2" key={i}>
              <Form.Control
                type="text"
                placeholder="Subject"
                value={m.Subject}
                onChange={e => handleMarkChange(i, "Subject", e.target.value)}
              />
              <Form.Control
                type="number"
                placeholder="Score"
                value={m.Score}
                onChange={e => handleMarkChange(i, "Score", e.target.value)}
              />
              <Button variant="danger" onClick={() => removeMark(i)}>X</Button>
            </div>
          ))}

          <Button variant="info" onClick={addMark}>+ Add Subject</Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="success" onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
