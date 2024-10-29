import React, { act } from "react";
import { createRoot } from "react-dom/client";
import EmployeeTable from "../src/components/EmployeeTable/EmployeeTable";

describe("EmployeeTable Component", () => {
  let container;
  let root;
  const mockDeleteEmployee = jest.fn();
  const employees = [
    { name: "Test 1", email: "test1@gmail.com", department: "Audit" },
    { name: "Test 2", email: "test2@gmail.com", department: "Consulting" },
  ];

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    root = createRoot(container);
    act(() => {
      root.render(<EmployeeTable employees={employees} onDeleteEmployee={mockDeleteEmployee} />);
    });
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  test("renders employee details correctly", () => {
    const nameElements = container.getElementsByTagName("td");
    expect(nameElements[0].textContent).toBe("Test 1");
    expect(nameElements[1].textContent).toBe("test1@gmail.com");
    expect(nameElements[2].textContent).toBe("Audit");
    expect(nameElements[4].textContent).toBe("Test 2");
    expect(nameElements[5].textContent).toBe("test2@gmail.com");
    expect(nameElements[6].textContent).toBe("Consulting");
  });

  test("displays 'No details available' when no employees are provided", () => {
    act(() => {
      root.render(<EmployeeTable employees={[]} onDeleteEmployee={mockDeleteEmployee} />);
    });

    const noDetailsElement = container.querySelector("td");
    expect(noDetailsElement.innerHTML).toBe("No details available");
  });

  test("opens delete confirmation popup on delete button click", () => {
    const deleteButtons = container.querySelectorAll(".delete-button");
    act(() => {
      deleteButtons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const dialog = container.querySelector(".popup-overlay");
    expect(dialog).toBeInTheDocument();
    expect(dialog.textContent).toContain("Are you sure you want to delete this record?");
  });

  test("calls onDeleteEmployee with correct employee data when delete is confirmed", () => {
    const deleteButtons = container.querySelectorAll(".delete-button");
    act(() => {
      deleteButtons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const confirmButton = container.querySelector(".confirm-button");
    act(() => {
      confirmButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(mockDeleteEmployee).toHaveBeenCalledTimes(1);
    expect(mockDeleteEmployee).toHaveBeenCalledWith(0);
  });

  test("closes delete confirmation popup when cancel button is clicked", () => {
    const deleteButtons = container.querySelectorAll(".delete-button");
    act(() => {
      deleteButtons[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const cancelButton = container.querySelector(".cancel-button");
    act(() => {
      cancelButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const dialog = container.querySelector(".popup-overlay");
    expect(dialog).not.toBeInTheDocument();
  });
});
