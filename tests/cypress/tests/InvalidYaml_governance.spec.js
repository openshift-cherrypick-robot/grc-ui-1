/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />
import { describeT } from '../support/tagging'
import { getConfigObject } from '../config'
import { getDefaultSubstitutionRules } from '../support/views'
const invalidYamlErrorMessages = getConfigObject('InvalidYamlTests/invalidYamlErrors.yaml', 'yaml')


describeT('RHACM4K-247 - GRC UI: [P1][Sev1][console] Create policy with invalid yaml', () => {
  it('Create policy should fail with invalid policy name in yaml', () => {
    const confFilePolicy = 'InvalidYamlTests/InvalidPolicyName.yaml'
    const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', getDefaultSubstitutionRules())
    cy.waitUntil(() => cy.visit('/multicloud/policies/create')
      .createPolicyFromYAML(rawPolicyYAML, false)
      .get('#create').scrollIntoView().should('be.visible')
      .click()
    ) .checkNotificationMessage('Danger Alert', 'Create error:', invalidYamlErrorMessages['invalidName']['msg'])
  })
  it('Create policy should fail with missing namespace in yaml', () => {
    const confFilePolicy = 'InvalidYamlTests/MissingNamespace.yaml'
    const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', getDefaultSubstitutionRules())
    cy.waitUntil(() => cy.visit('/multicloud/policies/create')
      .createPolicyFromYAML(rawPolicyYAML, false)
      .get('#create').scrollIntoView().should('be.visible')
      .click()
    ) .checkNotificationMessage('Danger Alert', 'Create error:', invalidYamlErrorMessages['missingNamespace']['msg'])
  })
  it('Create policy should fail with invalid indentation in yaml', () => {
    const confFilePolicy = 'InvalidYamlTests/InvalidIndentation.yaml'
    const rawPolicyYAML = getConfigObject(confFilePolicy, 'raw', getDefaultSubstitutionRules())
    cy.waitUntil(() => cy.visit('/multicloud/policies/create')
      .createPolicyFromYAML(rawPolicyYAML, false)
      .get('#create').scrollIntoView().should('be.visible')
      .click()
    ) .checkNotificationMessage('Danger Alert', 'Create error:', invalidYamlErrorMessages['badIndentation']['msg'])
  })
})
