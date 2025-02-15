// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// CYPRESS > WEBSOCKETS > COMMANDS
// cypress/support/commands.js

// Cypress.Commands.add('connectWebSocket', (url) => {
//     cy.window().then((win) => {
//         return new Cypress.Promise((resolve, reject) => {
//             const ws = new win.WebSocket(url);

//             ws.onopen = () => resolve(ws);
//             ws.onerror = (err) => reject(err);
//         });
//     });
// });

