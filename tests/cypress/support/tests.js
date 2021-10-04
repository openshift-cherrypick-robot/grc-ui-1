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
      cy.waitUntil(() => cy.get('#grc-cluster-view').should('be.visible'))
      cy.get('#grc-cluster-view').should('be.visible').click().then(() => {
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
        .verifyClusterListInPolicyDetails(confPolicies[policyName], clusterViolations, violationsCounter)
    })

    it(`Verify policy ${policyName} violations at the Status - Clusters page`, () => {
      cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}/clusters`).waitForPageContentLoad()
      // verify all violations per cluster
      cy.waitForClusterTemplateStatus(clusterViolations)
        .verifyViolationsInPolicyStatusClusters(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
    })

    it(`Verify policy ${policyName} violations at the Status - Templates page`, () => {
      // open the Templates tab - we should have a command for this
      cy.waitUntil(() => cy.get('.pf-c-page__main-nav .pf-c-nav__link').contains('Templates').should('be.visible'))

      cy.get('.pf-c-page__main-nav .pf-c-nav__link').contains('Templates').should('be.visible').click()
        .waitForPageContentLoad()
      // verify violations per template
        .verifyViolationsInPolicyStatusTemplates(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
    })

    // for (const clusterName of clusterList) {
    //   it(`Verify policy details & templates on cluster ${clusterName} detailed page`, () => {
    //     cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}`).waitForPageContentLoad()
    //     cy.goToPolicyClusterPage(policyName, confPolicies[policyName], clusterName)
    //       .verifyPolicyDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
    //       .verifyPolicyTemplatesInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations)
    //       .verifyPolicyViolationDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
    //   })
    // }

  }

  // run the test for enforced policy only if the config file was given
  if (confFileViolationsEnforce) {

    for (const policyName in confPolicies) {

      it(`Enforce policy ${policyName}`, () => {
        cy.visit('/multicloud/policies/all').waitForPageContentLoad()
          .actionPolicyActionInListing(policyName, 'Enforce')
      })

      it(`Check that enforced policy ${policyName} is present in the policy listing`, () => {
        confPolicies[policyName]['remediation'] = true
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
          cy.waitUntil(() => cy.get('#grc-cluster-view').should('be.visible'))
          cy.get('#grc-cluster-view').should('be.visible').click()
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
          .verifyClusterListInPolicyDetails(confPolicies[policyName], clusterViolations, violationsCounter)
      })

      it(`Verify policy ${policyName} violations at the Status - Clusters page`, () => {
        cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}/clusters`).waitForPageContentLoad()
        // verify all violations per cluster
        cy.waitForClusterTemplateStatus(clusterViolations)
          .verifyViolationsInPolicyStatusClusters(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
      })

      it(`Verify policy ${policyName} violations at the Status - Templates page`, () => {
        // open the Templates tab - we should have a command for this
        cy.waitUntil(() => cy.get('.pf-c-page__main-nav .pf-c-nav__link').contains('Templates').should('be.visible'))

        cy.get('.pf-c-page__main-nav .pf-c-nav__link').contains('Templates').should('be.visible').click()
          .waitForPageContentLoad()
        // verify violations per template
          .verifyViolationsInPolicyStatusTemplates(policyName, confPolicies[policyName], clusterViolations, confViolationPatterns)
      })

      // for (const clusterName of clusterList) {
      //   it(`Verify policy details & templates on cluster ${clusterName} detailed page`, () => {
      //     cy.visit(`/multicloud/policies/all/${confPolicies[policyName]['namespace']}/${policyName}`).waitForPageContentLoad()
      //     cy.goToPolicyClusterPage(policyName, confPolicies[policyName], clusterName)
      //       .verifyPolicyDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
      //       .verifyPolicyTemplatesInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations)
      //       .verifyPolicyViolationDetailsInCluster(policyName, confPolicies[policyName], clusterName, clusterViolations, confViolationPatterns)
      //   })
      // }

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

  // edit policy
  for (const policyName in confPolicies) {
    it(`Edit policy ${policyName}`, () => {
      cy.visit('/multicloud/policies/all').waitForPageContentLoad()
        .editPolicyActionInListing(policyName)
      cy.verifyPolicyEditForm(policyName, confPolicies[policyName])
    })
  }

  // delete created policies at the end
  for (const policyName in confPolicies) {
    it(`Policy ${policyName} can be deleted in the policy listing`, () => {
      // we could use a different way how to return to this page
      cy.visit('/multicloud/policies/all').waitForPageContentLoad()
        .actionPolicyActionInListing(policyName, 'Delete')
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
    cy.actionPolicyActionInListing(policyName, 'Delete')
  })

  it(`Verify that policy ${policyName} is not present in the policy listing`, () => {
    cy.verifyPolicyNotInListing(policyName)
  })

}

//   userName - user to use when logging
//   userPassword - password to use when logging
//   IDP - IDP to use when logging
//   policyNames = array of policy names that are expected to be found
//   confPolicies = dictionary storing policy configurations where policyName is a key
//   namespaces = namespaces that should be visible to the user
//   permissions = user permissions
//   namespaced = true if the user namespaced
//   elevated = true if a user has multiple permissions for different namespaces and Create policy button should be enabled
//   searchFilter = filter to be used in the Search field to limit the scope of a test
export const test_userPermissionsPageContentCheck = (userName, userPassword, IDP, policyNames, confPolicies, namespaces, permissions, namespaced, elevated, searchFilter) => {

  const id = Cypress.env('RESOURCE_ID')
  const newPolicyName = `rbac-new-${userName}-${id}`  // make policy name unique due to bug 1943662#c1
  const newPolicyConf = confPolicies['disabled-policy']  // use disabled-policy from conf file

  it(`Login ${userName} user`, () => {
    cy.login(userName, userPassword, IDP, true)
  })

  it(`Check All policies listing page content as ${userName}`, () => {
    cy.checkPolicyListingPageUserPermissions(policyNames, confPolicies, permissions, elevated, searchFilter)
  })

  // check policy details only if there are policies available
  // TODO: maybe we should also check that we are not able to access details through URL for policy we are not allowed
  if (policyNames.length > 0) {
    const firstPolicyName = policyNames[0]

    it(`Check detailed ${firstPolicyName} policy page as ${userName}`, () => {
      // search for policy in the Listing
      cy.fromGRCToPolicyDetailsPage(firstPolicyName).waitForPageContentLoad()
        .verifyPolicyInPolicyDetails(firstPolicyName, confPolicies[firstPolicyName])  // do a basic content check
        .checkDetailedPolicyPageUserPermissions(firstPolicyName, permissions)
    })

    it(`Check ${firstPolicyName} policy Clusters page as ${userName}`, () => {
      // click on Clusters tab
      cy.waitUntil(() => cy.get('.pf-c-page__main-nav .pf-c-nav__link').contains('Clusters').should('be.visible'))
      cy.get('.pf-c-page__main-nav .pf-c-nav__link').contains('Clusters').should('be.visible').click()
        .waitForPageContentLoad()
        // check permissions
        .checkPolicyStatusPageUserPermissions(firstPolicyName, permissions, namespaced)
        // check Templates tab only for a non-namespaced user
        .then(() => {
          if (!namespaced) {
            // click on Templates tab
            cy.waitUntil(() => cy.get('.pf-c-page__main-nav .pf-c-nav__link').contains('Templates').should('be.visible'))
            cy.get('.pf-c-page__main-nav .pf-c-nav__link').contains('Templates').should('be.visible').click()
              .waitForPageContentLoad()
              .checkPolicyStatusPageUserPermissions(firstPolicyName, permissions, namespaced, 3)
          }
        })
    })

    it(`Check ${firstPolicyName} policy edit page as ${userName}`, () => {
      return cy.url().then((pageURL) => {
        const editPageURL = pageURL.replace(/\/clusters|\/templates/, '/edit')
        cy.visit(editPageURL).waitForPageContentLoad()
        if (permissions.patch) {
          cy.url().should('eq', editPageURL)
        } else {
          cy.url().should('match', /\/multicloud\/policies\/all[?]?/)
        }
      })
    })
  }

  // If a user has multiple permissions for different namespaces, the create
  // button may be enabled, which is the purpose of setting `elevated`
  it(`Check policy creation as ${userName}`, () => {

    cy.visit('/multicloud/policies/create').waitForPageContentLoad()
    if (permissions.create || elevated) {
      // Check that specified namespaces are visible
      cy.get('button[aria-label="namespace"]').as('dropdown')
      cy.waitUntil(() => cy.get('@dropdown').should('be.visible'))
      cy.get('@dropdown').should('be.visible').click()
        .parent().next().within(() => {
        for (const namespace of namespaces) {
          cy.get('li.pf-c-select__menu-wrapper').contains(new RegExp(`^${namespace}$`))
        }
        // If user has clusterwide permissions, they should see more namespaces
        // Otherwise, they should only see the namespaces specified
        cy.get('li.pf-c-select__menu-wrapper').then(items => {
          const count = items.length
          if (!namespaced) {
            assert.isAbove(count, namespaces.length, 'There should be additional namespaces available')
          } else {
            assert.equal(count, namespaces.length, 'There should be no additional namespaces')
          }
        })
      })
      // collapse the drop down again
      cy.waitUntil(() => cy.get('@dropdown').should('be.visible'))
      cy.get('@dropdown').should('be.visible').click()
      // now create a test policy
      cy.createPolicyFromSelection(newPolicyName, true, newPolicyConf)
      .verifyPolicyInListing(newPolicyName, newPolicyConf, 'disabled')

    } else {
      // Make sure users can't navigate to the Create page directly
      // and are redirected to /policies/all page
      cy.url().should('match', /\/multicloud\/policies\/all[?]?/)
    }

  })

  if (permissions.delete) {  // Should this be (permissions.delete || elevated) ???

    it(`Check policy removal as ${userName}`, () => {
      cy.actionPolicyActionInListing(newPolicyName, 'Delete')
      .verifyPolicyNotInListing(newPolicyName)
    })

  }

  it(`Logout ${userName} user`, () => {
    // go back to policy listing and clear table search
    //cy.visit('/multicloud/policies/all').waitForPageContentLoad()
    //  .clearTableSearch()
    cy.logout()
  })

}
