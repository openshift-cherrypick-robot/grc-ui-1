/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import {
  MODAL_UPDATE, CLEAR_REQUEST_STATUS, POST_REQUEST, PUT_REQUEST,
  PATCH_REQUEST, DEL_REQUEST, REQUEST_STATUS, POST_RECEIVE_SUCCESS,
  PUT_RECEIVE_SUCCESS, PATCH_RECEIVE_SUCCESS, DEL_RECEIVE_SUCCESS,
  POST_RECEIVE_FAILURE, PUT_RECEIVE_FAILURE, PATCH_RECEIVE_FAILURE,
  DEL_RECEIVE_FAILURE
} from '../actions'

export const modal = (state = {}, action) => {
  if (action) {
    switch (action.type) {
    case MODAL_UPDATE:
      return Object.assign({}, state, action.data)
    case CLEAR_REQUEST_STATUS:
      return Object.assign({}, state, {
        reqStatus: undefined,
        reqErrorMsg: undefined,
        reqCount: undefined,
        reqErrCount: undefined
      })
    case POST_REQUEST:
    case PUT_REQUEST:
    case PATCH_REQUEST:
    case DEL_REQUEST: {
      const reqCount = (state.reqCount || 0)
      return Object.assign({}, state, {
        reqStatus: REQUEST_STATUS.IN_PROGRESS,
        reqCount: reqCount + 1
      })
    }
    case POST_RECEIVE_SUCCESS:
    case PUT_RECEIVE_SUCCESS:
    case PATCH_RECEIVE_SUCCESS:
    case DEL_RECEIVE_SUCCESS: {
      return Object.assign({}, state, {
        reqStatus: REQUEST_STATUS.DONE,
        reqCount: state.reqCount > 0 ? state.reqCount - 1 : 0,
        open: false
      })
    }
    case POST_RECEIVE_FAILURE:
    case PUT_RECEIVE_FAILURE:
    case PATCH_RECEIVE_FAILURE:
    case DEL_RECEIVE_FAILURE: {
      let message
      if (action.err && action.err.error) {
        message = action.err.error.message
      } else {
        message = action.err.message || action.err[0].message
      }
      return Object.assign({}, state, {
        reqCount: state.reqCount > 0 ? state.reqCount - 1 : 0,
        reqErrCount: state.reqErrCount ? state.reqErrCount + 1 : 1,
        reqStatus: REQUEST_STATUS.ERROR,
        reqErrorMsg: message
      })
    }
    default:
      return state
    }
  }
  return undefined
}
