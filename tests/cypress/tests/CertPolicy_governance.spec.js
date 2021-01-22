/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import {
  createPolicyFromYAML, verifyPolicyInListing, verifyPolicyNotInListing,
  actionPolicyActionInListing, verifyPolicyInPolicyDetails, getDefaultSubstitutionRules,
  verifyPolicyInPolicyStatus, verifyPolicyByYAML
} from '../views/policy'
import { getUniqueResourceName } from '../scripts/utils'
import { getConfigObject } from '../config'

describe('RHACM4K-523/524/525/526/527/528/563/659/663/893/894/895/1567 - GRC UI: [P1][Sev1][policy-grc] - CertificatePolicy governance', () => {
    const certificateName = 'policy-create-certificate'
    const uCertificateName = getUniqueResourceName(certificateName)
    const certificateYAML = getConfigObject('CertPolicyTest/test_certificate_raw.yaml', 'raw', getDefaultSubstitutionRules({policyname:uCertificateName}))
    const certificatePolicyName = 'policy-certificatepolicy'
    const uCertificatePolicyName = getUniqueResourceName(certificatePolicyName)
    const certificatePolicyYAML = getConfigObject('CertPolicyTest/test_certpolicy_raw.yaml', 'raw', getDefaultSubstitutionRules({policyname:uCertificatePolicyName}))
    const certificatePolicyConfig = getConfigObject('CertPolicyTest/test_certpolicy_config.yaml')

    it ('"Govern risk" page can be launched.', () => {
      cy.CheckGrcMainPage()
    })

    it (`Create an expiring certificate ${uCertificateName} in the managed cluster.`, () => {
      cy.FromGRCToCreatePolicyPage()
      createPolicyFromYAML(certificateYAML, true)
    })

    it(`Certificate ${uCertificateName} status becomes available`, () => {
      cy.CheckGrcMainPage()
      cy.waitForPolicyStatus(uCertificateName)
    })

    it ('Navigated to "Govern risk" page and clicked at "Create policy"', () => {
      cy.CheckGrcMainPage()
      cy.FromGRCToCreatePolicyPage()
    })

    it (`Create policy ${uCertificatePolicyName}`, () => {
      createPolicyFromYAML(certificatePolicyYAML, true)
    })

    it(`Certificate policy ${uCertificatePolicyName} status becomes available`, () => {
      cy.CheckGrcMainPage()
      cy.waitForPolicyStatus(uCertificatePolicyName)
    })

    it (`Verify all information about the created certificate policy ${uCertificatePolicyName} on the "Govern and risk" page`, () => {
      verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
    })

    it(`Validate violations/status of created policy ${uCertificatePolicyName} on the detailed policy page`, () => {
      // we need to find another way how to access this page
      cy.visit(`/multicloud/policies/all/default/${uCertificatePolicyName}`)
        .then(() => {
          verifyPolicyInPolicyDetails(uCertificatePolicyName, certificatePolicyConfig, 'enabled', '', 2)
        })
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
      actionPolicyActionInListing(uCertificatePolicyName, 'Disable')
    })

    it('Check disabled policy', () => {
      cy.CheckGrcMainPage()
      verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'disabled')
    })

    it(`Validate enable of the policy ${uCertificatePolicyName}` , () => {
      actionPolicyActionInListing(uCertificatePolicyName, 'Enable')
      cy.CheckGrcMainPage()
    })

    it(`Check enabled policy ${uCertificatePolicyName}`, () => {
      cy.waitForPolicyStatus(uCertificatePolicyName)
      verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
    })

    it(`Edit policy ${uCertificatePolicyName} and change "remediateAction" to "enforce"`, () => {
      actionPolicyActionInListing(uCertificatePolicyName, 'Enforce')
      cy.CheckGrcMainPage()
      cy.waitForPolicyStatus(uCertificatePolicyName)
    })

    it('Check violations stay reported but not remediated', () => {
      certificatePolicyConfig.enforce = true
      certificatePolicyConfig.inform = false
      verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
    })

    it(`Remove created certificate ${uCertificateName}`, () => {
      actionPolicyActionInListing(uCertificateName, 'Remove')
      cy.CheckGrcMainPage()
    })

    it(`Check created certificate ${uCertificateName} is not present`, () => {
      verifyPolicyNotInListing(uCertificateName)
    })

    it(`Remove created policy ${uCertificatePolicyName}`, () => {
      actionPolicyActionInListing(uCertificatePolicyName, 'Remove')
      cy.CheckGrcMainPage()
    })

    it(`Check created policy ${uCertificatePolicyName} is not present`, () => {
      verifyPolicyNotInListing(uCertificatePolicyName)
    })
})

