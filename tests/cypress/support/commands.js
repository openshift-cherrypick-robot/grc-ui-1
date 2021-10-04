/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import { getOpt } from '../scripts/utils'
import 'cypress-wait-until'
import { pageLoader, isPolicyStatusAvailable, isClusterTemplateStatusAvailable,
         action_doTableSearch, action_clearTableSearch, action_createPolicyFromSelection, action_verifyPolicyInListing,
         action_verifyPolicyNotInListing, action_actionPolicyActionInListing, action_editPolicyActionInListing, action_createPolicyFromYAML,
         action_verifyPolicyInPolicyDetails, action_verifyClusterListInPolicyDetails, action_verifyPolicyEditForm,
         action_verifyViolationsInPolicyStatusClusters, action_verifyViolationsInPolicyStatusTemplates,
         action_verifyPolicyDetailsInCluster, action_verifyPolicyTemplatesInCluster,
         action_verifyPolicyViolationDetailsInCluster, action_verifyPolicyViolationDetailsInHistory,
         action_verifyCreatePolicySelection, isClusterViolationsStatusAvailable, action_verifyClusterViolationsInListing,
         action_checkNotificationMessage, action_checkPolicyListingPageUserPermissions, action_verifyCredentialsInSidebar,
         action_verifyAnsibleInstallPrompt, action_scheduleAutomation, action_verifyHistoryPageWithMock
} from '../support/views'

Cypress.Commands.add('login', (OPTIONS_HUB_USER='', OPTIONS_HUB_PASSWORD='', OC_IDP='', OC_IDP_CONFIGURED=false, force=false) => {
  const user = OPTIONS_HUB_USER || Cypress.env('OPTIONS_HUB_USER')
  const password = OPTIONS_HUB_PASSWORD || Cypress.env('OPTIONS_HUB_PASSWORD')
  const idp_configured = OC_IDP_CONFIGURED || Cypress.env('OC_IDP_CONFIGURED')
  let idp = OC_IDP || Cypress.env('OC_IDP')
  if (user === 'kubeadmin') {
    idp = 'kube:admin'
  }
  const APIServer = Cypress.env('OPTIONS_HUB_CLUSTER_URL')
  cy.log(`Initiating login as ${user} idp ${idp}`)

  cy.clearCookies()  // clear cookies so we do login again
  // handle login by setting cookie explicitly when running against localhost
  .then(() => {
    if (Cypress.config().baseUrl.includes('localhost')) {
      let currentUser
      expect(APIServer).to.not.equal(undefined)
      // check who is the current user
      cy.exec('oc whoami', {failOnNonZeroExit: false}).then(res => {
        currentUser = res.stdout.replace('kube:admin', 'kubeadmin')
        cy.log(`Currently logged to 'oc' as ${currentUser}`)
      })
      .then(() => {
        if (currentUser != user || force) {  // do oc login as the required user
          cy.log(`Doing 'oc login' as ${user}`)
          cy.exec('oc login --server=${APIServer} -u ${TEST_USER} -p ${TEST_PASSWORD}', { 'log': false, 'env': { TEST_USER: user, TEST_PASSWORD: password } }).then(res => cy.log(res.stdout))
        }
      })
      .then(() => {
        cy.exec('oc whoami -t').then(res => {  // get token and set cookie and env var accordingly
          Cypress.env('token', res.stdout)
          cy.log('Setting acm-access-token-cookie')
          cy.setCookie('acm-access-token-cookie', Cypress.env('token'), { 'log': false })
        })
      })
    }
  })
  cy.visit('/multicloud/policies')
  cy.get('body').then(() => {
    // if not yet logged in, do the regular login through Web UI
    if (Cypress.$('body').find('.pf-c-page__header').length === 0) {
      cy.get('div.pf-c-login').should('be.visible').then(() => {
        // Check if identity providers are configured
        if (idp_configured) {
          cy.waitUntil(() =>cy.contains(idp).should('be.visible'))
          cy.contains(idp).should('be.visible').click()
        }
      })
      .then(() => {
        cy.waitUntil(() => cy.get('#inputUsername').should('be.visible'))
        cy.get('#inputUsername').should('be.visible').click().focused().type(user)
        cy.waitUntil(() => cy.get('#inputPassword').should('be.visible'))
        cy.get('#inputPassword').should('be.visible').click().focused().type(password, { 'log': false })
        cy.waitUntil(() => cy.get('button[type="submit"]').should('be.visible'))
        cy.get('button[type="submit"]').should('be.visible').click()
        cy.get('.pf-c-page__header').should('be.visible')
      })
    }
  })
  cy.CheckGrcMainPage()
})

