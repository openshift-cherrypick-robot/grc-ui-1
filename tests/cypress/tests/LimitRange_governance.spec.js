/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../common/tests'

describe('GRC UI: [P1][Sev1][policy-grc] LimitRange policy governance - setup', () => {
    test_applyPolicyYAML('LimitRange_governance/LimitRange_specification_setup_policy_raw.yaml')
})

describe('RHACM4K-1726 - GRC UI: [P1][Sev1][policy-grc] LimitRange policy governance', () => {
    test_genericPolicyGovernance('LimitRange_governance/policy-config.yaml', 'LimitRange_governance/violations-inform.yaml', 'LimitRange_governance/violations-enforce.yaml')
})
//setup & clean up yaml files are identical
describe('GRC UI: [P1][Sev1][policy-grc] LimitRange policy governance - clean up', () => {
    test_applyPolicyYAML('LimitRange_governance/LimitRange_specification_setup_policy_raw.yaml')
})
