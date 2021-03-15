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

import React from 'react'
import ScrollToTop from '../../../../src-web/components/common/ScrollToTop'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import * as reducers from '../../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import GrcApolloClient from '../../../../lib/client/apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'

describe('ScrollToTop component test', () => {
  it('renders as expected', () => {
    global.scrollTo = jest.fn()
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const location = {
      'pathname': '/multicloud/policies/policy/cluster1/1569249226915-policy-test',
      'search': '',
      'hash': '',
      'key': 'q1uagn'
    }
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <ScrollToTop location={location}>
              child
            </ScrollToTop>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
    const location2 = {
      'pathname': '/multicloud/policies/policy/cluster1/1569249226915-policy-test-2',
      'search': '',
      'hash': '',
      'key': 'q1uagn',
    }
    component.update(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <ScrollToTop location={location2}>
              child
            </ScrollToTop>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
