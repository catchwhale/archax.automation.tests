// CYPRESS > WEBSOCKETS > COMMANDS

Cypress.Commands.add('connectWebSocket', (url) => {
    cy.window().then((win) => {
        return new Cypress.Promise((resolve, reject) => {
            const ws = new win.WebSocket(url);

            ws.onopen = () => resolve(ws);
            ws.onerror = (err) => reject(err);
        });
    });
});

Cypress.Commands.add('sendWebSocketMessage', (ws, message) => {
    cy.wrap(ws).then((socket) => {
        socket.send(message);
    });
});

Cypress.Commands.add('receiveWebSocketMessage', (ws) => {
    return cy.wrap(new Cypress.Promise((resolve, reject) => {
        ws.onmessage = (event) => {
                resolve(event.data);
        };
        ws.onerror = (err) => reject(err);
    }));
});

Cypress.Commands.add('retrieveWebSocketData', (websocketUrl, message) => {
    cy.connectWebSocket(websocketUrl).then((ws) => {
        cy.receiveWebSocketMessage(ws, message)
    })
})
 