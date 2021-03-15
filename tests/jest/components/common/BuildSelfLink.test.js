/* Copyright (c) 2021 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import { buildSelfLinK } from '../../../../src-web/components/common/BuildSelfLink'

const data1 = {
  'kind': 'Policy',
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'test-iam-policy-1610374358',
    'namespace': 'default',
    'selfLink': null,
  },
  'name': 'test-iam-policy-1610374358',
  'namespace': 'default',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
  },
}

const data2 = {
  'kind': 'PlacementRule',
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'test-iam-policy-1610374358',
    'namespace': 'default',
    'selfLink': null,
  },
  'name': 'test-iam-policy-1610374358',
  'namespace': 'default',
  'raw': {
    'apiVersion': 'policy.open-cluster-management.io/v1',
    'kind': 'Policy',
  },
}

const data3 = {
  'kind': 'PlacementBinding',
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'test-iam-policy-1610374358',
    'namespace': 'default',
    'selfLink': null,
  },
  'name': 'test-iam-policy-1610374358',
  'namespace': 'default',
  'raw': {
    'apiVersion': 'apps.open-cluster-management.io/v1',
    'kind': 'Policy',
  },
}


const data4 = {
  'kind': '',
  '__typename': 'Compliance',
  'metadata': {
    '__typename': 'Metadata',
    'name': 'test-iam-policy-1610374358',
    'namespace': 'default',
    'selfLink': 'testingSelfLink',
  },
  'name': 'test-iam-policy-1610374358',
  'namespace': 'default',
}

describe('BuildSelfLink', () => {
  it('should correctly build self link for policy', () => {
    expect(buildSelfLinK(data1)).toMatchSnapshot()
  })
  it('should correctly build self link for PlacementRule', () => {
    expect(buildSelfLinK(data2)).toMatchSnapshot()
  })
  it('should correctly build self link for PlacementBinding', () => {
    expect(buildSelfLinK(data3)).toMatchSnapshot()
  })
  it('should correctly get testingSelfLink', () => {
    expect(buildSelfLinK(data4)).toMatchSnapshot()
  })
  it('should correctly get empty SelfLink', () => {
    expect(buildSelfLinK('')).toMatchSnapshot()
  })
})
