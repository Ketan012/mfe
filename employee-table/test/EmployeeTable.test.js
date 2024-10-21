import React, { act } from "react";
import { createRoot } from "react-dom/client";
import EmployeeTable from "../src/components/EmployeeTable/EmployeeTable";

describe("EmployeeTable Component", () => {
  let container;
  let root;
  const employees = [
    { name: "Test 1", email: "test1@gmail.com", department: "Audit" },
    { name: "Test 2", email: "test2@gmail.com", department: "Consulting" },
  ];
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    root = createRoot(container);
    act(() => {
      root.render(<EmployeeTable employees={employees} />);
  });
  });

  afterEach(() => {
    root.unmount();
    document.body.removeChild(container);
  });

  test("renders employee details correctly", () => {
    const nameElements = container.getElementsByTagName("td");
    console.log('nameElements', nameElements);
    
    expect(nameElements[0].textContent).toBe("Test 1");
    expect(nameElements[1].textContent).toBe("test1@gmail.com");
    expect(nameElements[2].textContent).toBe("Audit");
    expect(nameElements[3].textContent).toBe("Test 2");
    expect(nameElements[4].textContent).toBe("test2@gmail.com");
    expect(nameElements[5].textContent).toBe("Consulting");
  });

  test("displays 'No details available' when no employees are provided", () => {
    act(() => {
      root.render(<EmployeeTable employees={[]} />);
  });

    const noDetailsElement = container.querySelector("td");
    expect(noDetailsElement.innerHTML).toBe("No details available");
  });
});
