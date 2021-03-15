/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import filterUserAction from '../../../../src-web/components/common/FilterUserAction'

const policyActions = [
  'table.actions.edit',
  'table.actions.disable',
  'table.actions.enforce',
  'table.actions.remove'
]

const resourceType = {
  'name':'HCMCompliance',
  'list':'ALL_POLICIES'
}

// adminAccessDefault has all permission on default namespace
// adminAccessDefault only has view permission on calamari namespace
const adminAccessDefault = {
  'calamari/policy.open-cluster-management.io/policies': [
    'get',
    'list',
    'watch',
  ],
  'default/*/*': [
    '*'
  ],
}

describe('adminAccessDefault action list on different namespaces ', () => {
  it('should get all permission on default namespace', () => {
    expect(filterUserAction(
      {
        metadata: {
          namespace: 'default'
        }
      },
      policyActions,
      adminAccessDefault,
      resourceType
    )).toMatchSnapshot()
  })

  it('should only get only has view permission on calamari namespace', () => {
    expect(filterUserAction(
      {
        metadata: {
          namespace: 'calamari'
        }
      },
      policyActions,
      adminAccessDefault,
      resourceType
    )).toMatchSnapshot()
  })
})

// test1AccessDefault has all permission on calamari namespace
// test1AccessDefault only has edit permission on avengers namespace
// test1AccessDefault only has view permission on ironman namespace
const test1AccessDefault = {
  'calamari/policy.open-cluster-management.io/policies': [
    'get',
    'list',
    'watch',
    'update',
    'patch',
    'create',
    'delete',
    'deletecollection'
  ],
  'avengers/policy.open-cluster-management.io/policies': [
    'get',
    'list',
    'watch',
    'update',
    'patch',
  ],
  'ironman/policy.open-cluster-management.io/policies': [
    'get',
    'list',
    'watch',
  ],
}

describe('test1AccessDefault action list on different namespaces ', () => {
  it('should get all permission on calamari namespace', () => {
    expect(filterUserAction(
      {
        metadata: {
          namespace: 'calamari'
        }
      },
      policyActions,
      test1AccessDefault,
      resourceType
    )).toMatchSnapshot()
  })
  it('should only get only has edit permission on avengers namespace', () => {
    expect(filterUserAction(
      {
        metadata: {
          namespace: 'avengers'
        }
      },
      policyActions,
      test1AccessDefault,
      resourceType
    )).toMatchSnapshot()
  })
  it('should only get only has view permission on ironman namespace', () => {
    expect(filterUserAction(
      {
        metadata: {
          namespace: 'ironman'
        }
      },
      policyActions,
      test1AccessDefault,
      resourceType
    )).toMatchSnapshot()
  })
})
