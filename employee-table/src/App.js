import React from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
function App({ employees, onDeleteEmployee }) {
  return (
    <div className="App">
      <EmployeeTable employees={employees} onDeleteEmployee={onDeleteEmployee} />
    </div>
  );
}

export default App;
