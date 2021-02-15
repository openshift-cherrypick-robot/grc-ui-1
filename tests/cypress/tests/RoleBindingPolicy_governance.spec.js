/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../common/tests'

describe('RHACM4K-1722 - GRC UI: [P1][Sev1][policy-grc] RoleBindingPolicy governance', () => {
  test_genericPolicyGovernance('RoleBinding_policy_governance/policy-config.yaml', 'RoleBinding_policy_governance/violations-inform.yaml', 'RoleBinding_policy_governance/violations-enforce.yaml')
})

describe('GRC UI: [P1][Sev1][policy-grc] RoleBindingPolicy governance - clean up', () => {
  test_applyPolicyYAML('RoleBinding_policy_governance/role_binding_specification_cleanup_policy_raw.yaml')
})
