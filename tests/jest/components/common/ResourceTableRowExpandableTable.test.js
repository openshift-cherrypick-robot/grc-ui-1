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
import ResourceTableRowExpandableTable from '../../../../src-web/components/common/ResourceTableRowExpandableTable'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import * as reducers from '../../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import GrcApolloClient from '../../../../lib/client/apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { staticResourceDataPolicyOverview } from './CommonTestingData'

describe('ResourceTableRowExpandableTable component test', () => {
  it('renders as expected', () => {
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
            <ResourceTableRowExpandableTable
              items={staticResourceDataPolicyOverview.roleTemplates.rows}
              headers={staticResourceDataPolicyOverview.roleTemplates.subHeaders}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('ResourceTableRowExpandableTable component test', () => {
  it('renders as expected', () => {
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
            <ResourceTableRowExpandableTable
              items={null}
              headers={null}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('ResourceTableRowExpandableTable component test', () => {
  it('renders as expected', () => {
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
            <ResourceTableRowExpandableTable
              items={null}
              headers={null}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('ResourceTableRowExpandableTable component test', () => {
  it('renders as expected', () => {
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
            <ResourceTableRowExpandableTable
              items={['', '', '']}
              headers={['', '', '']}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

const items1 = [
  'calamari',
  {
    'cells': [
      null,
      'imagemanifestvulns exist: [sha256.4109631e69d1d562f014dd49d5166f1c18b4093f4f311275236b94b21c0041c0] in namespace calamari; [sha256.64320fbf95d968fc6b9863581a92d373bc75f563a13ae1c727af37450579f61a] in namespace openshift-cluster-version; [sha256.7ac7819e1523911399b798309025935a9968b277d86d50e5255465d6592c0266] in namespace default; [sha256.573e9e0a1198da4e29eb9a8d7757f7afb7ad085b0771bc6aa03ef96dedc5b743, sha256.a56d40244a544693ae18178a0be8af76602b89abe146a43613eaeac84a27494e, sha256.b25126b194016e84c04a64a0ad5094a90555d70b4761d38525e4aed21d372820] in namespace multicluster-endpoint',
      'K8s has a must `not` have object'
    ]
  }
]

describe('ResourceTableRowExpandableTable component test', () => {
  it('renders as expected', () => {
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
            <ResourceTableRowExpandableTable
              items={items1}
              headers={staticResourceDataPolicyOverview.roleTemplates.subHeaders}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

const items2 = [
  'calamari',
  {
    'cells': [
      'testItem2',
      'imagemanifestvulns exist: [sha256.4109631e69d1d562f014dd49d5166f1c18b4093f4f311275236b94b21c0041c0] in namespace calamari; [sha256.64320fbf95d968fc6b9863581a92d373bc75f563a13ae1c727af37450579f61a] in namespace openshift-cluster-version; [sha256.7ac7819e1523911399b798309025935a9968b277d86d50e5255465d6592c0266] in namespace default; [sha256.573e9e0a1198da4e29eb9a8d7757f7afb7ad085b0771bc6aa03ef96dedc5b743, sha256.a56d40244a544693ae18178a0be8af76602b89abe146a43613eaeac84a27494e, sha256.b25126b194016e84c04a64a0ad5094a90555d70b4761d38525e4aed21d372820] in namespace multicluster-endpoint',
      'K8s has a must `not` have object'
    ]
  }
]

describe('ResourceTableRowExpandableTable component test', () => {
  it('renders as expected', () => {
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
            <ResourceTableRowExpandableTable
              items={items2}
              headers={staticResourceDataPolicyOverview.roleTemplates.subHeaders}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

const items3 = [
  'calamari',
  {
    'subRowsArray': [
      'testItem3',
      {
        'cells': ''
      }
    ]
  }
]

describe('ResourceTableRowExpandableTable component test', () => {
  it('renders as expected', () => {
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
            <ResourceTableRowExpandableTable
              items={items3}
              headers={staticResourceDataPolicyOverview.roleTemplates.subHeaders}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

const items4 = [
  'calamari',
  {
    'subRowsArray': [
      'testItem4',
      {
        'cells': [
          'testItem2',
          'imagemanifestvulns exist: [sha256.4109631e69d1d562f014dd49d5166f1c18b4093f4f311275236b94b21c0041c0] in namespace calamari; [sha256.64320fbf95d968fc6b9863581a92d373bc75f563a13ae1c727af37450579f61a] in namespace openshift-cluster-version; [sha256.7ac7819e1523911399b798309025935a9968b277d86d50e5255465d6592c0266] in namespace default; [sha256.573e9e0a1198da4e29eb9a8d7757f7afb7ad085b0771bc6aa03ef96dedc5b743, sha256.a56d40244a544693ae18178a0be8af76602b89abe146a43613eaeac84a27494e, sha256.b25126b194016e84c04a64a0ad5094a90555d70b4761d38525e4aed21d372820] in namespace multicluster-endpoint',
          'K8s has a must `not` have object'
        ]
      }
    ]
  }
]

describe('ResourceTableRowExpandableTable component test', () => {
  it('renders as expected', () => {
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
            <ResourceTableRowExpandableTable
              items={items4}
              headers={staticResourceDataPolicyOverview.roleTemplates.subHeaders}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

const items5 = [
  'calamari',
  {
    'subRowsArray': [
      'testItem4',
      {'cells': ['', '', '']}
    ]
  }
]

describe('ResourceTableRowExpandableTable component test', () => {
  it('renders as expected', () => {
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
            <ResourceTableRowExpandableTable
              items={items5}
              headers={staticResourceDataPolicyOverview.roleTemplates.subHeaders}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
