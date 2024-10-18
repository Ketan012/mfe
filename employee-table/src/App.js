import React from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
function App({ employees }) {
  return (
    <div className="App">
      <EmployeeTable employees={employees} />
    </div>
  );
}

export default App;
