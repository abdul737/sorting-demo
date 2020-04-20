describe('Test Main Page', function() {
  it('Visit main page', () => {
    cy.visit('/')
  })

  it('Contain greeting', () => {
    cy.get('[data-test=greeting]').contains('Welcome to Sorting Demo!')
  })
})
