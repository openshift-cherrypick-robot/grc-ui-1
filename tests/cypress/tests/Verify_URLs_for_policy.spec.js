/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />

import { describeT } from '../support/tagging'
import { getConfigObject } from '../config'
import { getDefaultSubstitutionRules } from '../support/views'

describeT('RHACM4K-2354 - GRC UI: [P1][Sev1][console] Check existent and non-existent URLs for the policy', () => {
  const substitutionRules = getDefaultSubstitutionRules()
  const confFilePolicy = 'duplicatePolicyInDiffNS/create_ns_template.yaml'
  const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', substitutionRules)
  const policyName = rawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')
  it('Create policy for the URL visit', () => {
    cy.visit('/multicloud/policies/create').waitForPageContentLoad()
      .createPolicyFromYAML(rawPolicyYAML)
  })
  it('Verify URLs for Namespace and policy that do exist', () => {
    cy.visit('/multicloud/policies/all/default/'+policyName).waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage()
    cy.visit('/multicloud/policies/all/default/'+policyName+'/clusters').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage()
  })
  it('Verify URLs for Namespace and policy that dont exist', () => {
    cy.visit('/multicloud/policies/all/not-a-namespace/not-a-policy').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage(false, 'Resource not found')
    cy.visit('/multicloud/policies/all/not-a-namespace/not-a-policy/clusters').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage(false, 'Resource not found')
  })
  it('Delete the policy', () => {
    cy.visit('/multicloud/policies/all').waitForPageContentLoad()
    .actionPolicyActionInListing(policyName, 'Delete')
    .verifyPolicyNotInListing(policyName)
  })
})
