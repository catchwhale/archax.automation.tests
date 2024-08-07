/**
 * @file this file is for the api
 */
import REQUEST from './lib/api/request';
import {JSON_API} from './config';

/**
 * new
 */
Cypress.Commands.add('apiRequestBuilder', (params) => {
	params.headers = {
			'Content-Type': 'application/json'
	}
	return new REQUEST(Cypress.env('apiUrl'), JSON_API, params).triggered();
});


/**
 * Buy a coin
 */
Cypress.Commands.add('apiPurchaseCoin', (params) => {
	cy.apiRequestBuilder({
		main: 'purchase-coin',
		ext: 'buyCoin',
		body: {
            "coinId": params.coinId,
            "amount": params.amount}
        })
});
