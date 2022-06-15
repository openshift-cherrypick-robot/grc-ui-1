/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />
import { describeT } from '../support/tagging'
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../support/tests'

describeT('@extended RHACM4K-1720 - GRC UI: [P1][Sev1][policy-grc] PodSecurityPolicy governance', () => {
  test_genericPolicyGovernance('PodSecurityPolicy_governance/policy-config.yaml', 'PodSecurityPolicy_governance/violations-inform.yaml', 'PodSecurityPolicy_governance/violations-enforce.yaml')
})

describeT('@extended GRC UI: [P1][Sev1][policy-grc] PodSecurityPolicy governance - clean up', () => {
  test_applyPolicyYAML('PodSecurityPolicy_governance/PodSecurityPolicy_cleanup_policy_raw.yaml')
})
