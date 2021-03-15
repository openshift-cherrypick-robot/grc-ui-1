/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../common/tests'

describe('GRC UI: [P1][Sev1][policy-grc] IamPolicy governance - setup', () => {
  test_applyPolicyYAML('IamPolicy_governance/policy-clusterrolebinding-setup_raw.yaml')
})

describe('RHACM4K-1719 - GRC UI: [P1][Sev1][policy-grc] IamPolicy governance', () => {
  test_genericPolicyGovernance('IamPolicy_governance/policy-config.yaml', 'IamPolicy_governance/violations-inform.yaml', 'IamPolicy_governance/violations-inform.yaml')
})

describe('GRC UI: [P1][Sev1][policy-grc] IamPolicy governance - cleanup', () => {
  test_applyPolicyYAML('IamPolicy_governance/policy-clusterrolebinding-cleanup_raw.yaml')
})
