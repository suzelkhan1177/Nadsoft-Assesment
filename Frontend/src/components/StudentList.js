import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function StudentList({ refreshTrigger }) {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const [viewData, setViewData] = useState(null);
  const [showView, setShowView] = useState(false);

  // Fetch Students List
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/students?page=${page}&limit=${limit}`
      );
      setStudents(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, refreshTrigger]);

  // View a student's full details
  const openView = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/students/${id}`);
      setViewData(res.data);
      setShowView(true);
    } catch (err) {
      Swal.fire("Error", "Unable to load student details", "error");
    }
  };

  const closeView = () => {
    setShowView(false);
    setViewData(null);
  };

  // Delete Student
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action cannot be undone!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      Swal.fire("Deleted!", "Student has been deleted.", "success");
      fetchStudents();
    }
  };

  return (
    <>
      {/* Students Table */}
      <Table bordered>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, index) => (
            <tr key={s.StudentID}>
              <td>{(page - 1) * limit + index + 1}</td> {/* SERIAL NUMBER */}
              <td>{s.Name}</td>
              <td>{s.Email}</td>
              <td>{s.Age}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => openView(s.StudentID)}
                >
                  👁 View
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(s.StudentID)}
                >
                  🗑 Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </Button>

        <div>
          Page {page} / {Math.ceil(total / limit) || 1}
        </div>

        <Button
          variant="secondary"
          onClick={() => setPage((p) => p + 1)}
          disabled={page * limit >= total}
        >
          Next
        </Button>
      </div>

      {/* View Student Modal */}
      <Modal show={showView} onHide={closeView} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {viewData ? (
            <>
              <h5>Student Information</h5>
              <p><strong>Name:</strong> {viewData.student.Name}</p>
              <p><strong>Email:</strong> {viewData.student.Email}</p>
              <p><strong>Age:</strong> {viewData.student.Age}</p>

              <hr />

              <h5>Marks</h5>
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {viewData.marks.map((m, index) => (
                    <tr key={m.MarkID}>
                      <td>{index + 1}</td>
                      <td>{m.Subject}</td>
                      <td>{m.Score}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
