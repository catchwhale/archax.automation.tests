/** Use for clicking an element */
Cypress.Commands.add('actionClick', (selector) => {
        cy.get(selector).click()
})



/** Use for typing text */
Cypress.Commands.add('actionDataEntry', (selector, index, text) => {
    cy.get(selector)
        .eq(index)
        .clear()
        .type(text)
})
