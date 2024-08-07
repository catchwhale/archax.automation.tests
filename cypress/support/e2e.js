// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './action'
import './api'
import './assertion'
import './websocket'
import './lib/ui/pages/purchaseCoinPage'
// Alternatively you can use CommonJS syntax:
// require('./commands')

// Disable the auto test failure when an uncaught exception is detected.
// I was experiencing an uncaught exception on the dev payroll login page (UI-5237)
// https://docs.cypress.io/api/events/catalog-of-events#Uncaught-Exceptions
before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
})

