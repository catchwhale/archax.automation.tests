/** Assert an element is exists */
Cypress.Commands.add('assertionText', (selector, action, expectedText) => {
	if (action === 'contain' || action === 'equal') 
		cy.get(selector).invoke('text').should(action, expectedText)
	else
		cy.get(selector).invoke('text').then((actualTextValue) => { expect(actualTextValue).to.match(expectedText) })
})