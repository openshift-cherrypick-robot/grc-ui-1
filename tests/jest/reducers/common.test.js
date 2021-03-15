/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2020. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

/*
For a given input, a selector should always produce the same output.
 */

import {
  resourceToolbar, secondaryHeader,
  resourceReducerFunction,
  resourceItemByName, INITIAL_STATE
} from '../../../src-web/reducers/common'
import { RESOURCE_TYPES } from '../../../lib/shared/constants'

describe('resourceToolbar creation', () => {
  it('should return a default state', () => {
    const action = {}
    const expectedValue = {}
    expect(resourceToolbar(undefined, action)).toEqual(expectedValue)
  })
  it('should return a state with activeFilters', () => {
    const state = {
      activeFilters: 'activeFilters1'
    }
    const action = {
      activeFilters: 'activeFilters2',
      type: 'ACTIVE_FILTER_UPDATE'
    }
    const expectedValue = {
      activeFilters: 'activeFilters2'
    }
    expect(resourceToolbar(state, action)).toEqual(expectedValue)
  })
  it('should return a state with availableFilters2', () => {
    const state = {
      availableFilters: 'availableFilters1'
    }
    const action = {
      availableFilters: 'availableFilters2',
      type: 'AVAILABLE_FILTER_UPDATE'
    }
    const expectedValue = {
      availableFilters: 'availableFilters2'
    }
    expect(resourceToolbar(state, action)).toEqual(expectedValue)
  })
})

describe('secondaryHeader creation', () => {
  it('should return a default state', () => {
    const action = {}
    const expectedValue = {
      title: '',
      tabs: [],
      breadcrumbItems: [],
      links: [],
      description: {},
      information:{}
    }
    expect(secondaryHeader(undefined, action)).toEqual(expectedValue)
  })
  it('should return a state with title', () => {
    const state = {}
    const action = {
      title: 'Clusters',
      tabs: '',
      breadcrumbItems: '',
      links: '',
      type: 'SECONDARY_HEADER_UPDATE'
    }
    const expectedValue = {
      title: 'Clusters',
      tabs: '',
      breadcrumbItems: '',
      links: ''
    }
    expect(secondaryHeader(state, action)).toEqual(expectedValue)
  })
})

describe('resourceItemByName', () => {
  it('should resourceItemByName', () => {
    const items = {'POLICIES_BY_POLICY':'test'}
    const props = {
      resourceType:{name:'HCMCompliance'},
    }
    const expectedValue = 'test'
    expect(resourceItemByName(items, props)).toEqual(expectedValue)
  })
})

describe('resourceItemByName', () => {
  it('should resourceItemByName', () => {
    const items = {'POLICIES_BY_POLICY':'test'}
    const props = {
      resourceType:{name:'JustTesting'},
    }
    const expectedValue = 'test'
    // eslint-disable-next-line no-console
    console.log('Below console logs are just unit test results, not actual errors: ')
    expect(resourceItemByName(items, props)).toEqual(expectedValue)
  })
})

describe('ResourceReducer creation', () => {
  it('should return a default state', () => {
    const action = {}
    const expectedValue = {
      title: '',
      tabs: [],
      breadcrumbItems: [],
      links: [],
      description: {},
      information:{}
    }
    expect(secondaryHeader(undefined, action)).toEqual(expectedValue)
  })
  it('should return a state with title', () => {
    const state = {}
    const action = {
      title: 'Clusters',
      tabs: '',
      breadcrumbItems: '',
      links: '',
      type: 'SECONDARY_HEADER_UPDATE'
    }
    const expectedValue = {
      title: 'Clusters',
      tabs: '',
      breadcrumbItems: '',
      links: ''
    }
    expect(secondaryHeader(state, action)).toEqual(expectedValue)
  })
})

