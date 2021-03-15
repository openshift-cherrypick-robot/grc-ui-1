/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { getConfigObject } from '../config'
import { getDefaultSubstitutionRules } from '../common/views'
const substitutionRules = getDefaultSubstitutionRules()
var policyNames = []
describe('RHACM4K-2342 - GRC UI: [P1][Sev1][policy-grc] Verify create policy with different NS', () => {
  it('Create Namespae policy to create template ns as duplicatetest', () => {
    const confFilePolicy = 'duplicatePolicyInDiffNS/create_ns_template.yaml'
    const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', substitutionRules)
    const policyName = rawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')
    cy.visit('/multicloud/policies/create')
      .createPolicyFromYAML(rawPolicyYAML)
    policyNames.push(policyName)
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
       cy.actionPolicyActionInListing(policyName, 'Remove')
       cy.verifyPolicyNotInListing(policyName)
    }
  })
})
