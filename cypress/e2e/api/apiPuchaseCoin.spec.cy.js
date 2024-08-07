/// <reference types="Cypress" />

describe('Buy Crypto coin test suite', function () {

     it('Verify test for a successful response payload from the `purchase-coin` endpoint after a buy order is placed', function () {
        let payload 
        const amount = 1
        for (let coinId = 2; coinId < 5; coinId++) {
            payload = { coinId: coinId, amount: amount }
            cy.apiPurchaseCoin(payload).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('success', true)
            })
        }
    })
})