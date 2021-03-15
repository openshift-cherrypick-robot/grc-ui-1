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
import ResourceFilterBar from '../../../../src-web/components/common/ResourceFilterBar'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import * as reducers from '../../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import GrcApolloClient from '../../../../lib/client/apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { updateActiveFilters } from '../../../../src-web/actions/common'

describe('ResourceFilterBar no filters applied', () => {
  it('renders as expected', () => {
    const history = {
      'length': 50,
      'action': 'POP',
      'location': {
        'pathname': '/multicloud/policies/',
        'search': '',
        'hash': ''
      }
    }
    const location = {
      'pathname': '/multicloud/policies/',
      'search': '',
      'hash': ''
    }
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <ResourceFilterBar
              activeFilters={{}}
              history={history}
              location={location}
              updateActiveFilters={updateActiveFilters}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('ResourceFilterBar w/ filter applied', () => {
  it('renders as expected', () => {
    const activeFilters = {
      'standards': [
        'HIPAA'
      ]
    }
    const history = {
      'length': 50,
      'action': 'POP',
      'location': {
        'pathname': '/multicloud/policies/',
        'search': '',
        'hash': ''
      }
    }
    const location = {
      'pathname': '/multicloud/policies/',
      'search': '',
      'hash': ''
    }
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component2 = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <ResourceFilterBar
              activeFilters={activeFilters}
              history={history}
              location={location}
              updateActiveFilters={updateActiveFilters}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component2.toJSON()).toMatchSnapshot()
  })
})
