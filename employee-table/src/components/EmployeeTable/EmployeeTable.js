import React, { useState } from "react";
import './style.css';

const EmployeeTable = ({ employees, onDeleteEmployee }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDeleteClick = (emp) => {
    setSelectedEmployee(emp);
    setShowPopup(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteEmployee(selectedEmployee);
    setShowPopup(false);
    setSelectedEmployee(null);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="employee-table">
      <table aria-label="Employee Table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees?.length > 0 ? (
            employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    onClick={() => handleDeleteClick(index)}
                    aria-label={`Delete ${emp.name}`}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No details available</td>
            </tr>
          )}
        </tbody>
      </table>

      {showPopup && (
        <div role="dialog" aria-modal="true" className="popup-overlay">
          <div className="popup">
            <p>Are you sure you want to delete this record?</p>
            <button onClick={handleDeleteConfirm} aria-label="Confirm Delete" className="confirm-button">
              Delete
            </button>
            <button onClick={handleCancel} aria-label="Cancel Deletion" className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
