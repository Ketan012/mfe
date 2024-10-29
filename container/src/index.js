import React, { useState } from "react";
import ReactDOM from "react-dom";
import './index.css';

const EmployeeForm = React.lazy(() => import("employeeForm/EmployeeForm"));
const EmployeeTable = React.lazy(() => import("employeeTable/EmployeeTable"));

const App = () => {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const onDeleteEmployee = (selectedEmployeeIndex) => {
    const _employees = employees.filter((_, index) => index !== selectedEmployeeIndex);
    setEmployees(_employees);
  }

  return (
    <div className="container">
      <h1>Employee Management</h1>
      <React.Suspense fallback="Loading Form...">
        <EmployeeForm addEmployee={addEmployee} />
      </React.Suspense>
      <br />
      <React.Suspense fallback="Loading Table...">
        <EmployeeTable
          employees={employees}
          onDeleteEmployee={onDeleteEmployee}
        />
      </React.Suspense>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
