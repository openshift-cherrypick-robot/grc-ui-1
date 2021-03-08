/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />

describe('RHACM4K-2349 - GRC UI: [P1][Sev1][policy-grc] Create policy page: Check policy field validations', () => {

  const ID = Cypress.env('RESOURCE_ID')
  const errorMsgRegExp = /Invalid name due to Kubernetes naming restriction.The name must meet the following requirements:• contain no more than 253 characters• contain only lowercase alphanumeric characters, \'-\' or \'.\'• start with an alphanumeric character• end with an alphanumeric character/
//  const errorMsgRegExp = /Invalid name due to Kubernetes naming restriction.The name must meet the following requirements:/
  const alertMsgRegExp = /Name already exists: pressing 'Create' will prompt to update the existing policy/
  const namePatterns = [
                         'this-is-n,ot-a-valid-name',
                         '-this-is-not-a-valid-name',
                         'this-is-not-a-valid-name-',
                         'this-is-a-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-long-name-that-is-too-long-and-should-not-work-when-its-put-into-the-name-field'
                       ]
  // while we could use the next definition, due to a bug bz#1936431 better use a unique policy name
  //const longValidName = 'this-is-a---really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-long-valid-name-that-should-work-when-its-put-into-the-name-field'`
  const longValidName = `this-is-a---really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-really-long-valid-name-that-should-work-when-its-put-into-the-name-field-${ID}`

  it('Check that invalid policy name pattern issues an error', () => {
    cy.FromGRCToCreatePolicyPage()
    for (const name of namePatterns) {
      //cy.createPolicyFromSelection(name, false, {'namespace': 'default', 'specifications': ['IamPolicy']})
      cy.createPolicyFromSelection(name, false, {})
        .get('#create-button-portal-id-btn').click()  // click create
        .get('p.bx--inline-notification__title').invoke('text').should('match', /Create error:/)  // check error title
        .get('div.bx--inline-notification__subtitle').invoke('text').should('match', errorMsgRegExp)  // check error message
        .get('button.bx--inline-notification__close-button').click()  // close error window
    }
  })

  it('Check long but valid policy name pattern', () => {
    cy.createPolicyFromSelection(longValidName, true, {'namespace': 'default', 'specifications': ['IamPolicy']})
  })

  it('Check warning about a policy with a duplicate name', () => {
    cy.FromGRCToCreatePolicyPage()
      .createPolicyFromSelection(longValidName, false, {'namespace': 'default', 'specifications': ['IamPolicy']})
      .get('p.bx--inline-notification__title').invoke('text').should('match', /Alert:/)  // check alert title
      .get('div.bx--inline-notification__subtitle').invoke('text').should('match', alertMsgRegExp)  // check alert message
  })

  it('Cleanup: delete previously created policy', () => {
    cy.visit('/multicloud/policies')
      .actionPolicyActionInListing(longValidName, 'Remove')  // using that long name here seems to make some problems in the cypress code
  })

})
