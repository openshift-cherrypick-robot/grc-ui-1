/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

// BEWARE: The execution if this test is altered by an environment variable
// STANDALONE_TESTSUITE_EXECUTION (resp. CYPRESS_STANDALONE_TESTSUITE_EXECUTION)
// when set to 'FALSE', some checks are loosened due to possible conflicts with
// other tests running in the environment

/// <reference types="cypress" />
import { getDefaultSubstitutionRules, getViolationsPerPolicy, getViolationsCounter,
         getClusterViolationsCounterAndPolicyList } from './views'
import { getConfigObject } from '../config'


export const test_genericPolicyGovernance = (confFilePolicy, confFileViolationsInform, confFileViolationsEnforce=null, confFileClusters='clusters.yaml', filteredClusterList=null) => {

  const confClusters = getConfigObject(confFileClusters)
  const clusterList = filteredClusterList ? filteredClusterList : Object.keys(confClusters)
  const substitutionRules = [ [/\[ID\]/g, Cypress.env('RESOURCE_ID')] ]
  // policy-config is used for policy creation and validation
  const confPolicies = getConfigObject(confFilePolicy, 'yaml', substitutionRules)

  if (Cypress.env('STANDALONE_TESTSUITE_EXECUTION') !== 'FALSE') {
    // first check there are no policies, otherwise numbers won't match
    it('Verify there are no policies present', () => {
      cy.get('div.no-resource')  // there should be no-resource element
        .get('.grc-view-by-policies-table').should('not.exist')  // there should not be policy table
   })
  }

  for (const policyName in confPolicies) {

    it(`Create new policy ${policyName} using the form`, () => {
      cy.FromGRCToCreatePolicyPage()
        .createPolicyFromSelection(policyName, true, confPolicies[policyName])
    })

    it(`Check that policy ${policyName} is present in the policy listing`, () => {
      cy.verifyPolicyInListing(policyName, confPolicies[policyName])
    })

    it(`Wait for policy ${policyName} status to become available`, () => {
      cy.waitForPolicyStatus(policyName)
    })

    it(`Disable policy ${policyName}`, () => {
     cy.actionPolicyActionInListing(policyName, 'Disable')
    })

    it(`Check disabled policy ${policyName}`, () => {
      cy.verifyPolicyInListing(policyName, confPolicies[policyName], 'disabled')
    })

    it(`Enable policy ${policyName}`, () => {
      cy.actionPolicyActionInListing(policyName, 'Enable')
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
      cy.verifyPolicyInListing(policyName, confPolicies[policyName], 'enabled', violationsCounter)
    })

  }

  // verify cluster violation listed on the All policies page, Clusters tab
  for (const clusterName of clusterList) {
    const [violationCounter, violatedPolicies] = getClusterViolationsCounterAndPolicyList(clusterName, clusterList, confFileViolationsInform, confPolicies)

    // BEWARE: The check would only work if there were no other policies present on the cluster
    // if this is not the case, avoid passing violationCounter and violatedPolicies to
    // waitForClusterViolationsStatus() and verifyClusterViolationsInListing() functions below
    // Currently this is controlled using STANDALONE_TESTSUITE_EXECUTION variable
    it('Wait for cluster violation status to become available', () => {
      // switch to the Clusters tab
      cy.get('#grc-cluster-view').click()
        .then(() => {
          if (Cypress.env('STANDALONE_TESTSUITE_EXECUTION') !== 'FALSE') {
            cy.waitForClusterViolationsStatus(clusterName, violationCounter)
          } else {
            cy.waitForClusterViolationsStatus(clusterName)
          }
        })
    })

    it(`Check cluster ${clusterName} violations`, () => {
      if (Cypress.env('STANDALONE_TESTSUITE_EXECUTION') !== 'FALSE') {
        cy.verifyClusterViolationsInListing(clusterName, violationCounter, violatedPolicies)
      } else {
        cy.verifyClusterViolationsInListing(clusterName)
      }
    })

  }

  for (const policyName in confPolicies) {

    // we need to do the substitution per policy
    const confViolationPatterns = getConfigObject('violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
    const confClusterViolations = getConfigObject(confFileViolationsInform, 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
    const clusterViolations = getViolationsPerPolicy(policyName, confPolicies[policyName], confClusterViolations, clusterList)
    const violationsCounter = getViolationsCounter(clusterViolations)

    it(`Verify policy ${policyName} details at the detailed page`, () => {
      cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}`).waitForPageContentLoad()
        .verifyPolicyInPolicyDetails(policyName, confPolicies[policyName], 'enabled', violationsCounter)
    })

    it(`Verify policy ${policyName} template details at the detailed page`, () => {
      cy.verifyPolicyInPolicyDetailsTemplates(policyName, confPolicies[policyName])
    })

    it(`Verify policy ${policyName} placement binding details at the detailed page`, () => {
      cy.verifyPlacementBindingInPolicyDetails(policyName, confPolicies[policyName])
    })

    it(`Verify policy ${policyName} placement rule at the detailed page`, () => {
      cy.waitForClusterPolicyStatus(clusterViolations)  // since it could happen that some clusters do not have the status yet
        .verifyPlacementRuleInPolicyDetails(policyName, confPolicies[policyName], clusterViolations)
    })

    it(`Verify policy ${policyName} violations at the Status - Clusters page`, () => {
      cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}/status`).waitForPageContentLoad()
      // verify all violations per cluster
      cy.waitForClusterTemplateStatus(clusterViolations)
        .verifyViolationsInPolicyStatusClusters(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
    })

    it(`Verify policy ${policyName} violations at the Status - Templates page`, () => {
      // open the Templates tab - we should have a command for this
      cy.get('#policy-status-templates').click()
      // verify violations per template
        .verifyViolationsInPolicyStatusTemplates(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
    })

    for (const clusterName of clusterList) {
      it(`Verify policy details & templates on cluster ${clusterName} detailed page`, () => {
        cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}`).waitForPageContentLoad()
        cy.goToPolicyClusterPage(policyName, confPolicies[policyName], clusterName)
          .verifyPolicyDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
          .verifyPolicyTemplatesInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations)
          .verifyPolicyViolationDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
      })
    }

  }

  // run the test for enforced policy only if the config file was given
  if (confFileViolationsEnforce) {

    for (const policyName in confPolicies) {

      it(`Enforce policy ${policyName}`, () => {
        cy.visit('/multicloud/policies/all').waitForPageContentLoad()
          .actionPolicyActionInListing(policyName, 'Enforce')
      })

      it(`Check that enforced policy ${policyName} is present in the policy listing`, () => {
        confPolicies[policyName]['enforce'] = true
        cy.verifyPolicyInListing(policyName, confPolicies[policyName])
      })

    }

    for (const policyName in confPolicies) {

      // we need to do the substitution per policy
      const confViolationPatterns = getConfigObject('violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
      const confClusterViolations = getConfigObject(confFileViolationsEnforce, 'yaml', getDefaultSubstitutionRules({policyname:policyName}))
      const clusterViolations = getViolationsPerPolicy(policyName, confPolicies[policyName], confClusterViolations, clusterList)
      const violationsCounter = getViolationsCounter(clusterViolations)

      it(`Wait for policy ${policyName} status to become available`, () => {
        cy.visit('/multicloud/policies/all').waitForPageContentLoad()
        cy.waitForPolicyStatus(policyName, violationsCounter)
      })

      it(`Check enabled policy ${policyName}`, () => {
        cy.verifyPolicyInListing(policyName, confPolicies[policyName], 'enabled', violationsCounter)
      })

      // verify cluster violation listed on the All policies page, Clusters tab
      for (const clusterName of clusterList) {
        const [violationCounter, violatedPolicies] = getClusterViolationsCounterAndPolicyList(clusterName, clusterList, confFileViolationsEnforce, confPolicies)

        // BEWARE: The check would only work if there were no other policies present on the cluster
        // if this is not the case, avoid passing violationCounter and violatedPolicies to
        // waitForClusterViolationsStatus() and verifyClusterViolationsInListing() functions below
        // Currently this is controlled using STANDALONE_TESTSUITE_EXECUTION variable
        it('Wait for cluster violation status to become available', () => {
          // switch to the Clusters tab
          cy.get('#grc-cluster-view').click()
            .then(() => {
              if (Cypress.env('STANDALONE_TESTSUITE_EXECUTION') !== 'FALSE') {
                cy.waitForClusterViolationsStatus(clusterName, violationCounter)
              } else {
                cy.waitForClusterViolationsStatus(clusterName)
              }
            })
        })

        it(`Check cluster ${clusterName} violations`, () => {
          if (Cypress.env('STANDALONE_TESTSUITE_EXECUTION') !== 'FALSE') {
            cy.verifyClusterViolationsInListing(clusterName, violationCounter, violatedPolicies)
          } else {
            cy.verifyClusterViolationsInListing(clusterName)
          }
        })

      }

      it(`Verify policy ${policyName} details at the detailed page`, () => {
        cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}`).waitForPageContentLoad()
          .verifyPolicyInPolicyDetails(policyName, confPolicies[policyName], 'enabled', violationsCounter)
      })

      it(`Verify policy ${policyName} template details at the detailed page`, () => {
        cy.verifyPolicyInPolicyDetailsTemplates(policyName, confPolicies[policyName])
      })

      it(`Verify policy ${policyName} placement binding details at the detailed page`, () => {
        cy.verifyPlacementBindingInPolicyDetails(policyName, confPolicies[policyName])
      })

      it(`Verify policy ${policyName} placement rule at the detailed page`, () => {
        cy.waitForClusterPolicyStatus(clusterViolations)  // since it could happen that some clusters do not have the status yet
          .verifyPlacementRuleInPolicyDetails(policyName, confPolicies[policyName], clusterViolations)
      })

      it(`Verify policy ${policyName} violations at the Status - Clusters page`, () => {
        cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}/status`).waitForPageContentLoad()
        // verify all violations per cluster
        cy.waitForClusterTemplateStatus(clusterViolations)
          .verifyViolationsInPolicyStatusClusters(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
      })

      it(`Verify policy ${policyName} violations at the Status - Templates page`, () => {
        // open the Templates tab - we should have a command for this
        cy.get('#policy-status-templates').click()
        // verify violations per template
          .verifyViolationsInPolicyStatusTemplates(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
      })

      for (const clusterName of clusterList) {
        it(`Verify policy details & templates on cluster ${clusterName} detailed page`, () => {
          cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}`).waitForPageContentLoad()
          cy.goToPolicyClusterPage(policyName, confPolicies[policyName], clusterName)
            .verifyPolicyDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
            .verifyPolicyTemplatesInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations)
            .verifyPolicyViolationDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
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
          cy.visit(url).waitForPageContentLoad()
            .verifyPolicyViolationDetailsInHistory(templateName, violations, confViolationPatterns)
        })

      }
    }
  }

  // delete created policies at the end
  for (const policyName in confPolicies) {
    it(`Policy ${policyName} can be deleted in the policy listing`, () => {
      // we could use a different way how to return to this page
      cy.visit('/multicloud/policies/all').waitForPageContentLoad()
        .actionPolicyActionInListing(policyName, 'Remove')
    })

    it(`Deleted policy ${policyName} is not present in the policy listing`, () => {
      cy.verifyPolicyNotInListing(policyName)
    })
  }

}


export const test_applyPolicyYAML = (confFilePolicy, substitutionRules=null) => {

  if (substitutionRules === null) {
    substitutionRules = getDefaultSubstitutionRules()
  }
  const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', substitutionRules)
  const policyName = rawPolicyYAML.replace(/\r?\n|\r/g, ' ').replace(/^.*?name:\s*/m, '').replace(/\s.*/m,'')

  it('Create the clean up policy using the YAML', () => {
    cy.visit('/multicloud/policies/create')
    cy.log(rawPolicyYAML)
      .createPolicyFromYAML(rawPolicyYAML, true)
  })

  it(`Check that policy ${policyName} is present in the policy listing`, () => {
    cy.verifyPolicyInListing(policyName, {})
  })

  it(`Wait for ${policyName} status to become available`, () => {
    cy.waitForPolicyStatus(policyName, '0/')
  })

  it(`Delete policy ${policyName}`, () => {
    cy.actionPolicyActionInListing(policyName, 'Remove')
  })

  it(`Verify that policy ${policyName} is not present in the policy listing`, () => {
    cy.verifyPolicyNotInListing(policyName)
  })

}
