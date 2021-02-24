/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { getDefaultSubstitutionRules, getViolationsPerPolicy, getViolationsCounter } from '../common/views'
import { getConfigObject } from '../config'

describe('RHACM4K-1648 - GRC UI: [P2][Sev2][policy-grc] CertPolicy with wrong namespace selector', () => {

  const confClusters = getConfigObject('clusters.yaml')
  // we will work only with one cluster, we do not need more
  const clusterList = Object.keys(confClusters).slice(0,1)
  // if process.env.MANAGED_CLUSTER_NAME is defined, use it instead
  if (Cypress.env('MANAGED_CLUSTER_NAME') !== undefined) {
    clusterList[0] = Cypress.env('MANAGED_CLUSTER_NAME')
  }
  const substitutionRules = [ [/\[ID\]/g, Cypress.env('RESOURCE_ID')], [/\[ONECLUSTERNAME\]/g, clusterList[0]] ]
  // policy-config is used for policy creation and validation
  const [policyName, confPolicy] = Object.entries(getConfigObject('issue3677/policy-config.yaml', 'yaml', substitutionRules))[0]
  const confViolationPatterns = getConfigObject('violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
  const confClusterViolations = getConfigObject('issue3677/violations-inform.yaml', 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
  const clusterViolations = getViolationsPerPolicy(policyName, confPolicy, confClusterViolations, clusterList)
  const violationsCounter = getViolationsCounter(clusterViolations)

  it(`Prefill a new policy ${policyName} using the form`, () => {
    cy.FromGRCToCreatePolicyPage()
      .createPolicyFromSelection(policyName, false, confPolicy)
  })

  it('Replace namespaceSelector value with "no-such-namespace"', () => {
    cy.toggleYAMLeditor('On')
      .YAMLeditor()
      .invoke('getValue')
      .then((content) => {
        const newContent = content.replace('include: ["default"]', 'include: ["no-such-namespace"]')
        cy.YAMLeditor()
          .invoke('setValue', newContent)
      })
    // we have modified the specification, reflect that in confPolicy
    confPolicy['Specification'] = 'Custom specifications'
  })

  it('Create a customized policy', () => {
    cy.get('#create-button-portal-id-btn').click()
    // after creation, always return to grc main page
    cy.CheckGrcMainPage()
  })

  it(`Check that policy ${policyName} is present in the policy listing`, () => {
    cy.verifyPolicyInListing(policyName, confPolicy)
  })

  it(`Wait for policy ${policyName} status to become available`, () => {
    cy.waitForPolicyStatus(policyName, violationsCounter)
  })

  it(`Verify policy ${policyName} violations at the Status - Clusters page`, () => {
    cy.visit(`/multicloud/policies/all/${confPolicy['namespace']}/${policyName}/status`).waitForPageContentLoad()
    // verify all violations per cluster
      .verifyViolationsInPolicyStatusClusters(policyName, confPolicy, clusterViolations, confViolationPatterns)
  })

  it(`Delete policy ${policyName}`, () => {
    // we could use a different way how to return to this page
    cy.visit('/multicloud/policies/all').waitForPageContentLoad()
      .actionPolicyActionInListing(policyName, 'Remove')
  })

  it(`Deleted policy ${policyName} is not present in the policy listing`, () => {
    cy.verifyPolicyNotInListing(policyName)
  })

})

