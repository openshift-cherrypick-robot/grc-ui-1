/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />

import { describeT } from '../support/tagging'

describeT('RHACM4K-2349 - GRC UI: [P1][Sev1][console] Create policy page: Check policy field validations', () => {

  const errorMsg = 'Invalid name due to Kubernetes naming restriction.The name must meet the following requirements:• the combined length of namespace and policy name (namespaceName.policyName) should not exceed 63 characters• contain only lowercase alphanumeric characters, \'-\' or \'.\'• start with an alphanumeric character• end with an alphanumeric character'
  const errorMsg2 = 'Invalid name: should only have lowercase alphanumeric characters, \'-\', or \'.\' and not begin or end with punctuation'
//  const errorMsgRegExp = /Invalid name due to Kubernetes naming restriction.The name must meet the following requirements:/
  const alertMsg = 'Name already exists: pressing \'Create\' will prompt to update the existing policy'
  const namePatterns = [
                         ['this-is-n,ot-a-valid-name', 'default', errorMsg],  // comma inside
                         ['-this-is-not-a-valid-name', 'default', errorMsg2], // starts with dash
                         ['this-is-not-a-valid-name-', 'default', errorMsg],  // ends with dash
                         ['this-is-Not-a-valid-name-', 'default', errorMsg],  // contain uppercase letter
                         ['this-is-56-characters-long-policy-name-xxxxxxxxxxxxxxxxx', 'default', errorMsg],  // namespace.name = 64 characters
                         ['this-is-59-characters-long-policy-name-xxxxxxxxxxxxxxxxxxxx', 'hive', errorMsg],  // namespace.name = 64 characters
                         ['this-is-40-characters-long-policy-name-x', 'open-cluster-management', errorMsg],  // namespace.name = 64 characters
                         ['this-is-'+'very-'.repeat(20)+'long-policy-name', 'default', errorMsg],  // namespace.name is really long
                       ]
  const longestValidName = 'this-is-55-characters-long-policy-name-xxxxxxxxxxxxxxxx' // default.name = 63 chars

  it('Check that invalid policy name pattern issues an error', () => {
    cy.FromGRCToCreatePolicyPage()
    for (const [name, namespace, message] of namePatterns) {
      cy.waitUntil(() => cy.createPolicyFromSelection(name, false, {'namespace': namespace}).get('#create').scrollIntoView().should('be.visible'))
        .click()
        .checkNotificationMessage('Danger Alert', 'Create error:', message)
    }
  })

  it('Check long but valid policy name pattern', () => {
    cy.createPolicyFromSelection(longestValidName, true, {'namespace': 'default', 'specifications': ['IamPolicy']})
  })

  it('Check warning about a policy with a duplicate name', () => {
    cy.FromGRCToCreatePolicyPage()
      .createPolicyFromSelection(longestValidName, false, {'namespace': 'default', 'specifications': ['IamPolicy']})
      .checkNotificationMessage('Warning Alert', 'Alert:', alertMsg)
  })

  it('Cleanup: delete previously created policy', () => {
    cy.visit('/multicloud/policies')
      .waitForPolicyStatus(longestValidName)  // wait for policy status to make sure we are deleting it also with binding
      .actionPolicyActionInListing(longestValidName, 'Delete')  // using that long name here seems to make some problems in the cypress code
  })

})