Cypress.Commands.add('reloadUntil', (condition, options) => {
  if (!options) {
    options = {}
  }

  var startTime = getOpt(options, 'startTime', new Date())
  var timeout = getOpt(options, 'timeout', 300000)
  var interval = getOpt(options, 'interval', 0)
  var currentTime = new Date()
  if (currentTime - startTime < timeout) {
    condition().then(result => {
      if (result === false) {
        cy.reload()
        if (interval > 0) {
          cy.wait(interval)
        }

        options.startTime = startTime
        cy.reloadUntil(condition, options)
      }
    })
  }
})

Cypress.Commands.add('waitUntilContains', (selector, text, options) => {
  cy.waitUntil(() => cy.ifContains(selector, text), options)
})

Cypress.Commands.add('waitUntilNotContains', (selector, text, options) => {
  cy.waitUntil(() => cy.ifNotContains(selector, text), options)
})

Cypress.Commands.add('waitUntilAttrIs', (selector, attr, value, options) => {
  cy.waitUntil(() => cy.ifAttrIs(selector, attr, value), options)
})

Cypress.Commands.add('ifAttrIs', (selector, attr, value, action) => {
  return cy.checkCondition(selector, ($elem) => $elem && $elem.attr(attr) && $elem.attr(attr).includes(value), action)
})

Cypress.Commands.add('ifContains', (selector, text, action) => {
  return cy.checkCondition(selector, ($elem) => $elem && $elem.text().includes(text), action)
})

Cypress.Commands.add('ifNotContains', (selector, text, action) => {
  return cy.checkCondition(selector, ($elem) => !$elem || !$elem.text().includes(text), action)
})

Cypress.Commands.add('checkCondition', (selector, condition, action) => {
  return cy.get('body').then($body => {
    var $elem = $body.find(selector)
    var result = condition($elem)
    if (result === true && action) {
      return action($elem)
    }

    return cy.wrap(result)
  })
})

Cypress.Commands.add('forEach', (selector, action, options) => {
  var failIfNotFound = getOpt(options, 'failIfNotFound', false)
  if (failIfNotFound === true) {
    return cy.get(selector, options).each(($elem) => action($elem))
  }

  return cy.get('body').then(($body) => {
    var $elems = $body.find(selector)
    if ($elems.length > 0) {
      action($elems.get(0))
      cy.forEach(selector, action)
    }
  })
})

Cypress.Commands.add('logout', () => {
  cy.log('Attempt to logout existing user')
  cy.get('.pf-c-app-launcher.pf-m-align-right.co-app-launcher.co-user-menu').then($btn => {
    //logout when test starts since we need to use the app idp user
    cy.waitUntil(() => cy.log('Logging out existing user').get($btn).should('be.visible'))
    cy.log('Logging out existing user').get($btn).should('be.visible').click()
    if (Cypress.config().baseUrl.includes('localhost')) {
      cy.waitUntil(() => cy.contains('Logout').should('be.visible'))
      cy.contains('Logout').should('be.visible').click().clearCookies()
    } else {
      cy.waitUntil(() => cy.contains('Logout').should('be.visible'))
      cy.contains('Logout').should('be.visible').click()
      cy.location('pathname').should('match', new RegExp('/oauth/authorize(\\?.*)?$'))
    }
  })
})

Cypress.Commands.add('generateNamespace', () => {
  return `search-${Date.now()}`
})

Cypress.Commands.add('waitUsingSLA', () => {
  return cy.wait(parseInt(Cypress.env('SERVICE_SLA'), 10) || 5000)
})

// set the YAML editor visibility to a desired state
// requires an element with 'switch-label' class being available in the page
Cypress.Commands.add('toggleYAMLeditor', (state = undefined) => {
  const err = 'Invalid parameter: Parameter "state" can be either "On" or "Off" or undefined'
  if (state != undefined && state != 'On' && state != 'Off') { throw err }
  cy.get('.switch-label').spread( (e) => {
    if ((state === undefined) ||
        (e.textContent.includes('Off') && state === 'On') ||
        (e.textContent.includes('On') && state === 'Off'))
    {
      cy.waitUntil(() => cy.get('#edit-yaml').next('label').should('be.visible'))
      cy.get('#edit-yaml').next('label').should('be.visible').click()
    }
    return cy
  })
})

