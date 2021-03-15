/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import PolicyTemplateDetails from '../../../src-web/containers/PolicyTemplateDetails'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom'
import * as reducers from '../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import GrcApolloClient from '../../../lib/client/apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'

const preloadedState = window.__PRELOADED_STATE__
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [thunkMiddleware]
const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
  applyMiddleware(...middleware)
))
const location = {
  'pathname': '/multicloud/policies/all/test-namespace/test-policy',
  'search': '',
  'hash': '',
  'key': 'ngh5of',
  'state': undefined
}
const match = {
  'path': '/multicloud/policies/all/:namespace/:name',
  'url': '/multicloud/policies/all/test-namespace/test-policy',
  'isExact': true,
  'params': {
    'name': 'test-policy'
  }
}
const updateSecondaryHeader = jest.fn()

describe('PolicyTemplateDetails container test', () => {
  it('renders as expected', () => {
    const component = mount(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <PolicyTemplateDetails
              location={location}
              match={match}
              updateSecondaryHeader={updateSecondaryHeader}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(toJson(component.find(PolicyTemplateDetails))).toMatchSnapshot()
  })
})
