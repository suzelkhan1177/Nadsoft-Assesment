import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';


export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => setRefresh(prev => prev + 1);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h3>All Students</h3>
        <Button variant="success" onClick={() => setShowModal(true)}>Add New Student</Button>
      </div>

      <StudentList refreshTrigger={refresh} />

      <StudentForm
        show={showModal}
        handleClose={() => setShowModal(false)}
        onAdded={handleRefresh}
      />
    </div>
  );
}
