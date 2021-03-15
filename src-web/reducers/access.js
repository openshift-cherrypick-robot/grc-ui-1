/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

import {
  USER_ACCESS_SUCCESS,
  USER_ACCESS_FAILURE,
  REQUEST_STATUS
} from '../actions'

export const userAccess = (state = null, action) => {
  if (action) {
    switch (action.type) {
    case USER_ACCESS_SUCCESS:
      return { ...action, status: REQUEST_STATUS.DONE }
    case USER_ACCESS_FAILURE:
      return { ...state,
        status: REQUEST_STATUS.ERROR,
        errorMessage: action.err && action.err.details,
        statusCode: action.err && action.err.statusCode }
    default:
      return state
    }
  }
  return undefined
}
