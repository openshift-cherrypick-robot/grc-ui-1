/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { getDefaultSubstitutionRules, verifyPolicyInPolicyStatus, verifyPolicyByYAML } from '../common/views'
import { test_applyPolicyYAML } from  '../common/tests'
import { getUniqueResourceName } from '../scripts/utils'
import { getConfigObject } from '../config'

const confClusters = getConfigObject('clusters.yaml')
// we will work only with one cluster, we do not need more
const clusterList = Object.keys(confClusters).slice(0,1)
// if process.env.MANAGED_CLUSTER_NAME is defined, use it instead
if (Cypress.env('MANAGED_CLUSTER_NAME') !== undefined) {
  clusterList[0] = Cypress.env('MANAGED_CLUSTER_NAME')
}


describe('Setup - create a certificate expiring soon', () => {
  const substitutionRules = getDefaultSubstitutionRules({
    clusterselector:`- {key: name, operator: In, values: ["${clusterList[0]}"]}`,
    compliancetype: 'musthave'
  })

  it ('"Govern risk" page can be launched.', () => {
    cy.CheckGrcMainPage()
  })

  // create certificate issuer
  test_applyPolicyYAML('CertPolicyTest/test_issuer_raw.yaml', substitutionRules)

  // create an about-to-expire certificate
  test_applyPolicyYAML('CertPolicyTest/test_certificate_raw.yaml', substitutionRules)
})


