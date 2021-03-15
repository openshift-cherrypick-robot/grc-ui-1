/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />

import { getConfigObject } from '../config'

describe('RHACM4K-2357 - GRC UI: [P1][Sev1][policy-grc] Create policy page: Verify templates', () => {

const policyConf = getConfigObject('policy_YAML_templates_verification/policy-config.yaml')

  for (const policyName in policyConf) {
    const rawPolicyYAML = getConfigObject(`policy_YAML_templates_verification/${policyName}-raw.yaml`, 'raw')

    it(`Verify YAML template for ${policyName} specification`, () => {
      cy.visit('/multicloud/policies/create').waitForPageContentLoad()
        .toggleYAMLeditor('On')
        .createPolicyFromSelection(policyName.toLowerCase(), false, policyConf[policyName])
        .waitForDocumentUpdate()
        .YAMLeditor()
        .then($ed => {
          const content = $ed.getValue()
          cy.log(content)
          assert.equal(content, rawPolicyYAML, 'Editor content should match YAML template')
        })
    })

  }

})
