/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />

import { getConfigObject } from '../config'

describe('RHACM4K-2351 - GRC UI: [P1][Sev1][policy-grc] Create policy page: Updating YAML in editor', () => {

const policyConf = getConfigObject('policy_form_update_per_YAML/policy-config.yaml')
const rawPolicyYAML = getConfigObject('policy_form_update_per_YAML/policy-raw.yaml', 'raw')

  it('Access the Create policy page', () => {
    cy.visit('/multicloud/policies/create').waitForPageContentLoad()
      .toggleYAMLeditor('On')
  })

  it('Individual YAML updates are reflected in a form', () => {
    cy.createPolicyFromSelection('original-iam-policy', false, policyConf['original-iam-policy'])
      .simpleYAMLupdate('original-iam-policy', 'updated-iam-policy', 4)
      .simpleYAMLupdate(/namespace:.*/, 'namespace: openshift', 5)
      .simpleYAMLupdate(/standards:.*/, 'standards: FISMA', 7)
      .simpleYAMLupdate(/categories:.*/, 'categories: PR.DS Data Security', 8)
      .simpleYAMLupdate(/controls:.*/, 'controls: PR.DS-1 Data-at-rest', 9)
      .simpleYAMLupdate('inform', 'enforce', 11)
      .simpleYAMLupdate('false', 'true', 12)
      .waitForDocumentUpdate()
      .verifyCreatePolicySelection('updated-iam-policy', policyConf['updated-iam-policy'])
  })

  it('Check form is updated when whole policy YAML is pasted into YAML editor', () => {
    cy.log(rawPolicyYAML)
      .createPolicyFromYAML(rawPolicyYAML, false)
      .waitForDocumentUpdate()
      .verifyCreatePolicySelection('full-yaml-policy', policyConf['full-yaml-policy'])
  })

})
