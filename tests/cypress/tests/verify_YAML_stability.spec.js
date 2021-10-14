/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />

import { describeT } from '../support/tagging'
import { getConfigObject } from '../config'
import { getDefaultSubstitutionRules, parsePolicyNameFromYAML } from '../support/views'

/*
 * The test case paste YAML policy to an editor and then triggers YAML processing
 * by setting the policy to Enforce state and back. Later, verifies that updated
 * YAML content matches the template
 */

const testPolicy = (policyConfFile, templateConfFile) => {

  const substitutionRules = getDefaultSubstitutionRules()
  const rawPolicyYAML = getConfigObject(policyConfFile, 'raw', substitutionRules)
  const rawPolicyTemplateYAML = getConfigObject(templateConfFile, 'raw', substitutionRules)
  const policyName = parsePolicyNameFromYAML(rawPolicyYAML)

  it(`Paste raw YAML of policy ${policyName} into YAML editor`, () => {
    cy.visit('/multicloud/policies/create').waitForPageContentLoad()
      .createPolicyFromYAML(rawPolicyYAML, false)
      .waitForDocumentUpdate()
  })

  it(`Set ${policyName} to an Enforced state and then back to Inform`, () => {
    const choices = ['enforce', 'inform']
    choices.forEach( (choice) => {
      cy.get(`input[name="remediation-${choice}"][type="radio"]`).as(`${choice}`)
      cy.waitUntil(() => cy.get(`@${choice}`).next('label').as('label').get('@label').scrollIntoView().should('be.visible'))
      cy.get(`@${choice}`).next('label').as('label').get('@label').scrollIntoView().should('be.visible').click()
        .waitForDocumentUpdate()
        .get(`@${choice}`).should('be.checked')
    })
  })

  it('Verify that YAML editor content matches the template', () => {
    cy.YAMLeditor()
      .then($ed => {
        const text = $ed.getValue()
        cy.log(text)
        assert.equal(text, rawPolicyTemplateYAML, 'Editor content should match YAML template')
      })
  })

}

describeT('RHACM4K-2509 - GRC UI: [P1][Sev1][console] All policy page: Verify stability of YAML', () => {

  testPolicy('verify_YAML_stability/Gatekeeper-template.yaml', 'verify_YAML_stability/Gatekeeper-template-verify.yaml')
  testPolicy('verify_YAML_stability/LimitRange_template-apply.yaml', 'verify_YAML_stability/LimitRange_template-verify.yaml')

})
