/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />

import { describeT } from '../support/tagging'
import { getConfigObject } from '../config'
import { getDefaultSubstitutionRules } from '../support/views'

const substitutionRules = getDefaultSubstitutionRules()
var policyNames = []

describeT('RHACM4K-2342 - GRC UI: [P1][Sev1][policy-grc] Verify create policy with different NS', () => {
  it('Create Namespace policy to create template ns as duplicatetest', () => {
    const confFilePolicy = 'duplicatePolicyInDiffNS/create_ns_template.yaml'
    const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', substitutionRules)
    const policyName = rawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')
    cy.visit('/multicloud/policies/create')
      .createPolicyFromYAML(rawPolicyYAML)
    policyNames.push(policyName)
    cy.waitForPolicyStatus(policyName, '0/1')
  })
  it('Create Pod policy with default as namespace', () => {
    const confFilePolicy = 'duplicatePolicyInDiffNS/pod_template_original.yaml'
    const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', substitutionRules)
    const policyName = rawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')
    cy.visit('/multicloud/policies/create')
      .createPolicyFromYAML(rawPolicyYAML)
    policyNames.push(policyName)
  })
  it('Create Pod policy with duplicatetest as namespace', () => {
    const confFilePolicy = 'duplicatePolicyInDiffNS/pod_template_duplicate.yaml'
    const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', substitutionRules)
    const policyName = rawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')
    cy.visit('/multicloud/policies/create')
      .createPolicyFromYAML(rawPolicyYAML)
    policyNames.push(policyName)
  })
  it('Delete created policies', () => {
    for (const policyName of policyNames) {
       cy.visit('/multicloud/policies/all').waitForPageContentLoad()
       .actionPolicyActionInListing(policyName, 'Delete')
    }
    for (const policyName of policyNames) {
      cy.verifyPolicyNotInListing(policyName)
    }
  })
})
