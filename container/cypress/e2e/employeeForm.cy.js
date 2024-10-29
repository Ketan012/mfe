describe('Micro-Frontend Integration', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should add an employee and verify it in the employee table', () => {
    cy.get('input[name="name"]').type('Ketan Jadhav');
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.get('input[name="department"]').type('Consulting');
    cy.get('button[type="submit"]').click();

    cy.get('.employee-table tbody tr').last().within(() => {
      cy.get('td').eq(0).should('contain', 'Ketan Jadhav');
      cy.get('td').eq(1).should('contain', 'test@gmail.com');
      cy.get('td').eq(2).should('contain', 'Consulting');
    });
  });

  it("should contain the table with empty data", () => {
    cy.get(".employee-table tbody tr td")
      .eq(0)
      .should("contain", "No details available");
  });

  it('should open delete confirmation popup on delete button click', () => {
    cy.get('input[name="name"]').type('Ketan Jadhav');
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.get('input[name="department"]').type('Consulting');
    cy.get('button[type="submit"]').click();
    cy.get('.employee-table tbody tr').first().within(() => {
      cy.get('.delete-button').click();
    });

    cy.get('.popup-overlay').should('be.visible');
    cy.contains('Are you sure you want to delete this record?').should('exist');
  });

  it('should delete the employee when confirmed', () => {
    cy.get('input[name="name"]').type('Delete Test');
    cy.get('input[name="email"]').type('delete@test.com');
    cy.get('input[name="department"]').type('HR');
    cy.get('button[type="submit"]').click();

    cy.get('.employee-table tbody tr').last().within(() => {
      cy.get('.delete-button').click();
    });

    cy.get('.confirm-button').click();

    cy.get('.employee-table tbody tr').should('not.contain', 'Delete Test');
  });

  it('should close the delete confirmation popup when canceled', () => {
    cy.get('input[name="name"]').type("Ketan Jadhav");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="department"]').type("Consulting");
    cy.get('button[type="submit"]').click();
    cy.get('.employee-table tbody tr').first().within(() => {
      cy.get('.delete-button').click();
    });

    cy.get('.cancel-button').click();

    cy.get('.popup-overlay').should('not.exist');
    cy.get('.employee-table tbody tr').should('have.length.greaterThan', 0); // Ensure rows remain
  });
});