Cypress.Commands.add('YAMLeditor', (uri = undefined) => {
  cy.get('textarea.inputarea') // make sure the element is there first
    .then(() => {
      if (uri) {
        return cy.window().its('monaco').its('editor').invoke('getModel', uri).then((ed) => { cy.wrap(ed) })
      } else {
        return cy.window().its('monaco').its('editor').invoke('getModels').spread((ed) => { cy.wrap(ed) })
      }
  })
})

// needs to be run either at /multicloud/policies/all or /multicloud/policies/all/{namespace}/{policy} page
// see isPolicyStatusAvailable()
// optionally can wait for the specific violations counter to appear
Cypress.Commands.add('waitForPolicyStatus', (name, violationsCounter) => {
  cy.doTableSearch(name)
    .waitUntil(() => isPolicyStatusAvailable(name, violationsCounter), {'interval': 1000, 'timeout':120000})
    .clearTableSearch()
})

// needs to be run at /multicloud/policies/all at Cluster violations tab
// see isClusterViolationsStatusAvailable()
// optionally can wait for the specific violations counter to appear
Cypress.Commands.add('waitForClusterViolationsStatus', (name, violationsCounter) => {
  cy.doTableSearch(name)
    .waitUntil(() => isClusterViolationsStatusAvailable(name, violationsCounter), {'interval': 1000, 'timeout':120000})
    .clearTableSearch()
})

// needs to be run on /multicloud/policies/all/{namespace}/{policy}/clusters or /multicloud/policies/all/{namespace}/{policy}/templates page
// see isClusterTemplateStatusAvailable()
Cypress.Commands.add('waitForClusterTemplateStatus', (clusterViolations = {}) => {
  cy.waitUntil(() => { return isClusterTemplateStatusAvailable(clusterViolations) }, {'interval': 1000, 'timeout':60000})
})

// wait for any of the specified elements to appear on the page
Cypress.Commands.add('waitForAnyElement', (selectors, timeout=60000) => {
  const anyElemFound = (selectors) => {
    var value = false
    return cy.get('body').then($body => {
      for (const selector of selectors) {
        const elems = $body.find(selector)
        if (elems.length > 0) {
          value = true
        }
        if (value) { break }
      }
    })
    .then(() => value)
  }
  // wait until any of the required selectors succeed on the page
  cy.waitUntil(() => { return anyElemFound(selectors) != null }, {'interval': 1000, 'timeout':timeout})
})

Cypress.Commands.add('waitForPageContentLoad', () => {
  const selectors = ['div.page-content-container', '#page']
  cy.waitForAnyElement(selectors)
  .then(() => pageLoader.shouldNotExist())
})

Cypress.Commands.add('CheckGrcMainPage', () => {
  cy.location('pathname').should('eq', '/multicloud/policies/all')
  window.localStorage.setItem('acm-grc-refresh-interval', 5000)
  pageLoader.shouldNotExist()
  cy.get('.pf-c-page__main-section .pf-c-title').contains('Governance')
  cy.get('.page-content-container > div').should('be.visible')
})

Cypress.Commands.add('FromGRCToCreatePolicyPage', () => {
  cy.get('#create-policy').should('be.visible')
  cy.waitUntil(() => cy.get('#create-policy').should('have.attr', 'aria-disabled', 'false').and('be.visible'))
  cy.get('#create-policy').should('have.attr', 'aria-disabled', 'false').and('be.visible').click()
  cy.location('pathname').should('eq', '/multicloud/policies/create')
  pageLoader.shouldNotExist()
  cy.get('.pf-c-page__main-section .pf-c-title').contains('Create policy')
})

Cypress.Commands.add('goToPolicyDetailsPage', (policyName, namespace='default', open=true) => {
  cy.get('.resource-table').within(()=>
  {
    // This action remains on multicloud/policies/all
    cy.waitUntil(() => cy.get('input[aria-label="Search input"]').should('be.visible'))
      .clear().type(policyName)
    if(open)
    {
      cy.waitUntil(() => cy.get('a').contains(policyName).should('be.visible'))
      cy.get('a').contains(policyName).should('be.visible').click()
      cy.location('pathname').should('eq', '/multicloud/policies/all/'+namespace+'/'+policyName)
      pageLoader.shouldNotExist()
      cy.get('.pf-c-page__main-section .pf-c-title').contains(policyName)
    }
  })
})
// must be run on policy details page
// Cypress.Commands.add('goToPolicyClusterPage', (policyName, policyConfig, clusterName) => {
//   var namespace = policyConfig['namespace']
//   cy.get('.one-cluster-status').children('a').contains(clusterName)
//     .should('exist')
//     .click({force: true})
//   pageLoader.shouldNotExist()
//   cy.location('pathname').should('eq', '/multicloud/policies/policy/'+clusterName+'/'+namespace+'.'+policyName)
// })

