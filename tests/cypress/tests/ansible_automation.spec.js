/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

// BEWARE: The execution if this test is altered by an environment variable
// STANDALONE_TESTSUITE_EXECUTION (resp. CYPRESS_STANDALONE_TESTSUITE_EXECUTION)
// when set to 'FALSE', some checks are loosened due to possible conflicts with
// other tests running in the environment

/// <reference types="cypress" />
import { describeT } from '../support/tagging'
import { getConfigObject } from '../config'
import { getDefaultSubstitutionRules } from '../support/views'

describeT('RHACM4K-3471 - GRC UI: [P1][Sev1][console] All policies page: Verify automation modal', () => {
  const confFilePolicy = 'automation/policy_toBeAutomated.yaml'
  const credentialPolicy = 'automation/create_credential.yaml'
  const cleanUpPolicy = 'automation/clean_up.yaml'

  const substitutionRules = getDefaultSubstitutionRules()

  //create policy to automate
  const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', substitutionRules)
  const policyName = rawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')

  it('Creates the policy to automate using the YAML', () => {
    cy.visit('/multicloud/policies/create')
    cy.log(rawPolicyYAML)
      .createPolicyFromYAML(rawPolicyYAML, true)
  })

  it(`Check that policy ${policyName} is present in the policy listing`, () => {
    cy.verifyPolicyInListing(policyName, {})
  })

  it(`Wait for ${policyName} status to become available`, () => {
    cy.waitForPolicyStatus(policyName, '1/1')
  })

  //create credential
  const rawCredPolicyYAML = getConfigObject(credentialPolicy, 'raw', substitutionRules)
  const credPolicyName = rawCredPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')

  it('Create the credential policy using the YAML', () => {
    cy.visit('/multicloud/policies/create')
    cy.log(rawCredPolicyYAML)
      .createPolicyFromYAML(rawCredPolicyYAML, true)
  })

  it(`Check that policy ${credPolicyName} is present in the policy listing`, () => {
    cy.verifyPolicyInListing(credPolicyName, {})
  })

  it(`Wait for ${credPolicyName} status to become NonCompliant`, () => {
    cy.waitForPolicyStatus(credPolicyName, '[^0]/')
  })

  it(`Enforce ${credPolicyName}`, () => {
    cy.actionPolicyActionInListing(credPolicyName, 'Enforce')
  })

  it(`Wait for ${credPolicyName} status to be Compliant`, () => {
    cy.waitForPolicyStatus(credPolicyName, '0/')
  })

  //check modal post credential creation
  it('verifies sidebar credentials after creation', () => {
    //reload page to ensure credential is there
    cy.visit('/multicloud/policies/all')
    cy.verifyCredentialsInSidebar(policyName, 'grcui-e2e-credential')
  })

  it(`Delete policy ${credPolicyName}`, () => {
    cy.actionPolicyActionInListing(credPolicyName, 'Delete')
  })

  //verify contents of modal
  it('Successfully can schedule a disabled automation', {
    defaultCommandTimeout: 180000
  }, () => {
    cy.scheduleAutomation(policyName, 'grcui-e2e-credential', 'disabled')
  })
  it('Successfully can schedule a "run once" automation', {
    defaultCommandTimeout: 180000
  }, () => {
    cy.scheduleAutomation(policyName, 'grcui-e2e-credential', 'once')
  })
  it('Successfully can schedule a "manual" automation', {
    defaultCommandTimeout: 180000
  }, () => {
    cy.scheduleAutomation(policyName, 'grcui-e2e-credential', 'manual')
  })
  it('Verifies successful job history with mock', () => {
    cy.verifyHistoryPageWithMock(policyName, true)
  })
  it('Verifies failed job history with mock', () => {
    cy.verifyHistoryPageWithMock(policyName, false)
  })

  //check credential table empty state with mock
  it('verifies sidebar credentials not existing', () => {
    cy.verifyCredentialsInSidebar(policyName, '')
  })

  //check modal contents if operator not installed
  it('Prompts the user to install the ansible operator', () => {
    cy.verifyAnsibleInstallPrompt(policyName, false)
  })

  //check modal contents if operator is installed
  it('Skips install prompt if the ansible operator is installed', () => {
    cy.verifyAnsibleInstallPrompt(policyName, true)
  })

  //clean up
  it(`Delete policy ${policyName}`, () => {
    cy.actionPolicyActionInListing(policyName, 'Delete')
  })

  const cleanUprawPolicyYAML = getConfigObject(cleanUpPolicy, 'raw', substitutionRules)
  const cleanUppolicyName = cleanUprawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')

  it('Create the clean up policy using the YAML', () => {
    cy.visit('/multicloud/policies/create')
    cy.log(cleanUprawPolicyYAML)
      .createPolicyFromYAML(cleanUprawPolicyYAML, true)
  })
  it(`Wait for ${cleanUppolicyName} status to become NonCompliant`, () => {
    cy.waitForPolicyStatus(cleanUppolicyName, '[^0]/')
  })
  it(`Enforce ${cleanUppolicyName}`, () => {
    cy.actionPolicyActionInListing(cleanUppolicyName, 'Enforce')
  })
  it(`Wait for ${cleanUppolicyName} status to be Compliant`, () => {
    cy.waitForPolicyStatus(cleanUppolicyName, '0/')
  })
  it(`Delete policy ${cleanUppolicyName}`, () => {
    cy.actionPolicyActionInListing(cleanUppolicyName, 'Delete')
  })

  it(`Verify that policy ${policyName} is not present in the policy listing`, () => {
    cy.verifyPolicyNotInListing(policyName)
  })
  it(`Verify that policy ${credPolicyName} is not present in the policy listing`, () => {
    cy.verifyPolicyNotInListing(credPolicyName)
  })
  it(`Verify that policy ${cleanUppolicyName} is not present in the policy listing`, () => {
    cy.verifyPolicyNotInListing(cleanUppolicyName)
  })
})
