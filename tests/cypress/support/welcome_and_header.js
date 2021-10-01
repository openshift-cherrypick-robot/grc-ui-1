/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

/// <reference types="cypress" />

var apiUrl =
    Cypress.config().baseUrl.replace('multicloud-console.apps', 'api') + ':6443'

const acmVersion = (token) => {
    return cy.request({
        url: Cypress.config().baseUrl + '/multicloud/common/version',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }).then(resp => {
        return resp.body['version']
    })
}

export const oauthIssuer = (token) => {
    return cy.request({
        url: apiUrl + '/.well-known/oauth-authorization-server',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }).then(resp => {
        return resp.body['issuer']
    })
}

export const welcomePage = {
    whenGoToWelcomePage:() => cy.visit('/multicloud/welcome'),
    shouldExist: () => {
        cy.get('.welcome--introduction').should('contain', 'Welcome! Let’s get started.')
        cy.get('.welcome--svcs').should('contain', 'Go to Overview').and('contain', 'Go to Clusters').and('contain', 'Go to Applications').and('contain', 'Go to Governance')
    },
    validateSvcs: () => {
        cy.contains('Go to Overview').should('have.prop', 'href', Cypress.config().baseUrl + '/overview')
        cy.contains('Go to Clusters').should('have.prop', 'href', Cypress.config().baseUrl + '/multicloud/clusters')
        cy.contains('Go to Applications').should('have.prop', 'href', Cypress.config().baseUrl + '/multicloud/applications')
        cy.contains('Go to Governance').should('have.prop', 'href', Cypress.config().baseUrl + '/multicloud/policies')
    },
    validateConnect: () => {
        cy.get('[target="dev-community"]').should('have.prop', 'href', 'https://www.redhat.com/en/blog/products')
        cy.get('[target="support"]').should('have.prop', 'href', 'https://access.redhat.com/support')
    }
}

export const leftNav = {
    validateMenu: () => {
        cy.get('#page-sidebar li.pf-c-nav__item').should('be.visible').and('have.length', 11)
        cy.get('#nav-toggle').click()
        cy.get('#page-sidebar').should('not.be.visible')
        cy.get('#nav-toggle').click()
    },
    validatePerspective: () => {
        cy.get('#toggle-perspective').should('be.visible')
    },
    validateNoPerspective: () => {
        cy.get('#toggle-perspective').should('not.be.visible')
    },
    goToHome: () => {
        cy.get('#page-sidebar').contains('Home').click()
        cy.get('#page-sidebar').contains('Welcome').should('not.be.visible')
        cy.get('#page-sidebar').contains('Home').click()
        cy.get('#page-sidebar').contains('Welcome').should('be.visible')
        cy.get('#page-sidebar').contains('Welcome').click()
        welcomePage.shouldExist()
    },
    goToOverview: () => {
        cy.get('#page-sidebar').contains('Home').click()
        cy.get('#page-sidebar').contains('Overview').should('not.be.visible')
        cy.get('#page-sidebar').contains('Home').click()
        cy.get('#page-sidebar').contains('Overview').should('be.visible')
        cy.get('#page-sidebar').contains('Overview').should('have.prop', 'href', Cypress.config().baseUrl + '/overview')
    },
    goToClusters: () => {
        cy.get('#page-sidebar').contains('Clusters').should('have.prop', 'href', Cypress.config().baseUrl + '/multicloud/clusters')
    },
    goToApplications: () => {
        cy.get('#page-sidebar').contains('Applications').should('have.prop', 'href', Cypress.config().baseUrl + '/multicloud/applications')
    },
    goToGRC: () => {
        cy.get('#page-sidebar').contains('Governance').should('have.prop', 'href', Cypress.config().baseUrl + '/multicloud/policies')
    },
    goToCredentials: () => {
        cy.get('#page-sidebar').contains('Credentials').should('have.prop', 'href', Cypress.config().baseUrl + '/multicloud/credentials')
    },
    goToKUI: () => {
        cy.get('#page-sidebar').contains('Visual Web Terminal').should('have.prop', 'href', Cypress.config().baseUrl + '/kui')
    }
}