describe('RHACM4K-2294 - GRC UI: [P1][Sev1][policy-grc] - CertificatePolicy governance', () => {
  const certificatePolicyName = 'policy-certificatepolicy'
  const uCertificatePolicyName = getUniqueResourceName(certificatePolicyName)
  const substitutionRules = getDefaultSubstitutionRules({policyname:uCertificatePolicyName, clusterselector:`- {key: name, operator: In, values: ["${clusterList[0]}"]}`})
  const certificatePolicyYAML = getConfigObject('CertPolicyTest/test_certpolicy_raw.yaml', 'raw', substitutionRules)
  const certificatePolicyConfig = getConfigObject('CertPolicyTest/test_certpolicy_config.yaml')

  it (`Create certificate policy ${uCertificatePolicyName}`, () => {
    cy.FromGRCToCreatePolicyPage()
      .createPolicyFromYAML(certificatePolicyYAML, true)
  })

  it(`Wait for certificate policy ${uCertificatePolicyName} status to become available`, () => {
    cy.CheckGrcMainPage()
    cy.waitForPolicyStatus(uCertificatePolicyName)
  })

  it (`Verify all information about the created certificate policy ${uCertificatePolicyName} on the "Govern and risk" page`, () => {
    cy.verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Validate violations/status of created policy ${uCertificatePolicyName} on the detailed policy page`, () => {
    // we need to find another way how to access this page
    cy.visit(`/multicloud/policies/all/default/${uCertificatePolicyName}`)
      .verifyPolicyInPolicyDetails(uCertificatePolicyName, certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Validate violations/status of created policy ${uCertificatePolicyName} on the policy status/history page`, () => {
    // we need to find another way how to access this page
    cy.visit(`/multicloud/policies/all/default/${uCertificatePolicyName}/status`)
      .then(() => {
      verifyPolicyInPolicyStatus(uCertificatePolicyName)
    })
  })

  it(`Validate yaml of created policy ${uCertificatePolicyName} from edit YAML action`, () => {
    // we could use a different way how to return to this page
    cy.visit('/multicloud/policies/all')
    verifyPolicyByYAML(uCertificatePolicyName, certificatePolicyYAML, true)
  })

  it(`Validate disable of the policy ${uCertificatePolicyName}`, () => {
    // we could use a different way how to return to this page
    cy.visit('/multicloud/policies/all')
      .actionPolicyActionInListing(uCertificatePolicyName, 'Disable')
  })

  it('Check disabled policy', () => {
    cy.CheckGrcMainPage()
      .verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'disabled')
  })

  it(`Validate enable of the policy ${uCertificatePolicyName}` , () => {
    cy.actionPolicyActionInListing(uCertificatePolicyName, 'Enable')
      .CheckGrcMainPage()
  })

  it(`Check enabled policy ${uCertificatePolicyName}`, () => {
    cy.waitForPolicyStatus(uCertificatePolicyName)
      .verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Edit policy ${uCertificatePolicyName} and change "remediateAction" to "enforce"`, () => {
    cy.actionPolicyActionInListing(uCertificatePolicyName, 'Enforce')
      .CheckGrcMainPage()
      .waitForPolicyStatus(uCertificatePolicyName)
  })

  it('Check violations stay reported but not remediated', () => {
    certificatePolicyConfig.enforce = true
    certificatePolicyConfig.inform = false
    cy.verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Remove created policy ${uCertificatePolicyName}`, () => {
    cy.actionPolicyActionInListing(uCertificatePolicyName, 'Remove')
      .CheckGrcMainPage()
  })

  it(`Check created policy ${uCertificatePolicyName} is not present`, () => {
    cy.verifyPolicyNotInListing(uCertificatePolicyName)
  })
})


describe('RHACM4K_1205 - GRC UI: [P1][Sev1][policy-grc] - CertificatePolicy governance', () => {
  const certificatePolicyName = 'policy-certificatepolicy-rhacm4k-1205'
  const uCertificatePolicyName = getUniqueResourceName(certificatePolicyName)
  const substitutionRules = getDefaultSubstitutionRules({policyname:uCertificatePolicyName, clusterselector:`- {key: name, operator: In, values: ["${clusterList[0]}"]}`})
  const certificatePolicyYAML = getConfigObject('CertPolicyTest/test_certpolicy_RHACM4K_1205_raw.yaml', 'raw', substitutionRules)
  const certificatePolicyConfig = getConfigObject('CertPolicyTest/test_certpolicy_config.yaml')

  it (`Create policy ${uCertificatePolicyName}`, () => {
    cy.FromGRCToCreatePolicyPage()
      .createPolicyFromYAML(certificatePolicyYAML, true)
  })

  it(`Certificate policy ${uCertificatePolicyName} status becomes available`, () => {
    cy.CheckGrcMainPage()
    cy.waitForPolicyStatus(uCertificatePolicyName)
  })

  it (`Verify all information about the created certificate policy ${uCertificatePolicyName} on the "Govern and risk" page`, () => {
    cy.verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Validate violations/status of created policy ${uCertificatePolicyName} on the detailed policy page`, () => {
    // we need to find another way how to access this page
    cy.visit(`/multicloud/policies/all/default/${uCertificatePolicyName}`)
      .verifyPolicyInPolicyDetails(uCertificatePolicyName, certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Validate violations/status of created policy ${uCertificatePolicyName} on the policy status/history page`, () => {
    // we need to find another way how to access this page
    cy.visit(`/multicloud/policies/all/default/${uCertificatePolicyName}/status`)
      .then(() => {
      verifyPolicyInPolicyStatus(uCertificatePolicyName)
    })
  })

  it(`Validate yaml of created policy ${uCertificatePolicyName} from edit YAML action`, () => {
    // we could use a different way how to return to this page
    cy.visit('/multicloud/policies/all')
    verifyPolicyByYAML(uCertificatePolicyName, certificatePolicyYAML, true)
  })

  it(`Validate disable of the policy ${uCertificatePolicyName}`, () => {
    // we could use a different way how to return to this page
    cy.visit('/multicloud/policies/all')
      .actionPolicyActionInListing(uCertificatePolicyName, 'Disable')
  })

  it('Check disabled policy', () => {
    cy.CheckGrcMainPage()
      .verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'disabled')
  })

  it(`Validate enable of the policy ${uCertificatePolicyName}` , () => {
    cy.actionPolicyActionInListing(uCertificatePolicyName, 'Enable')
      .CheckGrcMainPage()
  })

  it(`Check enabled policy ${uCertificatePolicyName}`, () => {
    cy.waitForPolicyStatus(uCertificatePolicyName)
      .verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Edit policy ${uCertificatePolicyName} and change "remediateAction" to "enforce"`, () => {
    cy.actionPolicyActionInListing(uCertificatePolicyName, 'Enforce')
      .CheckGrcMainPage()
      .waitForPolicyStatus(uCertificatePolicyName)
  })

  it('Check violations stay reported but not remediated', () => {
    certificatePolicyConfig.enforce = true
    certificatePolicyConfig.inform = false
    cy.verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Remove created policy ${uCertificatePolicyName}`, () => {
    cy.actionPolicyActionInListing(uCertificatePolicyName, 'Remove')
      .CheckGrcMainPage()
  })

  it(`Check created policy ${uCertificatePolicyName} is not present`, () => {
    cy.verifyPolicyNotInListing(uCertificatePolicyName)
  })
})


describe('Cleanup - delete a certificate and an issuer', () => {
  const substitutionRulesCleanup = getDefaultSubstitutionRules({
    clusterselector:`- {key: name, operator: In, values: ["${clusterList[0]}"]}`,
    compliancetype: 'mustnothave'
  })

  // Remove created certificate
  test_applyPolicyYAML('CertPolicyTest/test_certificate_raw.yaml', substitutionRulesCleanup)

  // Remove certificate issuer
  test_applyPolicyYAML('CertPolicyTest/test_issuer_raw.yaml', substitutionRulesCleanup)

})
