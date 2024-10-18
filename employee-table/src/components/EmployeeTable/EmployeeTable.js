import React from "react";
import './style.css';

const EmployeeTable = ({ employees }) => {
  return (
    <div className="employee-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees?.length > 0 ? (
            employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>'No details available'</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
