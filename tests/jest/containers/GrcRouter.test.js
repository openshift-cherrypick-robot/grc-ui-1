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
import GrcRouter from '../../../src-web/containers/GrcRouter'
import { shallow } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import * as reducers from '../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import GrcApolloClient from '../../../lib/client/apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { ROLES } from '../../../lib/shared/constants'
import toJson from 'enzyme-to-json'

describe('Grc Router container test', () => {
  it('renders as expected', () => {
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const match = {
      'path': '/multicloud',
      'url': '/multicloud',
      'isExact': false,
      'params': {}
    }
    const component = shallow(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <GrcRouter
              match={match}
              ROLES={ROLES}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(toJson(component)).toMatchSnapshot()
  })
})
