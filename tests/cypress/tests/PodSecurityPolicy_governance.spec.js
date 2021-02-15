/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../common/tests'

describe('RHACM4K-1720 - GRC UI: [P1][Sev1][policy-grc] PodSecurityPolicy governance', () => {
  test_genericPolicyGovernance('PodSecurityPolicy_governance/policy-config.yaml', 'PodSecurityPolicy_governance/violations-inform.yaml', 'PodSecurityPolicy_governance/violations-enforce.yaml')
})

describe('GRC UI: [P1][Sev1][policy-grc] PodSecurityPolicy governance - clean up', () => {
  test_applyPolicyYAML('PodSecurityPolicy_governance/PodSecurityPolicy_cleanup_policy_raw.yaml')
})
