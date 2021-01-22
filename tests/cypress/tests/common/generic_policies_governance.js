/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import {
  createPolicyFromSelection, verifyPolicyInListing, verifyPolicyNotInListing,
  actionPolicyActionInListing, verifyPolicyInPolicyDetails, getDefaultSubstitutionRules,
  verifyPolicyInPolicyDetailsTemplates, verifyPlacementRuleInPolicyDetails, verifyPlacementBindingInPolicyDetails,
  verifyViolationsInPolicyStatusClusters, verifyViolationsInPolicyStatusTemplates,
  getViolationsPerPolicy, getViolationsCounter, verifyPolicyDetailsInCluster, verifyPolicyTemplatesInCluster,
  verifyPolicyViolationDetailsInCluster, verifyPolicyViolationDetailsInHistory
} from '../../views/policy'
import { getConfigObject } from '../../config'


export const test_genericPolicyGovernance = (confFilePolicy, confFileViolationsInform, confFileViolationsEnforce=null, confFileClusters='clusters.yaml') => {

  const confClusters = getConfigObject(confFileClusters)
  const clusterList = Object.keys(confClusters)  // these are clusters we would be working with
  const substitutionRules = [ [/\[ID\]/g, Cypress.env('RESOURCE_ID')] ]
  // policy-config is used for policy creation and validation
  const confPolicies = getConfigObject(confFilePolicy, 'yaml', substitutionRules)

  for (const policyName in confPolicies) {

    it(`Create new policy ${policyName} using the form`, () => {
      cy.FromGRCToCreatePolicyPage()
      createPolicyFromSelection(policyName, true, confPolicies[policyName])
    })

    it(`Check that policy ${policyName} is present in the policy listing`, () => {
      verifyPolicyInListing(policyName, confPolicies[policyName])
    })

    it(`Wait for policy ${policyName} status to become available`, () => {
      cy.waitForPolicyStatus(policyName)
    })

    it(`Disable policy ${policyName}`, () => {
      actionPolicyActionInListing(policyName, 'Disable')
    })

    it(`Check disabled policy ${policyName}`, () => {
      verifyPolicyInListing(policyName, confPolicies[policyName], 'disabled')
    })

    it(`Enable policy ${policyName}`, () => {
      actionPolicyActionInListing(policyName, 'Enable')
    })

  }

  for (const policyName in confPolicies) {

    // we need to do the substitution per policy - probably we could do this once for whole test
    const confClusterViolations = getConfigObject(confFileViolationsInform, 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
    const clusterViolations = getViolationsPerPolicy(policyName, confPolicies[policyName], confClusterViolations, clusterList)
    const violationsCounter = getViolationsCounter(clusterViolations)

    it(`Wait for policy ${policyName} status to become available`, () => {
      cy.waitForPolicyStatus(policyName, violationsCounter)
    })

    it(`Check enabled policy ${policyName}`, () => {
      verifyPolicyInListing(policyName, confPolicies[policyName], 'enabled', violationsCounter)
    })

  }

  for (const policyName in confPolicies) {

    // we need to do the substitution per policy
    const confViolationPatterns = getConfigObject('violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
    const confClusterViolations = getConfigObject(confFileViolationsInform, 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
    const clusterViolations = getViolationsPerPolicy(policyName, confPolicies[policyName], confClusterViolations, clusterList)
    const violationsCounter = getViolationsCounter(clusterViolations)

    it(`Verify policy ${policyName} details at the detailed page`, () => {
      cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}`)
      verifyPolicyInPolicyDetails(policyName, confPolicies[policyName], 'enabled', violationsCounter)
    })

    it(`Verify policy ${policyName} template details at the detailed page`, () => {
      verifyPolicyInPolicyDetailsTemplates(policyName, confPolicies[policyName])
    })

    it(`Verify policy ${policyName} placement binding details at the detailed page`, () => {
      verifyPlacementBindingInPolicyDetails(policyName, confPolicies[policyName])
    })

    it(`Verify policy ${policyName} placement rule at the detailed page`, () => {
      verifyPlacementRuleInPolicyDetails(policyName, confPolicies[policyName], clusterViolations)
    })

    it(`Verify policy ${policyName} violations at the Status - Clusters page`, () => {
      cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}/status`)
      // verify all violations per cluster
      verifyViolationsInPolicyStatusClusters(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
    })

    it(`Verify policy ${policyName} violations at the Status - Templates page`, () => {
      // open the Templates tab - we should have a command for this
      cy.get('#policy-status-templates').click()
      // verify violations per template
      verifyViolationsInPolicyStatusTemplates(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
    })

    for (const clusterName of clusterList) {
      it(`Verify policy details & templates on cluster ${clusterName} detailed page`, () => {
        cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}`)
        cy.goToPolicyClusterPage(policyName, confPolicies[policyName], clusterName)
        verifyPolicyDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
        verifyPolicyTemplatesInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations)
        verifyPolicyViolationDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
      })
    }

  }

  // run the test for enforced policy only if the config file was given
  if (confFileViolationsEnforce) {

    for (const policyName in confPolicies) {

      it(`Enforce policy ${policyName}`, () => {
        cy.visit('/multicloud/policies/all')
        actionPolicyActionInListing(policyName, 'Enforce')
      })

      it(`Check that enforced policy ${policyName} is present in the policy listing`, () => {
        confPolicies[policyName]['enforce'] = true
        verifyPolicyInListing(policyName, confPolicies[policyName])
      })

    }

    for (const policyName in confPolicies) {

      // we need to do the substitution per policy
      const confViolationPatterns = getConfigObject('violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
      const confClusterViolations = getConfigObject(confFileViolationsEnforce, 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
      const clusterViolations = getViolationsPerPolicy(policyName, confPolicies[policyName], confClusterViolations, clusterList)
      const violationsCounter = getViolationsCounter(clusterViolations)

      it(`Wait for policy ${policyName} status to become available`, () => {
        cy.visit('/multicloud/policies/all')
        cy.waitForPolicyStatus(policyName, violationsCounter)
      })

      it(`Check enabled policy ${policyName}`, () => {
        verifyPolicyInListing(policyName, confPolicies[policyName], 'enabled', violationsCounter)
      })

      it(`Verify policy ${policyName} details at the detailed page`, () => {
        cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}`)
        verifyPolicyInPolicyDetails(policyName, confPolicies[policyName], 'enabled', violationsCounter)
      })

      it(`Verify policy ${policyName} template details at the detailed page`, () => {
        verifyPolicyInPolicyDetailsTemplates(policyName, confPolicies[policyName])
      })

      it(`Verify policy ${policyName} placement binding details at the detailed page`, () => {
        verifyPlacementBindingInPolicyDetails(policyName, confPolicies[policyName])
      })

      it(`Verify policy ${policyName} placement rule at the detailed page`, () => {
        verifyPlacementRuleInPolicyDetails(policyName, confPolicies[policyName], clusterViolations)
      })

      it(`Verify policy ${policyName} violations at the Status - Clusters page`, () => {
        cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}/status`)
        // verify all violations per cluster
        verifyViolationsInPolicyStatusClusters(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
      })

      it(`Verify policy ${policyName} violations at the Status - Templates page`, () => {
        // open the Templates tab - we should have a command for this
        cy.get('#policy-status-templates').click()
        // verify violations per template
        verifyViolationsInPolicyStatusTemplates(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
      })

      for (const clusterName of clusterList) {
        it(`Verify policy details & templates on cluster ${clusterName} detailed page`, () => {
          cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}`)
          cy.goToPolicyClusterPage(policyName, confPolicies[policyName], clusterName)
          verifyPolicyDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
          verifyPolicyTemplatesInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations)
          verifyPolicyViolationDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
        })
      }

    }
  }

  // verify the History page for each policy, cluster and template used
  // this would be a bit more complicated as history is split per policy, cluster, template
  for (const policyName in confPolicies) {
    // read the configuration for each policy
    const confViolationPatterns = getConfigObject('violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
    const confClusterViolationsInform = getConfigObject(confFileViolationsInform, 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
    const clusterViolationsInform = getViolationsPerPolicy(policyName, confPolicies[policyName], confClusterViolationsInform, clusterList)
    let confClusterViolationsEnforce
    let clusterViolationsEnforce
    if (confFileViolationsEnforce) {
      confClusterViolationsEnforce = getConfigObject(confFileViolationsEnforce, 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
      clusterViolationsEnforce = getViolationsPerPolicy(policyName, confPolicies[policyName], confClusterViolationsEnforce, clusterList)
    }
    // now for each cluster get a merged list of cluster violations (from both Inform and Enforce violations)
    for (const clusterName of clusterList) {
      const allClusterViolations = confFileViolationsEnforce ? clusterViolationsInform[clusterName].concat(clusterViolationsEnforce[clusterName]) : clusterViolationsInform[clusterName]
      const templateDict = {}
      // now I need to split violations per template name
      for (const violation of allClusterViolations) {
        const templateName = violation.replace(/-[^-]*$/, '')
        if (!(templateName in templateDict)) {
          templateDict[templateName] = []
        }
        templateDict[templateName].push(violation)
      }
      // now iterate through template names and check all violations are listed
      for (const [templateName, violations] of Object.entries(templateDict)) {
        const url = `/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}/status/${clusterName}/templates/${templateName}/history`

        it(`Verify the History page for policy ${policyName} cluster ${clusterName} template ${templateName}`, () => {
          cy.visit(url)
          verifyPolicyViolationDetailsInHistory(templateName, violations, confViolationPatterns)
        })

      }
    }
  }

  // delete created policies at the end
  for (const policyName in confPolicies) {
    it(`Policy ${policyName} can be deleted in the policy listing`, () => {
      // we could use a different way how to return to this page
      cy.visit('/multicloud/policies/all')
      actionPolicyActionInListing(policyName, 'Remove')
    })

    it(`Deleted policy ${policyName} is not present in the policy listing`, () => {
      verifyPolicyNotInListing(policyName)
    })
  }

}
