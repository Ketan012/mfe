import React, { act } from 'react';
import EmployeeForm from '../src/components/EmployeeForm/EmployeeForm';
import { fireEvent } from '@testing-library/react';
import { createRoot } from 'react-dom/client';

describe('EmployeeForm Component', () => {
  let container;
  let root;
  let addEmployee;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    addEmployee = jest.fn();
    act(() => {
        root.render(<EmployeeForm addEmployee={addEmployee} />);
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders input fields and submits the form', () => {
    const nameInput = container.querySelector('input[name="name"]');
    const emailInput = container.querySelector('input[name="email"]');
    const departmentInput = container.querySelector('input[name="department"]');
    const submitButton = container.querySelector('button[type="submit"]');

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(departmentInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('updates input values correctly', () => {

    const nameInput = container.querySelector('input[name="name"]');
    const emailInput = container.querySelector('input[name="email"]');
    const departmentInput = container.querySelector('input[name="department"]');
  
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(departmentInput, { target: { value: 'Engineering' } });
  
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(departmentInput.value).toBe('Engineering');
  });

  it('calls addEmployee with the correct data when the form is submitted', () => {
    const nameInput = container.querySelector('input[name="name"]');
    const emailInput = container.querySelector('input[name="email"]');
    const departmentInput = container.querySelector('input[name="department"]');

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(departmentInput, { target: { value: 'Consulting' } });

    const form = container.querySelector("form");

    act(() => {
      form.dispatchEvent(new Event("submit", { bubbles: true }));
    });

    expect(addEmployee).toHaveBeenCalledTimes(1);
    expect(addEmployee).toHaveBeenCalledWith({
      name: "Test",
      email: "test@gmail.com",
      department: "Consulting",
    });
  });

  it('resets form fields after submitting', () => {

    const nameInput = container.querySelector('input[name="name"]');
    const emailInput = container.querySelector('input[name="email"]');
    const departmentInput = container.querySelector('input[name="department"]');

    const form = container.querySelector('form');
    act(() => {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    });

    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(departmentInput.value).toBe('');
  });
});
