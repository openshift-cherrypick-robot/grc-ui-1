/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../../common/tests'

describe('two policies tests', () => {
  test_genericPolicyGovernance('demos/two_specs/policy-config.yaml', 'demos/two_specs/violations-inform.yaml', 'demos/two_specs/violations-enforce.yaml')
})

describe('two policies cleanup', () => {
  test_applyPolicyYAML('demos/two_specs/role_binding_specification_cleanup_policy_raw.yaml')
  test_applyPolicyYAML('demos/two_specs/role_specification_cleanup_policy_raw.yaml')
})
