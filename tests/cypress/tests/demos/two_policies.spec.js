/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { test_genericPolicyGovernance } from '../common/generic_policies_governance'
import { cleanup_usingPolicyYAML } from '../common/generic_policy_cleanup'

describe('two policies tests', () => {
  test_genericPolicyGovernance('demos/two_policies/policy-config.yaml', 'demos/two_policies/violations-inform.yaml', 'demos/two_policies/violations-enforce.yaml')
})

describe('two policies cleanup', () => {
  cleanup_usingPolicyYAML('demos/two_policies/role_binding_specification_cleanup_policy_raw.yaml')
  cleanup_usingPolicyYAML('demos/two_policies/role_specification_cleanup_policy_raw.yaml')
})
