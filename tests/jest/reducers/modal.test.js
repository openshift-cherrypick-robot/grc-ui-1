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

/*
For a given input, a selector should always produce the same output.
 */

import { modal } from '../../../src-web/reducers/modal'
import * as Actions from '../../../src-web/actions'

describe('modal reducer', () => {
  it('should return a state with MODAL_UPDATE status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.MODAL_UPDATE
    }
    const expectedValue = { test: 'test' }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with CLEAR_REQUEST_STATUS status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.CLEAR_REQUEST_STATUS
    }
    const expectedValue = {
      reqCount: undefined,
      reqErrCount: undefined,
      reqErrorMsg: undefined,
      reqStatus: undefined,
      test: 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with POST_REQUEST status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.POST_REQUEST
    }
    const expectedValue = {
      reqCount: 1,
      reqStatus: 'IN_PROGRESS',
      test: 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with PUT_REQUEST status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.PUT_REQUEST
    }
    const expectedValue = {
      reqCount: 1,
      reqStatus: 'IN_PROGRESS',
      test: 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with DEL_REQUEST status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.DEL_REQUEST
    }
    const expectedValue = {
      reqCount: 1,
      reqStatus: 'IN_PROGRESS',
      test: 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with POST_RECEIVE_SUCCESS status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.POST_RECEIVE_SUCCESS
    }
    const expectedValue = {
      open: false,
      reqCount: 0,
      reqStatus: 'DONE',
      test: 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with PUT_RECEIVE_SUCCESS status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.PUT_RECEIVE_SUCCESS
    }
    const expectedValue = {
      open: false,
      reqCount: 0,
      reqStatus: 'DONE',
      test: 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with DEL_RECEIVE_SUCCESS status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.DEL_RECEIVE_SUCCESS
    }
    const expectedValue = {
      open: false,
      reqCount: 0,
      reqStatus: 'DONE',
      test: 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with DEL_RECEIVE_SUCCESS status', () => {
    const state = {
      test: 'test',
      reqCount: 9
    }
    const action = {
      type: Actions.DEL_RECEIVE_SUCCESS
    }
    const expectedValue = {
      open: false,
      reqCount: 8,
      reqStatus: 'DONE',
      test: 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with POST_RECEIVE_FAILURE status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.POST_RECEIVE_FAILURE,
      err: {
        error: {
          message: 'test'
        }
      }
    }
    const expectedValue = {
      'reqCount': 0,
      'reqErrCount': 1,
      'reqErrorMsg': 'test',
      'reqStatus': 'ERROR',
      'test': 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with PUT_RECEIVE_FAILURE status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.PUT_RECEIVE_FAILURE,
      err: {
        error: {
          message: 'test'
        }
      }
    }
    const expectedValue = {
      'reqCount': 0,
      'reqErrCount': 1,
      'reqErrorMsg': 'test',
      'reqStatus': 'ERROR',
      'test': 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with DEL_RECEIVE_FAILURE status', () => {
    const state = {
      test: 'test'
    }
    const action = {
      type: Actions.DEL_RECEIVE_FAILURE,
      err: [{message: 'test'}]
    }
    const expectedValue = {
      'reqCount': 0,
      'reqErrCount': 1,
      'reqErrorMsg': 'test',
      'reqStatus': 'ERROR',
      'test': 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a state with DEL_RECEIVE_FAILURE status', () => {
    const state = {
      test: 'test',
      reqCount: 7,
      reqErrCount: 5
    }
    const action = {
      type: Actions.DEL_RECEIVE_FAILURE,
      err: [{message: 'test'}]
    }
    const expectedValue = {
      'reqCount': 6,
      'reqErrCount': 6,
      'reqErrorMsg': 'test',
      'reqStatus': 'ERROR',
      'test': 'test'
    }
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return a default state', () => {
    const state = {
      test: 'test',
    }
    const action = {
      type: Actions.RESOURCE_REQUEST,
    }
    const expectedValue = {'test': 'test'}
    expect(modal(state, action)).toEqual(expectedValue)
  })

  it('should return undefined state', () => {
    expect(modal(null, null)).toEqual(undefined)
  })
  it('should return undefined state', () => {
    expect(modal()).toEqual(undefined)
  })
})
