/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

/// <reference types="cypress" />
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../common/tests'

describe('RHACM4K-1724 - GRC UI: [P1][Sev1][policy-grc] Pod policy governance', () => {
    test_genericPolicyGovernance('Pod_governance/policy-config.yaml', 'Pod_governance/violations-inform.yaml', 'Pod_governance/violations-enforce.yaml')
})

describe('GRC UI: [P1][Sev1][policy-grc] Pod policy governance - clean up', () => {
    test_applyPolicyYAML('Pod_governance/Pod_specification_cleanup_policy_raw.yaml')
})