Cypress.Commands.add('createPolicyFromSelection', (uPolicyName, create=true, policyConfig) => {
  cy.then(() => action_createPolicyFromSelection(uPolicyName, create, policyConfig))
})

Cypress.Commands.add('verifyPolicyInListing', (uPolicyName, policyConfig, enabled='enabled', violationsCounter='', targetStatus = null) => {
  cy.then(() => action_verifyPolicyInListing(uPolicyName, policyConfig, enabled, violationsCounter, targetStatus))
})

Cypress.Commands.add('verifyPolicyNotInListing', (uPolicyName) => {
  cy.then(() => action_verifyPolicyNotInListing(uPolicyName))
})

Cypress.Commands.add('actionPolicyActionInListing', (uName, action, cancel=false) => {
  cy.then(() => action_actionPolicyActionInListing(uName, action, cancel))
})

Cypress.Commands.add('editPolicyActionInListing', (uName) => {
  cy.then(() => action_editPolicyActionInListing(uName))
})

Cypress.Commands.add('verifyPolicyEditForm', (uName, policyConfig) => {
  cy.then(() => action_verifyPolicyEditForm(uName, policyConfig))
})

Cypress.Commands.add('createPolicyFromYAML', (policyYAML, create=true) => {
  cy.then(() => action_createPolicyFromYAML(policyYAML, create))
})

Cypress.Commands.add('verifyPolicyInPolicyDetails', (uName, policyConfig, enabled='enabled', violationsCounter='', targetStatus = null) => {
  cy.then(() => action_verifyPolicyInPolicyDetails(uName, policyConfig, enabled, violationsCounter, targetStatus))
})

Cypress.Commands.add('verifyClusterListInPolicyDetails', (uName, policyConfig) => {
  cy.then(() => action_verifyClusterListInPolicyDetails(uName, policyConfig))
})

Cypress.Commands.add('verifyViolationsInPolicyStatusClusters', (policyName, policyConfig, clusterViolations, violationPatterns, clusters = undefined) => {
  cy.then(() => action_verifyViolationsInPolicyStatusClusters(policyName, policyConfig, clusterViolations, violationPatterns, clusters))

})
Cypress.Commands.add('verifyViolationsInPolicyStatusTemplates', (policyName, policyConfig, clusterViolations, violationPatterns, clusters = undefined) => {
  cy.then(() => action_verifyViolationsInPolicyStatusTemplates,(policyName, policyConfig, clusterViolations, violationPatterns, clusters))
})

Cypress.Commands.add('verifyPolicyDetailsInCluster', (policyName, policyConfig, clusterName, clusterViolations, violationPatterns) => {
  cy.then(() => action_verifyPolicyDetailsInCluster(policyName, policyConfig, clusterName, clusterViolations, violationPatterns))
})

Cypress.Commands.add('verifyPolicyTemplatesInCluster', (policyName, policyConfig, clusterName, clusterViolations) => {
  cy.then(() => action_verifyPolicyTemplatesInCluster(policyName, policyConfig, clusterName, clusterViolations))
})

Cypress.Commands.add('verifyPolicyViolationDetailsInCluster', (policyName, policyConfig, clusterName, clusterViolations, violationPatterns) => {
  cy.then(() => action_verifyPolicyViolationDetailsInCluster(policyName, policyConfig, clusterName, clusterViolations, violationPatterns))
})

Cypress.Commands.add('verifyPolicyViolationDetailsInHistory', (templateName, violations, violationPatterns) => {
  cy.then(() => action_verifyPolicyViolationDetailsInHistory(templateName, violations, violationPatterns))
})

Cypress.Commands.add('verifyClusterViolationsInListing', (clusterName, violationsCounter, violatedPolicies) => {
  cy.then(() => action_verifyClusterViolationsInListing(clusterName, violationsCounter, violatedPolicies))
})

