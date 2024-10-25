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
});
