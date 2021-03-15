/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */


'use strict'

import { resourceActions } from '../../../../src-web/components/common/ResourceTableRowMenuItemActions'

describe('ResourceTableRowMenuItemActions', () => {
  it('table.actions.edit is called as expected', () => {
    const action = 'table.actions.edit'
    const resourceType = {
      'name': 'HCMCompliance',
      'query': 'ALL_POLICIES'
    }
    const dispatch = jest.fn()
    expect(resourceActions(action, dispatch, resourceType, {}, true, {})).toBeUndefined()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch.mock.calls[0]).toMatchSnapshot()
  })
  it('table.actions.launch.cluster is called as expected', () => {
    const action = 'table.actions.launch.cluster'
    const resourceType = {
      'name': 'PoliciesByCluster',
      'query': 'ALL_POLICIES'
    }
    const data = {
      consoleURL: 'website'
    }
    window.open = jest.fn()
    const dispatch = jest.fn()
    expect(resourceActions(action, dispatch, resourceType, data, true, {})).toBeUndefined()
    expect(dispatch).not.toHaveBeenCalled()
    expect(window.open).toHaveBeenCalledTimes(1)
    expect(window.open.mock.calls[0]).toMatchSnapshot()
    window.open.mockClear()
  })
  it('table.actions.compliance.remove is called as expected', () => {
    const action = 'table.actions.compliance.remove'
    const resourceType = {
      'name': 'HCMCompliance',
      'query': 'ALL_POLICIES'
    }
    const dispatch = jest.fn()
    expect(resourceActions(action, dispatch, resourceType, {}, true, {})).toBeUndefined()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch.mock.calls[0]).toMatchSnapshot()
  })
  it('table.actions.policy.remove is called as expected', () => {
    const action = 'table.actions.policy.remove'
    const resourceType = {
      'name': 'HCMCompliance',
      'query': 'ALL_POLICIES'
    }
    const dispatch = jest.fn()
    expect(resourceActions(action, dispatch, resourceType, {}, true, {})).toBeUndefined()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch.mock.calls[0]).toMatchSnapshot()
  })
  it('table.actions.remove is called as expected', () => {
    const action = 'table.actions.remove'
    const resourceType = {
      'name': 'HCMCompliance',
      'query': 'ALL_POLICIES'
    }
    const dispatch = jest.fn()
    expect(resourceActions(action, dispatch, resourceType, {}, true, {})).toBeUndefined()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch.mock.calls[0]).toMatchSnapshot()
  })
  it('table.actions.disable is called as expected', () => {
    const action = 'table.actions.disable'
    const resourceType = {
      'name': 'HCMCompliance',
      'query': 'ALL_POLICIES'
    }
    const dispatch = jest.fn()
    expect(resourceActions(action, dispatch, resourceType, {}, true, {})).toBeUndefined()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch.mock.calls[0]).toMatchSnapshot()
  })
  it('table.actions.enable is called as expected', () => {
    const action = 'table.actions.enable'
    const resourceType = {
      'name': 'HCMCompliance',
      'query': 'ALL_POLICIES'
    }
    const dispatch = jest.fn()
    expect(resourceActions(action, dispatch, resourceType, {}, true, {})).toBeUndefined()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch.mock.calls[0]).toMatchSnapshot()
  })
  it('table.actions.enforce is called as expected', () => {
    const action = 'table.actions.enforce'
    const resourceType = {
      'name': 'HCMCompliance',
      'query': 'ALL_POLICIES'
    }
    const dispatch = jest.fn()
    expect(resourceActions(action, dispatch, resourceType, {}, true, {})).toBeUndefined()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch.mock.calls[0]).toMatchSnapshot()
  })
  it('table.actions.inform is called as expected', () => {
    const action = 'table.actions.inform'
    const resourceType = {
      'name': 'HCMCompliance',
      'query': 'ALL_POLICIES'
    }
    const dispatch = jest.fn()
    expect(resourceActions(action, dispatch, resourceType, {}, true, {})).toBeUndefined()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch.mock.calls[0]).toMatchSnapshot()
  })
  it('does nothing and returns undefined given invalid action', () => {
    const action = 'not.an.action'
    const resourceType = {
      'name': 'HCMCompliance',
      'query': 'ALL_POLICIES'
    }
    const dispatch = jest.fn()
    expect(resourceActions(action, dispatch, resourceType, {}, true, {})).toBeUndefined()
    expect(dispatch).toHaveBeenCalledTimes(0)
    expect(dispatch.mock.calls[0]).toBeUndefined()
  })
})
