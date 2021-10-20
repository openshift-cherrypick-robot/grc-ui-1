/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />

import { describeT } from '../support/tagging'
import { getConfigObject } from '../config'
import { test_userPermissionsPageContentCheck } from '../support/tests'
import { getDefaultSubstitutionRules } from '../support/views'


describeT('@rbac RHACM4K-2584 - GRC UI: [P1][Sev1][console] Role Based Access Control tests', () => {

  // we expect the user password to be exported in CYPRESS_RBAC_PASS variable
  const RBACpass = Cypress.env('RBAC_PASS')
  const IDP = Cypress.env('OC_IDP') || 'e2e-htpasswd'
  const confPolicies = getConfigObject('RBAC/policy-config.yaml', 'yaml', getDefaultSubstitutionRules())
  const permissions = getConfigObject('RBAC/permissions.json')
  const policyNames = Object.keys(confPolicies).filter(name => name != 'disabled-policy')
  // filter out policies for namespace rbac-test-1
  // and gather namespaces used by policies
  // yeah, we could hardcode the list but let's pretend the code is more generic
  const policyNamesNS1 = []
  const namespacesSet = new Set()
  for (const name of policyNames) {
    namespacesSet.add(confPolicies[name]['namespace'])
    if (confPolicies[name]['namespace'] == 'e2e-rbac-test-1') {
      policyNamesNS1.push(name)
    }
  }
  const namespaces = Array.from(namespacesSet)
  const namespacesForNamespaced = [ 'e2e-rbac-test-1' ]
  const id = Cypress.env('RESOURCE_ID')
  const policyNameFilter = `${id}-e2e-rbac`

  it('Verify that CYPRESS_RBAC_PASS environment variable is defined', () => {
    expect(RBACpass).to.not.equal(undefined)
  })

  it('Create policies used for the testing', () => {

    for (const policyName of policyNames) {
      cy.FromGRCToCreatePolicyPage()
        .createPolicyFromSelection(policyName, true, confPolicies[policyName])
    }

    for (const policyName of policyNames) {
      cy.waitForPolicyStatus(policyName)
    }

  })

  /*****************
   * Ansible Setup *
   *****************/
  const subscriptionPolicy = 'automation/create_subscription.yaml'
  const credentialPolicy = 'automation/create_credential.yaml'
  const cleanUpPolicy = 'automation/clean_up.yaml'

  //create subscription to install ansible automation operator
  const substitutionRules = getDefaultSubstitutionRules()
  const rawSubPolicyYAML = getConfigObject(subscriptionPolicy, 'raw', substitutionRules)
  const subPolicyName = rawSubPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')

  it('Ansible setup: Create a subscription to install the Ansible operator', () => {
    cy.visit('/multicloud/policies/create')
    cy.log(rawSubPolicyYAML)
      .createPolicyFromYAML(rawSubPolicyYAML, true)
  })
  it(`Ansible setup: Check that policy ${subPolicyName} is present in the policy listing`, () => {
    cy.verifyPolicyInListing(subPolicyName, {})
  })
  it(`Ansible setup: Wait for ${subPolicyName} status to become NonCompliant`, () => {
    cy.waitForPolicyStatus(subPolicyName, '[^0]/')
  })
  it(`Ansible setup: Enforce ${subPolicyName}`, () => {
    cy.actionPolicyActionInListing(subPolicyName, 'Enforce')
  })
  it(`Ansible setup: Wait for ${subPolicyName} status to be Compliant`, () => {
    cy.waitForPolicyStatus(subPolicyName, '0/')
  })
  it(`Ansible setup: Delete policy ${subPolicyName}`, () => {
    cy.actionPolicyActionInListing(subPolicyName, 'Delete')
  })

  //create Ansible credential
  const rawCredPolicyYAML = getConfigObject(credentialPolicy, 'raw', substitutionRules)
  const credPolicyName = rawCredPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')

  it('Ansible setup: Create the credential policy using the YAML', () => {
    cy.visit('/multicloud/policies/create')
    cy.log(rawCredPolicyYAML)
      .createPolicyFromYAML(rawCredPolicyYAML, true)
  })
  it(`Ansible setup: Check that policy ${credPolicyName} is present in the policy listing`, () => {
    cy.verifyPolicyInListing(credPolicyName, {})
  })
  it(`Ansible setup: Wait for ${credPolicyName} status to become NonCompliant`, () => {
    cy.waitForPolicyStatus(credPolicyName, '[^0]/')
  })
  it(`Ansible setup: Enforce ${credPolicyName}`, () => {
    cy.actionPolicyActionInListing(credPolicyName, 'Enforce')
  })
  it(`Ansible setup: Wait for ${credPolicyName} status to be Compliant`, () => {
    cy.waitForPolicyStatus(credPolicyName, '0/')
  })
  //check modal post credential creation
  it('Ansible setup: verifies sidebar credentials after creation', () => {
    //reload page to ensure credential is there
    cy.visit('/multicloud/policies/all')
    cy.verifyCredentialsInSidebar(policyNamesNS1[0], 'grcui-e2e-credential')
  })
  it(`Ansible setup: Delete policy ${credPolicyName}`, () => {
    cy.actionPolicyActionInListing(credPolicyName, 'Delete')
  })

  it('Logout', () => {
    cy.logout()
  })

  /*******************
   * RBAC User Tests *
   *******************/
  test_userPermissionsPageContentCheck('e2e-cluster-admin-cluster', RBACpass, IDP, policyNames, confPolicies, namespaces, permissions['clusterAdmin'], false, false, policyNameFilter)

  test_userPermissionsPageContentCheck('e2e-admin-cluster', RBACpass, IDP, policyNames, confPolicies, namespaces, permissions['admin'], false, false, policyNameFilter)

  test_userPermissionsPageContentCheck('e2e-edit-cluster', RBACpass, IDP, policyNames, confPolicies, namespaces, permissions['edit'], false, false, policyNameFilter)

  test_userPermissionsPageContentCheck('e2e-view-cluster', RBACpass, IDP, policyNames, confPolicies, namespaces, permissions['view'], false, false, policyNameFilter)

  test_userPermissionsPageContentCheck('e2e-group-cluster', RBACpass, IDP, policyNames, confPolicies, namespaces, permissions['view'], false, false, policyNameFilter)

  test_userPermissionsPageContentCheck('e2e-cluster-admin-ns', RBACpass, IDP, policyNamesNS1, confPolicies, namespacesForNamespaced, permissions['clusterAdmin'], true, false, policyNameFilter)

  // This would be 1 policy, but admin user also has view access to namespace 2
  // Verify admin permissions for this user by filtering for the specific policy
  test_userPermissionsPageContentCheck('e2e-admin-ns', RBACpass, IDP, policyNamesNS1, confPolicies, namespaces, permissions['admin'], true, false, `${policyNameFilter}-test-1`)

  test_userPermissionsPageContentCheck('e2e-edit-ns', RBACpass, IDP, policyNamesNS1, confPolicies, namespacesForNamespaced, permissions['edit'], true, false, policyNameFilter)

  test_userPermissionsPageContentCheck('e2e-view-ns', RBACpass, IDP, policyNamesNS1, confPolicies, namespacesForNamespaced, permissions['view'], true, false, policyNameFilter)

  test_userPermissionsPageContentCheck('e2e-group-ns', RBACpass, IDP, policyNamesNS1, confPolicies, namespaces, permissions['view'], true, false, policyNameFilter)

  /***********
   * Cleanup *
   ***********/
  it('Login again as kubeadmin', () => {
    cy.login()
  })

  it('Delete test policies', () => {
    for (const policyName of policyNames) {
      cy.actionPolicyActionInListing(policyName, 'Delete')
        .verifyPolicyNotInListing(policyName)
    }
  })

  const cleanUprawPolicyYAML = getConfigObject(cleanUpPolicy, 'raw', substitutionRules)
  const cleanUppolicyName = cleanUprawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')
  it('Ansible cleanup: Create the clean up policy using the YAML', () => {
    cy.visit('/multicloud/policies/create')
    cy.log(cleanUprawPolicyYAML)
      .createPolicyFromYAML(cleanUprawPolicyYAML, true)
  })
  it(`Ansible cleanup: Wait for ${cleanUppolicyName} status to become NonCompliant`, () => {
    cy.waitForPolicyStatus(cleanUppolicyName, '[^0]/')
  })
  it(`Ansible cleanup: Enforce ${cleanUppolicyName}`, () => {
    cy.actionPolicyActionInListing(cleanUppolicyName, 'Enforce')
  })
  it(`Ansible cleanup: Wait for ${cleanUppolicyName} status to be Compliant`, () => {
    cy.waitForPolicyStatus(cleanUppolicyName, '0/')
  })
  it(`Ansible cleanup: Delete policy ${cleanUppolicyName}`, () => {
    cy.actionPolicyActionInListing(cleanUppolicyName, 'Delete')
  })
  it(`Ansible cleanup: Verify that policy ${cleanUppolicyName} is not present in the policy listing`, () => {
    cy.verifyPolicyNotInListing(cleanUppolicyName)
  })
})
