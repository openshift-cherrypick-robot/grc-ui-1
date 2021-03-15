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

// For a given input, a selector should always produce the same output.
import { user, loggedIn, isAuthenticated } from '../../../src-web/reducers/user'
import * as Actions from '../../../src-web/actions'

describe('User reducer', () => {
  describe('#user', () => {
    it('should return the initial state', () => {
      expect(user(undefined, {})).toEqual(null)
    })
    it('should handle USER_LOGIN_RECEIVE_SUCCESS', () => {
      const action = {
        type: Actions.USER_LOGIN_RECEIVE_SUCCESS,
        user: 'admin'
      }
      expect(user({}, action)).toEqual(action.user)
    })
    it('should handle USER_LOGOUT_RECEIVE_SUCCESS', () => {
      const action = {
        type: Actions.USER_LOGOUT_RECEIVE_SUCCESS
      }
      expect(user({}, action)).toEqual(null)
    })
  })

  describe('#loggedIn', () => {
    const initialState = Actions.USER_LOGIN_STATUS.LOGGED_OUT
    it('should return the initial state', () => {
      expect(loggedIn(initialState, {})).toEqual(initialState)
    })
    it('should return the default state', () => {
      const action = {
        type: 'FOOBAR_ACTION'
      }
      expect(loggedIn(undefined, action)).toEqual(initialState)
    })
    it('should handle USER_LOGOUT_REQUEST', () => {
      const action = {
        type: Actions.USER_LOGOUT_REQUEST,
        loggedIn: Actions.REQUEST_STATUS.IN_PROGRESS
      }
      expect(loggedIn(initialState, action)).toEqual(action.loggedIn)
    })
    it('should handle USER_LOGIN_RECEIVE_SUCCESS', () => {
      const action = {
        type: Actions.USER_LOGIN_RECEIVE_SUCCESS,
        loggedIn: Actions.USER_LOGIN_STATUS.LOGGED_IN
      }
      expect(loggedIn(initialState, action)).toEqual(action.loggedIn)
    })
    it('should handle USER_LOGOUT_RECEIVE_FAILURE', () => {
      const action = {
        type: Actions.USER_LOGOUT_RECEIVE_FAILURE,
        loggedIn: Actions.USER_LOGIN_STATUS.LOGGED_IN
      }
      expect(loggedIn(initialState, action)).toEqual(action.loggedIn)
    })
    it('should handle USER_LOGOUT_RECEIVE_SUCCESS', () => {
      const action = {
        type: Actions.USER_LOGOUT_RECEIVE_SUCCESS,
        loggedIn: Actions.USER_LOGIN_STATUS.LOGGED_OUT
      }
      expect(loggedIn(initialState, action)).toEqual(action.loggedIn)
    })
  })

  describe('#isAuthenticated', () => {
    it('should return is Authenticated', () => {
      const state = {
        loggedIn: Actions.USER_LOGIN_STATUS.LOGGED_IN
      }
      expect(isAuthenticated(state)).toEqual(true)
    })
    it('should return is not Authenticated', () => {
      const state = {
        loggedIn: Actions.USER_LOGIN_RECEIVE_SUCCESS
      }
      expect(isAuthenticated(state)).toEqual(false)
    })
  })
})
