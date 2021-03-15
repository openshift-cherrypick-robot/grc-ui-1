/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />
import { getDefaultSubstitutionRules } from '../common/views'
import { getConfigObject } from '../config'

const confClusters = getConfigObject('clusters.yaml')
// we will work only with one cluster, we do not need more
const clusterList = Object.keys(confClusters).slice(0,1)
// if process.env.MANAGED_CLUSTER_NAME is defined, use it instead
if (Cypress.env('MANAGED_CLUSTER_NAME') !== undefined) {
  clusterList[0] = Cypress.env('MANAGED_CLUSTER_NAME')
}

const rawPolicyYAML = getConfigObject('issue2444/pod_policy_raw.yaml', 'raw', getDefaultSubstitutionRules({'clusterselector':`- {key: name, operator: In, values: ["${clusterList[0]}"]}`}))
const policyName = rawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')
const policyConf = { 'namespace': 'default' }
const confViolationPatterns = getConfigObject('violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
const confClusterViolations = getConfigObject('issue2444/violations-inform.yaml', 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
const clusterViolations = {}
clusterViolations[clusterList[0]] = confClusterViolations['*']

describe('RHACM4K-1650 - GRC UI: [P1][Sev1][policy-grc] configurationPoicy controller: not matching namespaceSelector issues a violation', () => {

  // create a Pod policy not matching any namespace in namespaceSelector
  it(`Create Pod policy ${policyName} from YAML, expecting a compliance`, () => {
    cy.FromGRCToCreatePolicyPage()
      .createPolicyFromYAML(rawPolicyYAML, true)
      .CheckGrcMainPage()
      .waitForPolicyStatus(policyName)
  })

  it('Verify the violation is listed on a policy Status page', () => {
    cy.visit(`/multicloud/policies/all/default/${policyName}/status`).waitForPageContentLoad()
      .verifyViolationsInPolicyStatusClusters(policyName, policyConf, clusterViolations, confViolationPatterns)
  })

  it('Delete Pod policy ${policyName}', () => {
    cy.visit('/multicloud/policies/all')
      .actionPolicyActionInListing(policyName, 'Remove')
      .verifyPolicyNotInListing(policyName)
  })

})
