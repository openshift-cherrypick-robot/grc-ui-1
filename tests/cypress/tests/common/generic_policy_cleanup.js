/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import {
  createPolicyFromYAML, actionPolicyActionInListing, verifyPolicyInListing, verifyPolicyNotInListing, getDefaultSubstitutionRules
} from '../../views/policy'
import { getConfigObject } from '../../config'

export const cleanup_usingPolicyYAML = (confFilePolicy, substitutionRules=null) => {

  if (substitutionRules === null) {
    substitutionRules = getDefaultSubstitutionRules()
  }
  const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', substitutionRules)
  const policyName = rawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')

  it('Create the clean up policy using the YAML', () => {
    cy.visit('/multicloud/policies/create')
    cy.log(rawPolicyYAML)
    createPolicyFromYAML(rawPolicyYAML, true)
  })

  it(`Check that policy ${policyName} is present in the policy listing`, () => {
    verifyPolicyInListing(policyName, {})
  })

  it(`Wait for ${policyName} status to become available`, () => {
    cy.waitForPolicyStatus(policyName, '0/')
  })

  it(`Delete policy ${policyName}`, () => {
    actionPolicyActionInListing(policyName, 'Remove')
  })

  it(`Verify that policy ${policyName} is not present in the policy listing`, () => {
    verifyPolicyNotInListing(policyName)
  })

}
