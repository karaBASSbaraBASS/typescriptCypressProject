/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
		cy.visit('/')
	  cy.injectAxe()
  })

	it('check general acessability on a page', () => { 
		cy.customCheckAlly();
	})
})