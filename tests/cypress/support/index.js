/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import './commands'
require('cypress-terminal-report/src/installLogsCollector')()

import '@cypress/code-coverage/support'
import 'cypress-fail-fast'

Cypress.Cookies.defaults({
  preserve: ['acm-access-token-cookie', '_oauth_proxy', 'XSRF-TOKEN', '_csrf']
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

before(() => {
  if (Cypress.config().baseUrl.includes('localhost')) {
    cy.exec('oc whoami -t').then(res => {
      cy.setCookie('acm-access-token-cookie', res.stdout)
      Cypress.env('token', res.stdout)
    })
  }
  cy.login()
})

// beforeEach(() => {
//   if (Cypress.config().baseUrl.includes('localhost')) {
//     cy.exec('oc whoami -t').then(res => {
//       cy.setCookie('acm-access-token-cookie', res.stdout)
//       Cypress.env('token', res.stdout)
//     })
//   }
// })

after(()=> {
  // cy.logout()
  // cy.clearCookies()
})
