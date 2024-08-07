/// <reference types="Cypress" />

describe('Buy Crypto coin test suite', function () {
    let payload 
    let wsresponseData
    const websocketUrl = Cypress.env('websocketUrl')
    const amount = 1
    const status = 200
    const startPrice = 100
    const expectedName = 'CoinB'
    let websocket, message
    beforeEach(() => {
        cy.connectWebSocket(websocketUrl).then((ws) => {
            websocket = ws
            cy.receiveWebSocketMessage(ws, 'Hello Client!').then((ms) => {
                message = ms
                wsresponseData = JSON.parse(message)
            })
        })
    })

    it('Verify test that CoinB incremements by one dollar with each message over a period of time.', function () {
        let expectedAmountOwn = wsresponseData.inventory[2].amountOwned
        const coinId = 3
        payload = { coinId: coinId, amount: amount }
        for (let inc = 0; inc < 8; inc++) {
            cy.apiPurchaseCoin(payload).then(response => {
                if (response.status == status && response.body.success) expectedAmountOwn += 1
            }).receiveWebSocketMessage(websocket, 'retrieve ws data!')
            .then((message_) => {
                wsresponseData = JSON.parse(message_)
                const actualAmountOwn = wsresponseData.inventory[2].amountOwned
                const actualPrice = wsresponseData.coins[2].price
                const actualId = wsresponseData.coins[2].id
                const actualName = wsresponseData.coins[2].name
                const actualTime = wsresponseData.time
                expect(actualAmountOwn).to.equal(expectedAmountOwn)
                expect(actualId).to.equal(coinId)
                expect(actualName).to.equal(expectedName)
                expect(actualPrice).to.equal(startPrice + actualTime)
            })
        }
    })
            
    it('Verify test that `inventory.<coinId>.amountOwned` correctly reflects your owned inventory following a `purchase-coin` execution', function () {
        let expectedAmountUSD, 
            expectedAmountOwnA, 
            expectedAmountOwnB, 
            expectedAmountOwnC, 
            expectedAmountOwnD,
            actualAmountUSD = 1000, 
            actualAmountOwnA = 0, 
            actualAmountOwnB = 0, 
            actualAmountOwnC = 0, 
            actualAmountOwnD = 0
        wsresponseData = JSON.parse(message)
        expectedAmountUSD = wsresponseData.inventory[0].amountOwned
        expectedAmountOwnA = wsresponseData.inventory[1].amountOwned
        expectedAmountOwnB = wsresponseData.inventory[2].amountOwned
        expectedAmountOwnC = wsresponseData.inventory[3].amountOwned
        expectedAmountOwnD = wsresponseData.inventory[4].amountOwned
        for (let coinId_ = 1; coinId_ < 4; coinId_++) {    
            payload = { coinId: coinId_ + 1, amount: amount }
            cy.apiPurchaseCoin(payload).then(response => {
                if (response.status == 200 && response.body.success) { 
                    if (coinId_ == 1) expectedAmountOwnA += 1  
                    else if (coinId_ == 2) expectedAmountOwnB += 1
                    else expectedAmountOwnC += 1
                } 
                }).receiveWebSocketMessage(websocket, 'Hello Client!').then((message_) => {
                    wsresponseData = JSON.parse(message_)
                    const dollarDeduction = coinId_ == 1 ? 100 :
                        coinId_ == 2 ? 202 : 342
                    actualAmountUSD = wsresponseData.inventory[0].amountOwned
                    actualAmountOwnA = wsresponseData.inventory[1].amountOwned
                    actualAmountOwnB = wsresponseData.inventory[2].amountOwned
                    actualAmountOwnC = wsresponseData.inventory[3].amountOwned
                    actualAmountOwnD = wsresponseData.inventory[4].amountOwned
                    expect(actualAmountUSD).to.equal(expectedAmountUSD - dollarDeduction)
                    expect(actualAmountOwnA).to.equal(expectedAmountOwnA)
                    expect(actualAmountOwnB).to.equal(expectedAmountOwnB)
                    expect(actualAmountOwnC).to.equal(expectedAmountOwnC)
                    expect(actualAmountOwnD).to.equal(expectedAmountOwnD)
            })
        }  
    })
})