describe('resourceReducerFunction', () => {
  it('should return the initial state', () => {
    const action = {
      type: 'unit-test'
    }
    expect(resourceReducerFunction(undefined, action)).toEqual(INITIAL_STATE)
  })
  it('should return a state with IN_PROGRESS status', () => {
    const state = {
      test: 'test',
      status: 'INCEPTION'
    }
    const action = {
      status: 'IN_PROGRESS',
      type: 'RESOURCE_REQUEST',
    }
    const expectedValue = {
      test: 'test',
      status: 'IN_PROGRESS'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state with DONE status', () => {
    const state = {
      test: 'test',
    }
    const action = {
      type: 'RESOURCE_RECEIVE_SUCCESS',
      items: [],
      resourceVersion: 0
    }
    const expectedValue = {
      test: 'test',
      status: 'DONE',
      items: [],
      page: 1,
      resourceVersion: 0
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state with ERROR status', () => {
    const state = {
      test: 'test',
    }
    const action = {
      type: 'RESOURCE_RECEIVE_FAILURE',
      err: 'error'
    }
    const expectedValue = {
      test: 'test',
      status: 'ERROR',
      err: 'error'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state with post:IN_PROGRESS status', () => {
    const state = {
      test: 'test',
    }
    const action = {
      type: 'POST_REQUEST',
    }
    const expectedValue = {
      test: 'test',
      postStatus: 'IN_PROGRESS'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state with post:DONE status', () => {
    const state = {
      test: 'test',
      items: ['test']
    }
    const action = {
      type: 'POST_RECEIVE_SUCCESS',
      item: ['test1']
    }
    const expectedValue = {
      test: 'test',
      items: ['test', 'test1'],
      postStatus: 'DONE'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state with post:DONE status', () => {
    const state = {
      test: 'test',
      items: ['test']
    }
    const action = {
      type: 'POST_RECEIVE_SUCCESS',
      item: []
    }
    const expectedValue = {'items': ['test', []], 'postStatus': 'DONE', 'test': 'test'}
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state with post:ERROR status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: 'POST_RECEIVE_FAILURE',
      err: {
        error: {
          response: {
            status: 404
          },
          message: 'error'
        }
      }
    }
    const expectedValue = {
      test: 'test',
      postStatusCode: 404,
      postErrorMsg: 'error',
      postStatus: 'ERROR'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state with put:IN_PROGRESS status', () => {
    const state = {
      test: 'test',
    }
    const action = {
      type: 'PUT_REQUEST',
    }
    const expectedValue = {
      test: 'test',
      putStatus: 'IN_PROGRESS'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state with put:DONE status', () => {
    const state = {
      test: 'test',
    }
    const action = {
      type: 'PUT_RECEIVE_SUCCESS',
    }
    const expectedValue = {
      test: 'test',
      putStatus: 'DONE'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state with put:ERROR status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: 'PUT_RECEIVE_FAILURE',
      err: {
        error: {
          message: 'error'
        }
      }
    }
    const expectedValue = {
      test: 'test',
      putErrorMsg: 'error',
      putStatus: 'ERROR'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })

  it('should return a state with PATCH request', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: 'PATCH_REQUEST',
    }
    const expectedValue = {
      test: 'test',
      patchStatus: 'IN_PROGRESS'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })

  it('should return a state with PATCH RECEIVE SUCCESS', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: 'PATCH_RECEIVE_SUCCESS',
    }
    const expectedValue = {
      test: 'test',
      patchStatus: 'DONE'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })

  it('should return a state with PATCH RECEIVE FAILURE', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: 'PATCH_RECEIVE_FAILURE',
      err: {
        error: {
          message: 'error'
        }
      }
    }
    const expectedValue = {
      test: 'test',
      patchErrorMsg: 'error',
      patchStatus: 'ERROR'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })

  it('should return a state with clear action', () => {
    const state = {
      test: 'test',
    }
    const action = {
      type: 'CLEAR_REQUEST_STATUS',
    }
    const expectedValue = {
      test: 'test',
      postStatus: undefined,
      postStatusCode: undefined,
      postErrorMsg: undefined,
      putStatus: undefined,
      putErrorMsg: undefined
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for table search action', () => {
    const state = {
      test: 'test',
    }
    const action = {
      type: 'TABLE_SEARCH',
      search: 'search'
    }
    const expectedValue = {
      test: 'test',
      search: 'search',
      page: 1
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for table sort action', () => {
    const state = {
      test: 'test',
    }
    const action = {
      type: 'TABLE_SORT',
      sortDirection: 'test',
      sortColumn: 'test'
    }
    const expectedValue = {
      test: 'test',
      sortDirection: 'test',
      sortColumn: 'test'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for table page change action', () => {
    const state = {
      test: 'test',
    }
    const action = {
      type: 'TABLE_PAGE_CHANGE',
      page: 1,
      pageSize: 10
    }
    const expectedValue = {
      test: 'test',
      page: 1,
      itemsPerPage: 10
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for resource modify action', () => {
    const state = {
      test: 'test',
      items: ['test']
    }
    const action = {
      type: 'RESOURCE_MODIFY',
      resourceType:{
        query: 'PoliciesList',
        name: 'Policy'
      }
    }
    const expectedValue = {
      test: 'test',
      items: [undefined]
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for resource mutate action', () => {
    const state = {
      test: 'test',
      items: ['test'],
      pendingActions:[{name:'TEST_RESOURCE_MUTATE'}, {name:'TEST_RESOURCE_MUTATE_FAILURE'}],
    }
    const action = {
      resourceName: 'TEST_RESOURCE_MUTATE',
      type: 'RESOURCE_MUTATE',
      resourceType:{
        query: 'PoliciesList',
        name: 'Policy'
      }
    }
    const expectedValue = {
      'items': ['test'],
      'mutateErrorMsg': null,
      'mutateStatus': 'IN_PROGRESS',
      'pendingActions': [
        {
          'name': 'TEST_RESOURCE_MUTATE'
        },
        {
          'name': 'TEST_RESOURCE_MUTATE_FAILURE'
        },
        {
          'action': 'RESOURCE_MUTATE',
          'name': 'TEST_RESOURCE_MUTATE'
        }
      ],
      'test': 'test'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for resource mutate failure action', () => {
    const state = {
      test: 'test',
      items: ['test'],
      pendingActions:[{name:'TEST_RESOURCE_MUTATE'}, {name:'TEST_RESOURCE_MUTATE_FAILURE'}],
    }
    const action = {
      resourceName: 'TEST_RESOURCE_MUTATE_FAILURE',
      type: 'RESOURCE_MUTATE_FAILURE',
      resourceType:{
        query: 'PoliciesList',
        name: 'Policy'
      },
      err:{
        message:'errorMessage',
        error:'errorError',
        data:{
          message:'errorDataMessage',
        }
      }
    }
    const expectedValue = {
      'items': ['test'],
      'mutateErrorMsg': 'errorMessage',
      'mutateStatus': 'ERROR',
      'pendingActions': [
        {
          'name': 'TEST_RESOURCE_MUTATE'
        }
      ],
      'test': 'test'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for resource mutate success action', () => {
    const state = {
      test: 'test',
      items: ['test'],
      pendingActions:[{name:'TEST_RESOURCE_MUTATE'}, {name:'TEST_RESOURCE_MUTATE_FAILURE'}],
    }
    const action = {
      resourceName: 'TEST_RESOURCE_MUTATE_FAILURE',
      type: 'RESOURCE_MUTATE_SUCCESS',
      resourceType:{
        query: 'PoliciesList',
        name: 'Policy'
      },
      err:{
        message:'errorMessage',
        error:'errorError',
        data:{
          message:'errorDataMessage',
        }
      }
    }
    const expectedValue =  {
      'items': ['test'],
      'mutateStatus': 'DONE',
      'pendingActions': [
        {
          'name': 'TEST_RESOURCE_MUTATE'
        }
      ],
      'test': 'test'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for resource delete action', () => {
    const state = {
      test: 'test',
      items: ['test']
    }
    const action = {
      type: 'RESOURCE_DELETE'
    }
    const expectedValue = {
      test: 'test',
      items: []
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return default state for resource delete action', () => {
    const state = {
      test: 'test',
      items: []
    }
    const action = {
      type: 'RESOURCE_DELETE'
    }
    const expectedValue = {
      test: 'test',
      items: []
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for delete receive success action', () => {
    const state = {
      test: 'test',
      items: [{namespace: 'namespace', name: 'name'}]
    }
    const action = {
      type: 'DEL_RECEIVE_SUCCESS',
      resourceType: RESOURCE_TYPES.POLICIES_BY_POLICY,
      resource: {
        namespace: 'namespace',
        name: 'name'
      }
    }
    const expectedValue = {
      test: 'test',
      items: []
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for delete receive success action', () => {
    const state = {
      test: 'test',
      items: []
    }
    const action = {
      type: 'DEL_RECEIVE_SUCCESS',
      resourceType: RESOURCE_TYPES.HCM_CLUSTERS
    }
    const expectedValue = {
      test: 'test',
      items: []
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
  it('should return a state for non-existing action', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: 'unit-test'
    }
    const expectedValue = {
      test: 'test'
    }
    expect(resourceReducerFunction(state, action)).toEqual(expectedValue)
  })
})
