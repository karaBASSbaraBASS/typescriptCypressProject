/// <reference types="cypress" />

import { AnyKindOfDictionary } from "cypress/types/lodash"

//const addContext = require('mochawesome/addContext');

describe('example to-do app', () => {
  beforeEach(() => {
		cy.visit('/')
	  cy.injectAxe()
  })

	it.only('check general acessability on a page', () => { 
		cy.customCheckAlly();
	})
})