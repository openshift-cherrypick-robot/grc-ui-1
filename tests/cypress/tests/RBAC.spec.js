/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />

import { describeT } from '../support/tagging'
import { getConfigObject } from '../config'
import { test_userPermissionsPageContentCheck } from '../support/tests'
import { getDefaultSubstitutionRules } from '../support/views'


describeT('@rbac RHACM4K-2584 - GRC UI: [P1][Sev1][policy-grc] Role Based Access Control tests', () => {

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
  it('Login again as cluster admin', () => {
    cy.login()
  })

  it('Delete test policies', () => {
    for (const policyName of policyNames) {
      cy.actionPolicyActionInListing(policyName, 'Delete')
        .verifyPolicyNotInListing(policyName)
    }
  })
})