export const userMenu = {
    openSearch: () => {
        cy.get('[aria-label="search-button"]').click()
        cy.url().should('equal', Cypress.config().baseUrl + '/search')
        cy.visit('/multicloud/welcome')
    },
    openCreate: () => {
        // This is an Openshift console link, so it would be in a new window
        cy.window().then((window) => {
            cy.stub(window, 'open').as('windowOpen')
        })
        cy.get('[aria-label="create-button"]').click()
        cy.get('@windowOpen').should('be.calledWith', Cypress.config().baseUrl + '/k8s/all-namespaces/import')
        cy.visit('/multicloud/welcome')
    },
    openInfo: () => {
        cy.get('[data-test="about-dropdown"]').click()
        cy.get('[data-test="about-dropdown"] li').should('be.visible').and('have.length', 2)
        // Since cypress doesn't support multitab testing, we can check to see if the link includes the documentation link.
        // For now we can exclude the doc version, since the docs might not be available for a certain release.
        cy.get('[data-test="about-dropdown"]').contains('Documentation').should('have.attr', 'href').and('contain', 'https://access.redhat.com/documentation/en-us/red_hat_advanced_cluster_management_for_kubernetes/')
        cy.getCookie('acm-access-token-cookie').should('exist').then((token) => {
            acmVersion(token.value).then((version) => {
                cy.get('[data-test="about-dropdown"]').contains('About').click().get('.pf-c-spinner', {timeout: 20000}).should('not.exist')
                cy.get('.version-details__no').should('contain', version)
                cy.get('[aria-label="Close Dialog"]').click()
            })
        })
    },
    openUser: () => {
        cy.get('[data-test="user-dropdown"]').click()
        cy.get('[data-test="user-dropdown"] li').should('be.visible').and('have.length', 2)
        cy.get('[data-test="user-dropdown"]').click()
        cy.get('#configure').should('not.exist')
        cy.get('#logout').should('not.exist')
        cy.request(Cypress.config().baseUrl + '/multicloud/common/configure').as('configureReq')
        cy.get('@configureReq').should((response) => {
            expect(response.body).to.have.property('token_endpoint')
            expect(response.body['token_endpoint']).to.include('oauth/token')
        })
    },
    openApps: () => {
        cy.request(Cypress.config().baseUrl + '/multicloud/common/applinks').as('appLinkReq')
        cy.get('@appLinkReq').should((response) => {
            expect(response.body).to.have.property('data')
        })
        cy.waitUntil(() => {
            return cy.get('[data-test="app-dropdown"]')
                .should('be.visible')
        }, {'interval': 1000, 'timeout':120000})
        cy.get('[data-test="app-dropdown"]').click()
        // seems the split line is also li
        cy.get('[data-test="app-dropdown"] li').should('be.visible').and('have.length', 5)
        cy.contains('Red Hat applications').should('exist')
        cy.contains('Red Hat Openshift Container Platform').should('exist')
        cy.contains('OpenShift GitOps').should('exist')
        cy.contains('ArgoCD').should('exist')
        cy.get('[data-test="app-dropdown"]').click()
        cy.contains('ArgoCD').should('not.exist')
    },
    openAppsNoArgo: () => {
        cy.request(Cypress.config().baseUrl + '/multicloud/common/applinks').as('appLinkReq')
        cy.get('@appLinkReq').should((response) => {
            expect(response.body).to.have.property('data')
        })
        cy.waitUntil(() => {
            return cy.get('[data-test="app-dropdown"]')
                .should('be.visible')
        }, {'interval': 1000, 'timeout':120000})
        cy.get('[data-test="app-dropdown"]').click()
        cy.contains('Red Hat applications').should('exist')
        cy.contains('Red Hat Openshift Container Platform').should('exist')
    }
}
