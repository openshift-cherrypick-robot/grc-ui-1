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
import {ResourceTableModule} from '../../../../src-web/components/common/ResourceTableModuleFromProps'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import * as reducers from '../../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import GrcApolloClient from '../../../../lib/client/apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { resourceType, staticResourceDataPolicyOverview } from './CommonTestingData'

const preloadedState = window.__PRELOADED_STATE__
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [thunkMiddleware]
const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
  applyMiddleware(...middleware)
))
const resourceData = {
  'role-templates': [],
  'policy-templates': [
    {
      'apiVersion': 'policy.open-cluster-management.io/v1',
      'kind': 'ConfigurationPolicy',
      'metadata': {
        'name': 'policy-pod-1-sample-nginx-pod'
      },
      'templateType': 'policy-templates'
    }
  ],
  'object-templates': []
}

describe('ResourceTableModuleFromProps component test', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <ResourceTableModule
              staticResourceData={staticResourceDataPolicyOverview}
              tableResources={resourceData['policy-templates']}
              resourceData={resourceData}
              definitionsKey={'policyTemplates'}
              resourceType={resourceType}
              normalizedKey={'metadata.name'}
              showPagination={true}
              showSearch={true}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders table with search value as expected', () => {
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <ResourceTableModule
              staticResourceData={staticResourceDataPolicyOverview}
              tableResources={resourceData['policy-templates']}
              resourceData={resourceData}
              definitionsKey={'policyTemplates'}
              resourceType={resourceType}
              normalizedKey={'metadata.name'}
              showPagination={true}
              showSearch={true}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    component.root.findByType(ResourceTableModule).instance.handleSearch({target:{value:'test'}})
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('returns null with no input', () => {
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <ResourceTableModule
              staticResourceData={{}}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toBeNull()
  })
})
