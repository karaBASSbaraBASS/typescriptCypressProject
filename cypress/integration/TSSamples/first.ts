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
	// addtest - all select should have name attribute and label
	// all labels should have for attribute with the existing ID
	// inputs and buttons should have lables
	//
})