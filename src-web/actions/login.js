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
  REQUEST_STATUS, USER_LOGIN_RECEIVE_SUCCESS, USER_LOGIN_STATUS,
  USER_LOGOUT_REQUEST, USER_LOGOUT_RECEIVE_SUCCESS, USER_LOGOUT_RECEIVE_FAILURE,
} from './index'

export const receiveLoginSuccess = (user) => ({
  type: USER_LOGIN_RECEIVE_SUCCESS,
  loggedIn: USER_LOGIN_STATUS.LOGGED_IN,
  user
})

export const logoutStart = () => ({
  type: USER_LOGOUT_REQUEST,
  loggedIn: REQUEST_STATUS.IN_PROGRESS,
})

export const receiveLogoutSuccess = () => ({
  type: USER_LOGOUT_RECEIVE_SUCCESS,
  loggedIn: USER_LOGIN_STATUS.LOGGED_OUT
})

export const receiveLogoutError = () => ({
  type: USER_LOGOUT_RECEIVE_FAILURE,
  loggedIn: USER_LOGIN_STATUS.LOGGED_IN
})
