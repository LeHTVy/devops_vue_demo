/* global describe, it, cy */

describe('Task Manager', () => {
  it('should add a new task', () => {
    cy.visit('/')
    cy.get('[data-cy="add-task-input"]').type('New Task')
    cy.get('[data-cy="add-task-button"]').click()
    cy.contains('New Task').should('exist')
  })
})
