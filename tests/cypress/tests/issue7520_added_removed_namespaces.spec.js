/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { getDefaultSubstitutionRules,
         verifyPolicyTemplateViolationDetailsForCluster
       } from '../common/views'
import { test_applyPolicyYAML } from '../common/tests'
import { getConfigObject } from '../config'

// simple function that would help us to generate unique resource names
function uName(suffix) {
  const id = (Cypress.env('RESOURCE_ID') === '') ? '-' : '-'+Cypress.env('RESOURCE_ID')+'-'
  return 'issue3677'+id+suffix
}

const confClusters = getConfigObject('clusters.yaml')
// we will work only with one cluster, we do not need more
const clusterList = Object.keys(confClusters).slice(0,1)
// if process.env.MANAGED_CLUSTER_NAME is defined, use it instead
if (Cypress.env('MANAGED_CLUSTER_NAME') !== undefined) {
  clusterList[0] = Cypress.env('MANAGED_CLUSTER_NAME')
}
const certPolicyName = uName('cert-policy')
let substitutionRules


describe('RHACM4K-1691 - GRC UI: [P2][Sev2][policy-grc] Certificate policy controller: with wildcard, added or removed namespaces are not detected', () => {

  // create namespace ns1
  substitutionRules = [
    [/\[POLICYNAME\]/g, uName('create-ns1')],
    [/\[NAMESPACENAME\]/g, uName('ns1')],
    [/\[CLUSTERSELECTOR\]/g, `- {key: name, operator: In, values: ["${clusterList[0]}"]}`],
  ]
  test_applyPolicyYAML('issue7520/create_namespace_raw.yaml', substitutionRules)

  // create certificate issuer in ns1
  substitutionRules = [
    [/\[POLICYNAME\]/g, uName('create-issuer-ns1')],
    [/\[ISSUERNAME\]/g, uName('cert-issuer-ns1')],
    [/\[ISSUERNAMESPACE\]/g, uName('ns1')],
    [/\[CLUSTERSELECTOR\]/g, `- {key: name, operator: In, values: ["${clusterList[0]}"]}`],
  ]
  test_applyPolicyYAML('issue7520/create_test_issuer.yaml', substitutionRules)

  // create certificate in ns1
  substitutionRules = [
    [/\[POLICYNAME\]/g, uName('create-cert-ns1')],
    [/\[CERTNAME\]/g, uName('test-cert-ns1')],
    [/\[CERTNAMESPACE\]/g, uName('ns1')],
    [/\[CN\]/g, uName('ns1.foo.bar.org')],
    [/\[DNSNAMES\]/g, uName('ns1.foo.bar.org')],
    [/\[SECRETNAME\]/g, uName('ns1-cert-secret')],
    [/\[DURATION\]/g, '500h'],
    [/\[RENEWBEFORE\]/g, '450h'],
    [/\[ISSUER\]/g, uName('cert-issuer-ns1')],
    [/\[CLUSTERSELECTOR\]/g, `- {key: name, operator: In, values: ["${clusterList[0]}"]}`],
  ]
  test_applyPolicyYAML('issue7520/create_certificate_raw.yaml', substitutionRules)

  // create cert policy
  it(`create certPolicy ${certPolicyName}, expecting a compliance`, () => {
    substitutionRules = [
      [/\[POLICYNAME\]/g, certPolicyName],
      [/\[INCLUDENAMESPACE\]/g, uName('ns*')],
      [/\[MINDURATION\]/g, '300h'],
      [/\[CLUSTERSELECTOR\]/g, `- {key: name, operator: In, values: ["${clusterList[0]}"]}`],
    ]
    const rawYAML = getConfigObject('issue7520/cert_policy_raw.yaml', 'raw', substitutionRules)

    cy.FromGRCToCreatePolicyPage()
      .createPolicyFromYAML(rawYAML, true)
      .CheckGrcMainPage()
      .waitForPolicyStatus(certPolicyName, '0/1')
  })

  it('Verify detailed template/cluster status', () => {
    const policyConf = getConfigObject('issue7520/cert_policy.yaml')
    const confViolationPatterns = getConfigObject('issue7520/violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:certPolicyName}))
    const clusterViolations = {}
    clusterViolations[clusterList[0]] = [certPolicyName+'-cert-expiration-0ns1']  // expect ns1 to be compliant
    cy.visit(`/multicloud/policies/all/${policyConf['namespace']}/${certPolicyName}/template/${clusterList[0]}/${policyConf['apiVersion']}/${policyConf['kind']}/${certPolicyName}-cert-expiration`).waitForPageContentLoad()
    verifyPolicyTemplateViolationDetailsForCluster(certPolicyName, policyConf, clusterList[0], clusterViolations, confViolationPatterns)
  })

  // create namespace ns2
  substitutionRules = [
    [/\[POLICYNAME\]/g, uName('create-ns2')],
    [/\[NAMESPACENAME\]/g, uName('ns2')],
    [/\[CLUSTERSELECTOR\]/g, `- {key: name, operator: In, values: ["${clusterList[0]}"]}`],
  ]
  test_applyPolicyYAML('issue7520/create_namespace_raw.yaml', substitutionRules)

  it('Verify detailed template/cluster status', () => {
    const policyConf = getConfigObject('issue7520/cert_policy.yaml')
    const confViolationPatterns = getConfigObject('issue7520/violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:certPolicyName}))
    const clusterViolations = {}
    clusterViolations[clusterList[0]] = [certPolicyName+'-cert-expiration-0ns1', certPolicyName+'-cert-expiration-0ns2']  // expect ns1 and ns2 to be compliant
    cy.visit(`/multicloud/policies/all/${policyConf['namespace']}/${certPolicyName}/template/${clusterList[0]}/${policyConf['apiVersion']}/${policyConf['kind']}/${certPolicyName}-cert-expiration`).waitForPageContentLoad()
    verifyPolicyTemplateViolationDetailsForCluster(certPolicyName, policyConf, clusterList[0], clusterViolations, confViolationPatterns)
  })

  // create certificate issuer in ns2
  substitutionRules = [
    [/\[POLICYNAME\]/g, uName('create-issuer-ns2')],
    [/\[ISSUERNAME\]/g, uName('cert-issuer-ns2')],
    [/\[ISSUERNAMESPACE\]/g, uName('ns2')],
    [/\[CLUSTERSELECTOR\]/g, `- {key: name, operator: In, values: ["${clusterList[0]}"]}`],
  ]
  test_applyPolicyYAML('issue7520/create_test_issuer.yaml', substitutionRules)

  // create certificate in ns2
  substitutionRules = [
    [/\[POLICYNAME\]/g, uName('create-cert-ns2')],
    [/\[CERTNAME\]/g, uName('test-cert-ns2')],
    [/\[CERTNAMESPACE\]/g, uName('ns2')],
    [/\[CN\]/g, uName('ns2.foo.bar.org')],
    [/\[DNSNAMES\]/g, uName('ns2.foo.bar.org')],
    [/\[SECRETNAME\]/g, uName('ns2-cert-secret')],
    [/\[DURATION\]/g, '20h'],
    [/\[RENEWBEFORE\]/g, '10h'],
    [/\[ISSUER\]/g, uName('cert-issuer-ns2')],
    [/\[CLUSTERSELECTOR\]/g, `- {key: name, operator: In, values: ["${clusterList[0]}"]}`],
  ]
  test_applyPolicyYAML('issue7520/create_certificate_raw.yaml', substitutionRules)

  // wait for the updated policy status - should show violation now
  it('Wait for the cert policy status to show violation', () => {
    cy.waitForPolicyStatus(certPolicyName, '1/1')
  })

  it('Verify detailed template/cluster status', () => {
    const policyConf = getConfigObject('issue7520/cert_policy.yaml')
    const confViolationPatterns = getConfigObject('issue7520/violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:certPolicyName}))
    const clusterViolations = {}
    clusterViolations[clusterList[0]] = [certPolicyName+'-cert-expiration-0ns1', certPolicyName+'-cert-expiration-1ns2']  // now expect ns2 to be non-compliant
    cy.visit(`/multicloud/policies/all/${policyConf['namespace']}/${certPolicyName}/template/${clusterList[0]}/${policyConf['apiVersion']}/${policyConf['kind']}/${certPolicyName}-cert-expiration`).waitForPageContentLoad()
    verifyPolicyTemplateViolationDetailsForCluster(certPolicyName, policyConf, clusterList[0], clusterViolations, confViolationPatterns)
  })

  // delete namespace ns2
  substitutionRules = [
    [/\[POLICYNAME\]/g, uName('delete-ns2')],
    [/\[NAMESPACENAME\]/g, uName('ns2')],
    [/\[CLUSTERSELECTOR\]/g, `- {key: name, operator: In, values: ["${clusterList[0]}"]}`],
  ]
  test_applyPolicyYAML('issue7520/delete_namespace_raw.yaml', substitutionRules)

  // wait for the updated policy status - should show compliance again
  it('Wait for the cert policy status to show compliance again', () => {
    cy.waitForPolicyStatus(certPolicyName, '0/1')
  })

  it('Verify detailed template/cluster status', () => {
    const policyConf = getConfigObject('issue7520/cert_policy.yaml')
    const confViolationPatterns = getConfigObject('issue7520/violation-patterns.yaml', 'yaml', getDefaultSubstitutionRules({policyname:certPolicyName}))
    const clusterViolations = {}
    clusterViolations[clusterList[0]] = [certPolicyName+'-cert-expiration-0ns1']  // now again expect ns1 to be compliant
    cy.visit(`/multicloud/policies/all/${policyConf['namespace']}/${certPolicyName}/template/${clusterList[0]}/${policyConf['apiVersion']}/${policyConf['kind']}/${certPolicyName}-cert-expiration`).waitForPageContentLoad()
    verifyPolicyTemplateViolationDetailsForCluster(certPolicyName, policyConf, clusterList[0], clusterViolations, confViolationPatterns)
  })

  // delete cert policy
  it(`Remove cert policy ${certPolicyName}`, () => {
    cy.visit('/multicloud/policies/all')
      .actionPolicyActionInListing(certPolicyName, 'Remove')
  })

  // delete namespace ns1
  substitutionRules = [
    [/\[POLICYNAME\]/g, uName('delete-ns1')],
    [/\[NAMESPACENAME\]/g, uName('ns1')],
    [/\[CLUSTERSELECTOR\]/g, `- {key: name, operator: In, values: ["${clusterList[0]}"]}`],
  ]
  test_applyPolicyYAML('issue7520/delete_namespace_raw.yaml', substitutionRules)

})

