import React, { useState } from "react";
import './styles.css';

const EmployeeForm = ({ addEmployee }) => {
  const [employee, setEmployee] = useState({ name: "", email: "", department: "" });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(employee);
    setEmployee({ name: "", email: "", department: "" });
  };

  return (
    <div className="employee-form">
      <form onSubmit={handleSubmit}>
        <div>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        </div>
          <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
