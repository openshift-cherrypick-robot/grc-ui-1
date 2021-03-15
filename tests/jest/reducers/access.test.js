/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

// For a given input, a selector should always produce the same output.
import { userAccess } from '../../../src-web/reducers/access'
import * as Actions from '../../../src-web/actions'

describe('Access reducer', () => {
  it('should return a state USER_ACCESS_SUCCESS status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.USER_ACCESS_SUCCESS,
    }
    const expectedValue = {
      'status': 'DONE',
      'type': 'USER_ACCESS_SUCCESS',
    }
    expect(userAccess(state, action)).toEqual(expectedValue)
  })

  it('should return a state USER_ACCESS_FAILURE status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.USER_ACCESS_FAILURE,
      err: {
        details: 'Testing USER_ACCESS_FAILURE',
        statusCode: '404'
      }
    }
    const expectedValue = {
      'errorMessage': 'Testing USER_ACCESS_FAILURE',
      'status': 'ERROR',
      'statusCode': '404',
      'test': 'test',
    }
    expect(userAccess(state, action)).toEqual(expectedValue)
  })
})
