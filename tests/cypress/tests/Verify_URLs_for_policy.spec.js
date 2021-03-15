/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />

import { getConfigObject } from '../config'
import { getDefaultSubstitutionRules } from '../common/views'

describe('RHACM4K-2354 - GRC UI: [P1][Sev1][policy-grc] Check existent and non-existent URLs for the policy', () => {
  const substitutionRules = getDefaultSubstitutionRules()
  const confFilePolicy = 'duplicatePolicyInDiffNS/create_ns_template.yaml'
  const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', substitutionRules)
  const policyName = rawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')
  it('Create policy for the URL visit', () => {
    cy.visit('/multicloud/policies/create').waitForPageContentLoad()
      .createPolicyFromYAML(rawPolicyYAML)
  })
  it('Verify URLs for cluster name and policy that do exist', () => {
    cy.visit('/multicloud/policies/policy/local-cluster/default.'+policyName).waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage()
    cy.visit('/multicloud/policies/policy/local-cluster/default.'+policyName+'/a/b/c').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage()
  })
  it('Verify URLs for cluster name and policy that dont exist', () => {
    cy.visit('/multicloud/policies/policy/not-a-cluster/not-a-policy').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage(false)
    cy.visit('/multicloud/policies/policy/not-a-cluster/not-a-policy/a/b/c').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage(false)
  })
  it('Verify URLs for Namespace and policy that do exist', () => {
    cy.visit('/multicloud/policies/all/default/'+policyName).waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage()
    cy.visit('/multicloud/policies/all/default/'+policyName+'/a/b/c').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage()
    cy.visit('/multicloud/policies/all/default/'+policyName+'/yaml').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage()
    cy.visit('/multicloud/policies/all/default/'+policyName+'/yaml/a/b/c').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage()
  })
  it('Verify URLs for Namespace and policy that dont exist', () => {
    cy.visit('/multicloud/policies/all/not-a-namespace/not-a-policy').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage(false)
    cy.visit('/multicloud/policies/all/not-a-namespace/not-a-policy/status').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage(false, 'No policy status found')
    cy.visit('/multicloud/policies/all/not-a-namespace/not-a-policy/yaml').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage(false, )
    cy.visit('/multicloud/policies/all/not-a-namespace/not-a-policy/other/a/b/c').waitForPageContentLoad()
    .checkPolicyNoResourcesIconMessage(false)
  })
})