// must be run on /multicloud/policies/all
Cypress.Commands.add('verifyCardsOnPolicyListingPage', (cardName, cardValuesDict, skipNumCardsCheck=false) => {
  const numCards = Object.keys(cardValuesDict).length
  cy.url().should('match', /\/multicloud\/policies\/all[?]?/)
  // switch to the required card
  cy.waitUntil(() => cy.get('#grc-cards-toggle').should('be.visible'))
  cy.get('#grc-cards-toggle').should('be.visible').click()
  cy.get('div.module-grc-cards').within(() => {
    cy.waitUntil(() => cy.get('li').contains(cardName).should('be.visible'))
    cy.get('li').contains(cardName).should('be.visible').click()
  })
  // check the summary header and counter
  cy.get('#summary-toggle').within(() => {
    cy.get('.header-title').contains('Summary')
    if (skipNumCardsCheck) {  // loosened check for unknown card number
      cy.get('.grc-cards-count').contains(/^[0-9]+$/)
    } else {
      cy.get('.grc-cards-count').contains(new RegExp('^'+numCards+'$'))
    }
  })
  // check number of cards displayed
  if (!skipNumCardsCheck) {
    cy.get('dd.grc-cards-container').within(() => {
      cy.get('.card-container').should('have.length', numCards)
    })
  }
  // verify all cards
  for (const [name, violations] of Object.entries(cardValuesDict)) {
    // find card by name
    cy.get('.card-name').contains(name).parents('.card-content').within(() => {
      // verify cluster violations
      cy.get('div').contains('Cluster violations').prev('div.card-count').contains(violations[0])
      // verify policy violations
      cy.get('div').contains('Policy violations').prev('div.card-count').contains(violations[1])
    })
  }
})

// click on the button to set content visibility on or off
Cypress.Commands.add('toggleVisibilityButton', (buttonSelector, contentSelector, state='') => {
  cy.get(contentSelector).then($content => {
    if ((state == '') ||  // either we want to do the switch
        (state == 'off' && $content.is(':visible')) ||  // or it is visible and we want to hide it
        (state == 'on' && !$content.is(':visible'))) {  // or it is hidden and we want to show it
      cy.waitUntil(() => cy.get(buttonSelector).should('be.visible'))
      cy.get(buttonSelector).should('be.visible').click()
    }
  })
})

Cypress.Commands.add('verifyCreatePolicySelection', (policyName, policyConf) => {
  cy.then(() => action_verifyCreatePolicySelection(policyName, policyConf))
})

Cypress.Commands.add('simpleYAMLupdate', (regExp='', text='', lineNumber) => {
  cy.YAMLeditor()
    .then($ed => {
      const line = $ed.getLineContent(lineNumber)
      const newLine = line.replace(regExp, text)
      if (line != newLine) {
        $ed.pushEditOperations([],
          [{
            range: {
              startColumn: 1,
              endColumn: line.length + 1,
              startLineNumber: lineNumber,
              endLineNumber: lineNumber
            },
            text: newLine
          }])
      }
    })
})

// wait for document.lastModified timestamp to change, but at most $timeout miliseconds, just in case
// we have already missed the update
// command can be used instead of cy.wait()
Cypress.Commands.add('waitForDocumentUpdate', (timeout=5000) => {
  cy.document().then($doc => {
    const lastUpdate = $doc.lastModified  // save current timestamp
    cy.waitUntil(() => { return cy.document().its('lastModified').then($newUpdate => $newUpdate != lastUpdate) }, {'interval': 1000, 'timeout':timeout})
  })
})

Cypress.Commands.add('verifyClusterViolationsInListing', (clusterName, violationsCounter, violatedPolicies) => {
  cy.then(() => action_verifyClusterViolationsInListing(clusterName, violationsCounter, violatedPolicies))
})

// To check the no resoures icon and message
Cypress.Commands.add('checkPolicyNoResourcesIconMessage', (present=true, message='Resource not found') => {
  if(present)
  {
    cy.get('.no-resource-title').should('not.exist')
    cy.get('img[alt="No resource"]').should('not.exist')
  }
  else
  {
    cy.get('.no-resource-title').should('contain', message)
    cy.get('img[alt="No resource"]').should('be.visible')
  }
})

Cypress.Commands.add('checkNotificationMessage', (kind, title, notification) => {
  cy.then(() => action_checkNotificationMessage(kind, title, notification))
})

Cypress.Commands.add('doTableSearch', (text, inputSelector = null, parentSelector = null) => {
  cy.then(() => action_doTableSearch(text, inputSelector, parentSelector))
})

