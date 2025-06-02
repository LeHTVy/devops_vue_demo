/* global describe, it, cy */

describe('Task Manager', () => {
  it('should add a new task', () => {
    cy.visit('/')
    // Click nút để mở form
    cy.contains('button', 'Thêm nhiệm vụ mới').click()
    // Sau đó mới tìm input
    cy.get('[data-cy="add-task-input"]').type('Nhiệm vụ demo')
    cy.get('form').submit()
    cy.contains('Nhiệm vụ demo').should('exist')
  })
})
