/* Copyright (c) 2020 Red Hat, Inc. */
/// <reference types="cypress" />
import { test_genericPolicyGovernance, test_applyPolicyYAML } from '../common/tests.js'
import { getClusterListByVendor } from '../config'

const getList = getClusterListByVendor('OpenShift')

if (getList.length>0) {
  describe('RHACM4K-1727 - GRC UI: [P1][Sev1][policy-grc] ImageManifest policy governance', () => {
  test_genericPolicyGovernance('ImageManifest_governance/policy-config.yaml', 'ImageManifest_governance/violations-inform.yaml', 'ImageManifest_governance/violations-enforce.yaml', 'clusters.yaml', getList)
})
  describe('GRC UI: [P1][Sev1][policy-grc] ImageManifest governance - cleanup', () => {
    test_applyPolicyYAML('ImageManifest_governance/ImageManifest_specification_cleanup_policy_raw.yaml')
  })
}