Cypress.Commands.add('clearTableSearch', (inputSelector = null, parentSelector = null) => {
  cy.then(() => action_clearTableSearch(inputSelector, parentSelector))
})

// the command does check the content of the /multicloud/policies/all page with respect to the user permissions
// arguments:
//   policyNames = array of policy names that are expected to be found
//   confPolicies = dictionary storing policy configurations where policyName is a key
//   permissions = user permissions
//   searchFilter = filter to be used in the Search field to limit the scope of a test
Cypress.Commands.add('checkPolicyListingPageUserPermissions', (policyNames = [], confPolicies = {}, permissions = {}, elevated = false, searchFilter='') => {
  action_checkPolicyListingPageUserPermissions(policyNames, confPolicies, permissions, elevated, searchFilter)
})

// visit the policy details page, either through a link from a policy table or directly through URL
// does not clearTableSearch so you need to do it later eventually
Cypress.Commands.add('fromGRCToPolicyDetailsPage', (policyName) => {
  cy.doTableSearch(policyName)
    .get('.grc-view-by-policies-table').within(() => {
      cy.waitUntil(() => cy.get('a').contains(new RegExp(`^${policyName}$`)).should('be.visible'))
      cy.get('a').contains(new RegExp(`^${policyName}$`)).should('be.visible').click()
    })
})

// the command does check the content of the /multicloud/policies/all/${namespace}/${policyName} page with respect to the user permissions
// checks that Edit button is enabled/disabled
Cypress.Commands.add('checkDetailedPolicyPageUserPermissions', (policyName, permissions) => {
  const btnState = permissions.patch ? 'false' : 'true'
  cy.get('#edit-policy').should('have.attr', 'aria-disabled', btnState)
})

// the command does check controls availability at the Status tab of /multicloud/policies/all/${namespace}/${policyName}
// page with respect to the user permissions
// works both for Clusters and Templates tabs, you just need to set messageColumnIndex accordingly (4 for Clusters, 3 for templates)
Cypress.Commands.add('checkPolicyStatusPageUserPermissions', (policyName, permissions, namespaced, messageColumnIndex=4) => {
  if (namespaced) {  // not permitted to see the content
    cy.checkPolicyNoResourcesIconMessage(false, 'No policy status found')
  } else {
    // checks that Edit button is enabled/disabled
    const btnState = permissions.patch ? 'false' : 'true'
    cy.get('#edit-policy').should('have.attr', 'aria-disabled', btnState)
    // The "View details" link should be disabled with a tooltip since it requires
    // permissions to create a managedClusterView
    cy.get('table[aria-label="Simple Table"]').each(($table) => {  // for each table, on templates tab there could be more
      cy.wrap($table).within(() => {
        cy.get('tbody').find('tr').each(($row) => {  // for each table row
          cy.wrap($row).find('td').then(columns => {  // get all columns
            if (permissions.create) {
              cy.wrap(columns[messageColumnIndex-1]).contains('View details').should('have.attr', 'href')
            } else {
              cy.wrap(columns[messageColumnIndex-1]).contains('View details').should('have.class', 'link-disabled')
            }
          })
        })
      })
    })
  }
})

// does check controls availability at the YAML Editor tab of /multicloud/policies/all/${namespace}/${policyName} page
// with respect to the user permissions
Cypress.Commands.add('checkPolicyYAMLPageUserPermissions', (permissions) => {
  const btnState = permissions.patch ? 'false' : 'true'
  cy.get('#edit-button').should('have.attr', 'aria-disabled', btnState)
  cy.get('#submit-button').should('have.attr', 'aria-disabled', btnState)
})

Cypress.Commands.add('verifyCredentialsInSidebar', (uPolicyName, credentialName) => {
  cy.then(() => action_verifyCredentialsInSidebar(uPolicyName, credentialName))
})

Cypress.Commands.add('verifyAnsibleInstallPrompt', (uPolicyName, opInstalled) => {
  cy.then(() => action_verifyAnsibleInstallPrompt(uPolicyName, opInstalled))
})

Cypress.Commands.add('scheduleAutomation', (uName, credentialName, mode) => {
  cy.then(() => action_scheduleAutomation(uName, credentialName, mode))
})

Cypress.Commands.add('verifyHistoryPageWithMock', (uName) => {
  cy.then(() => action_verifyHistoryPageWithMock(uName))
})
