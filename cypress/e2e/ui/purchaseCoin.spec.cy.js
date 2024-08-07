/// <reference types="Cypress" />
import purchaseCoinPage from '../../support/lib/ui/pages/purchaseCoinPage'

describe('Buy Crypto coin test suite', function () {
    let params
    beforeEach(() => {
        cy.visit('/')
    })

    it('Verify on load of the purchase coin page', function () {
        const prices = /\$\d{3} \/ coin\$\d{3} \/ coin\$\d{3} \/ coin\$\d{3}/gm
        params = {
        actions: [
            'contain',
            'equal',
            'match'
        ],
        messages: [
            'USD Balance: $1000',
            'CoinACoinBCoinCCoinD',
            prices
        ]
       }
        purchaseCoinPage.verifyPageLoaded(params)
    })
    
    it('Verify coins owned match the value after buying three coins', function () {
        const coins = ['A', 'B', 'C']
        for (let inc = 0; inc < 3; inc++) {
            params = {
                typeNumber: inc+1,
                childElemNum: inc+1,
                action: 'contain',
                message: `Coin${coins[inc]}Coins owned: ${inc+1}`,
                index: inc
            }
            purchaseCoinPage.verifyBuyCoin(params)
        }
    })

})