describe('RHACM4K_1205 - GRC UI: [P1][Sev1][policy-grc] - CertificatePolicy governance', () => {
  const certificateName = 'policy-create-certificate'
  const uCertificateName = getUniqueResourceName(certificateName)
  const certificateYAML = getConfigObject('CertPolicyTest/test_certificate_raw.yaml', 'raw', getDefaultSubstitutionRules({policyname:uCertificateName}))
  const certificatePolicyName = 'policy-certificatepolicy-rhacm4k-1205'
  const uCertificatePolicyName = getUniqueResourceName(certificatePolicyName)
  const certificatePolicyYAML = getConfigObject('CertPolicyTest/test_certpolicy_RHACM4K_1205_raw.yaml', 'raw', getDefaultSubstitutionRules({policyname:uCertificatePolicyName}))
  const certificatePolicyConfig = getConfigObject('CertPolicyTest/test_certpolicy_config.yaml')

  it ('"Govern risk" page can be launched.', () => {
    cy.CheckGrcMainPage()
  })

  it (`Create an expiring certificate ${uCertificateName} in the managed cluster.`, () => {
    cy.FromGRCToCreatePolicyPage()
    createPolicyFromYAML(certificateYAML, true)
  })

  it(`Certificate ${uCertificateName} status becomes available`, () => {
    cy.CheckGrcMainPage()
    cy.waitForPolicyStatus(uCertificateName)
  })

  it ('Navigated to "Govern risk" page and clicked at "Create policy"', () => {
    cy.CheckGrcMainPage()
    cy.FromGRCToCreatePolicyPage()
  })

  it (`Create policy ${uCertificatePolicyName}`, () => {
    createPolicyFromYAML(certificatePolicyYAML, true)
  })

  it(`Certificate policy ${uCertificatePolicyName} status becomes available`, () => {
    cy.CheckGrcMainPage()
    cy.waitForPolicyStatus(uCertificatePolicyName)
  })

  it (`Verify all information about the created certificate policy ${uCertificatePolicyName} on the "Govern and risk" page`, () => {
    verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Validate violations/status of created policy ${uCertificatePolicyName} on the detailed policy page`, () => {
    // we need to find another way how to access this page
    cy.visit(`/multicloud/policies/all/default/${uCertificatePolicyName}`)
      .then(() => {
        verifyPolicyInPolicyDetails(uCertificatePolicyName, certificatePolicyConfig, 'enabled', '', 2)
      })
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
    actionPolicyActionInListing(uCertificatePolicyName, 'Disable')
  })

  it('Check disabled policy', () => {
    cy.CheckGrcMainPage()
    verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'disabled')
  })

  it(`Validate enable of the policy ${uCertificatePolicyName}` , () => {
    actionPolicyActionInListing(uCertificatePolicyName, 'Enable')
    cy.CheckGrcMainPage()
  })

  it(`Check enabled policy ${uCertificatePolicyName}`, () => {
    cy.waitForPolicyStatus(uCertificatePolicyName)
    verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Edit policy ${uCertificatePolicyName} and change "remediateAction" to "enforce"`, () => {
    actionPolicyActionInListing(uCertificatePolicyName, 'Enforce')
    cy.CheckGrcMainPage()
    cy.waitForPolicyStatus(uCertificatePolicyName)
  })

  it('Check violations stay reported but not remediated', () => {
    certificatePolicyConfig.enforce = true
    certificatePolicyConfig.inform = false
    verifyPolicyInListing(uCertificatePolicyName,  certificatePolicyConfig, 'enabled', '', 2)
  })

  it(`Remove created certificate ${uCertificateName}`, () => {
    actionPolicyActionInListing(uCertificateName, 'Remove')
    cy.CheckGrcMainPage()
  })

  it(`Check created certificate ${uCertificateName} is not present`, () => {
    verifyPolicyNotInListing(uCertificateName)
  })

  it(`Remove created policy ${uCertificatePolicyName}`, () => {
    actionPolicyActionInListing(uCertificatePolicyName, 'Remove')
    cy.CheckGrcMainPage()
  })

  it(`Check created policy ${uCertificatePolicyName} is not present`, () => {
    verifyPolicyNotInListing(uCertificatePolicyName)
  })
})

