/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../common/tests'

describe('GRC UI: [P1][Sev1][policy-grc] Namespace policy governance - setup', () => {
    test_applyPolicyYAML('Namespace_governance/Namespace_specification_setup_policy_raw.yaml')
})
describe('RHACM4K-1725 - GRC UI: [P1][Sev1][policy-grc] Namespace policy governance', () => {
    test_genericPolicyGovernance('Namespace_governance/policy-config.yaml', 'Namespace_governance/violations-inform.yaml', 'Namespace_governance/violations-enforce.yaml')
})
describe('GRC UI: [P1][Sev1][policy-grc] Namespace policy governance - clean up', () => {
    test_applyPolicyYAML('Namespace_governance/Namespace_specification_cleanup_policy_raw.yaml')
})
