/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


import { predicate } from '../../../src-web/reducers/index'
import { RESOURCE_TYPES } from '../../../lib/shared/constants'

describe('predicate', () => {
  it('should return true', () => {
    const action = {
      resourceType: RESOURCE_TYPES.POLICY,
    }
    const resourceType = RESOURCE_TYPES.POLICY
    expect(predicate(resourceType, action)).toEqual(true)
  })

  it('should return true', () => {
    const action = {
      resourceType: 'Policy',
    }
    const resourceType = RESOURCE_TYPES.POLICY
    expect(predicate(resourceType, action)).toEqual('Policy')
  })

  it('should return undefined', () => {
    const action = {
      resourceType: 'Policy',
    }
    expect(predicate(RESOURCE_TYPES, action)).toEqual(null)
  })
})
