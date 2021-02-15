/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../../common/tests'

describe('RHACM4K-1727 - GRC UI: [P1][Sev1][policy-grc] ImageManifest policy governance', () => {
    test_genericPolicyGovernance('ImageManifest_governance/policy-config.yaml', 'ImageManifest_governance/violations-inform.yaml', 'ImageManifest_governance/violations-enforce.yaml')
})

describe('GRC UI: [P1][Sev1][policy-grc] ImageManifest policy governance - clean up', () => {
    test_applyPolicyYAML('ImageManifest_governance/ImageManifest_specification_cleanup_policy_raw.yaml')
})
