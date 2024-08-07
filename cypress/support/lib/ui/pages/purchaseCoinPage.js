/// <reference types="Cypress" />

class purchaseCoinPage {

    elements = {
        inventory: '.inventory',
        ticketName: '.ticket-name',
        ticketPrice: '.ticket-price',
        inputNumber: 'input[type="number"]',
        inventoryItem: '.inventory-item',
        inputNumber: 'input[type="number"]',
        buyButton: "div:nth-child({var}) > button:nth-child(5)"
    }
 
    verifyPageLoaded(params) {
        const elems = [ this.elements.inventory,
            this.elements.ticketName,
            this.elements.ticketPrice
        ]
        for (let inc = 0; inc < 3; inc++) 
            cy.assertionText(elems[inc], params.actions[inc], params.messages[inc])
    }

    verifyBuyCoin(params) {
        cy.actionDataEntry(this.elements.inputNumber, params.index, params.typeNumber)
        cy.actionClick(this.elements.buyButton.replace('{var}', params.childElemNum))
        cy.assertionText(this.elements.inventory, params.action, params.message)
    }
}

module.exports = new purchaseCoinPage()