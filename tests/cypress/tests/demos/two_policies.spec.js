/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../../common/tests'

describe('two policies tests', () => {
  test_genericPolicyGovernance('demos/two_policies/policy-config.yaml', 'demos/two_policies/violations-inform.yaml', 'demos/two_policies/violations-enforce.yaml')
})

describe('two policies cleanup', () => {
  test_applyPolicyYAML('demos/two_policies/role_binding_specification_cleanup_policy_raw.yaml')
  test_applyPolicyYAML('demos/two_policies/role_specification_cleanup_policy_raw.yaml')
})
