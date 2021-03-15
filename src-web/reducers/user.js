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
  USER_LOGIN_RECEIVE_SUCCESS,
  USER_LOGOUT_RECEIVE_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_RECEIVE_FAILURE,
  USER_LOGIN_STATUS
} from '../actions'

export const user = (state = null, action) => {
  switch (action.type) {
  case USER_LOGIN_RECEIVE_SUCCESS:
    return action.user
  case USER_LOGOUT_RECEIVE_SUCCESS:
    return null
  default:
    return state
  }
}

export const loggedIn = (state = USER_LOGIN_STATUS.LOGGED_OUT, action) => {
  switch (action.type) {
  case USER_LOGOUT_REQUEST:
  case USER_LOGIN_RECEIVE_SUCCESS:
  case USER_LOGOUT_RECEIVE_FAILURE:
  case USER_LOGOUT_RECEIVE_SUCCESS:
    return action.loggedIn
  default:
    return state
  }
}

export const isAuthenticated = (state) => state.loggedIn === USER_LOGIN_STATUS.LOGGED_IN
