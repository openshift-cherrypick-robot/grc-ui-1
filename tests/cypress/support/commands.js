/* Copyright (c) 2020 Red Hat, Inc. */
import { getOpt } from '../scripts/utils'
import 'cypress-wait-until'
import { pageLoader, isPolicyStatusAvailable, isClusterPolicyStatusAvailable, doTableSearch, clearTableSearch } from '../common/views'

Cypress.Commands.add('login', (OPTIONS_HUB_USER, OPTIONS_HUB_PASSWORD, OC_IDP) => {
  var user = process.env.SELENIUM_USER || OPTIONS_HUB_USER || Cypress.env('OPTIONS_HUB_USER')
  var password = process.env.SELENIUM_PASSWORD || OPTIONS_HUB_PASSWORD || Cypress.env('OPTIONS_HUB_PASSWORD')
  var idp = OC_IDP || Cypress.env('OC_IDP')
  cy.visit('/multicloud/policies')
  cy.get('body').then(body => {
    // Check if logged in
    if (body.find('#header').length === 0) {

      // Check if identity providers are configured
      if (body.find('form').length === 0)
        cy.contains(idp).click()
      cy.get('#inputUsername').click().focused().type(user)
      cy.get('#inputPassword').click().focused().type(password)
      cy.get('button[type="submit"]').click()
      cy.get('#header').should('exist')
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
  cy.get('.header-user-info-dropdown_icon').then($btn => {
    //logout when test starts since we need to use the app idp user
    cy.log('Logging out existing user')
    cy.get($btn).click()
    cy.contains('Log out').click()
    // cy.clearCookies()
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
      cy.get('#edit-yaml').next('label').click()
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
  doTableSearch(name)
  cy.waitUntil(() => isPolicyStatusAvailable(name, violationsCounter), {'interval': 2000, 'timeout':120000})
    .then(() => clearTableSearch())
})

// needs to be run on /multicloud/policies/all/{namespace}/{policy} page
// see isClusterPolicyStatusAvailable()
Cypress.Commands.add('waitForClusterPolicyStatus', (clusterViolations, clusterList=null) => {
  cy.waitUntil(() => { return isClusterPolicyStatusAvailable(clusterViolations, clusterList) }, {'interval': 2000, 'timeout':60000})
})

Cypress.Commands.add('waitForPageContentLoad', () => {
  pageLoader.shouldNotExist()
})

Cypress.Commands.add('CheckGrcMainPage', () => {
  cy.location('pathname').should('eq', '/multicloud/policies/all')
  pageLoader.shouldNotExist()
  cy.get('.bx--detail-page-header-title').contains('Governance and risk')
})

Cypress.Commands.add('FromGRCToCreatePolicyPage', () => {
  cy.get('#create-policy').should('exist')
  cy.get('#create-policy').click()
  cy.location('pathname').should('eq', '/multicloud/policies/create')
  pageLoader.shouldNotExist()
  cy.get('.bx--detail-page-header-title').contains('Create policy')
})

Cypress.Commands.add('goToPolicyDetailsPage', (policyName, namespace='default', open=true) => {
  cy.get('.resource-table').within(()=>
  {
    cy.get('input[aria-label="Search input"]').clear().type(policyName) // This action remains on multicloud/policies/all
    if(open)
    {
      cy.get('a').contains(policyName).click()
      cy.location('pathname').should('eq', '/multicloud/policies/all/'+namespace+'/'+policyName)
      pageLoader.shouldNotExist()
      //cy.get('.bx--detail-page-header-title').contains(policyName)
    }
  })
})

// must be run on policy details page
Cypress.Commands.add('goToPolicyClusterPage', (policyName, policyConfig, clusterName) => {
  var namespace = policyConfig['namespace']
  cy.get('.one-cluster-status').children('a').contains(clusterName).click()
  pageLoader.shouldNotExist()
  cy.location('pathname').should('eq', '/multicloud/policies/policy/'+clusterName+'/'+namespace+'.'+policyName)
})
