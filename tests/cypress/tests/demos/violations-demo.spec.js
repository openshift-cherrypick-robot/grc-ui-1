/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import {
  getDefaultSubstitutionRules, verifyViolationsInPolicyStatusClusters, verifyViolationsInPolicyStatusTemplates
} from '../../views/policy'
//import { getUniqueResourceName } from '../../scripts/utils'
import { getConfigObject } from '../../config'

// this demo should only ilustrate how policy violations can be checked
// it doesn't do any set up
// it uses 'ksrot-test-policy' currently available on multicloud-console.apps.dho-461-acm22.dev09.red-chesterfield.com
// along with an expectations that 3 particular clusters are available there too

describe('Testing policy deviations as specified in the violations.yaml config file', () => {
    const policyName = 'ksrot-test-policy'
    //const uPolicyName = getUniqueResourceName(policyName)
    const uPolicyName = policyName
    // optionally read details about configured clusters
    //const confClusters = getConfigObject('demos/clusters.yaml')
    // read all violation message patterns
    const confViolationPatterns = getConfigObject('violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:uPolicyName}))

    // read expected cluster violations
    const confClusterViolations = getConfigObject('demos/violations.yaml', 'yaml', getDefaultSubstitutionRules({policyname:uPolicyName}))

    it ('All expected violations are listed', () => {
      cy.visit(`/multicloud/policies/all/default/${uPolicyName}/status`)
      // verify all violations per cluster
      verifyViolationsInPolicyStatusClusters(uPolicyName, {'namespace': 'default'}, confClusterViolations, confViolationPatterns)
      // open the Templates tab - we should have a command for this
      cy.get('#policy-status-templates').click()
      // verify violations per template
      verifyViolationsInPolicyStatusTemplates(uPolicyName, {'namespace': 'default'}, confClusterViolations, confViolationPatterns)
    })

})
