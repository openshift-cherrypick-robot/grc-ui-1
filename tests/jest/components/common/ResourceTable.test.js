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
import { ResourceTable } from '../../../../src-web/components/common/ResourceTable'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import GrcApolloClient from '../../../../lib/client/apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { resourceType, resourceType2,
  itemIds, itemIds2, items, items2,
  items3, staticResourceData, staticResourceData2,
} from './CommonTestingData'
import configureMockStore from 'redux-mock-store'
import {  reduxStorePolicyCluster } from '../ComponentsTestingData'

const mockStore = configureMockStore()
const storePolicyCluster = mockStore(reduxStorePolicyCluster)

describe('ResourceTable no search with console url', () => {
  it('renders as expected', () => {
    const fn = jest.fn()
    const history = {
      'length': 50,
      'action': 'POP',
      'location': {
        'pathname': '/multicloud/policies/all?index=1',
        'search': '',
        'hash': '',
        'key': 's4wxvc'
      }
    }
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={storePolicyCluster}>
          <BrowserRouter>
            <ResourceTable
              staticResourceData={staticResourceData2}
              tableActions={staticResourceData2.tableActions}
              page={1}
              pageSize={10}
              sortDirection={'asc'}
              handleSort={fn}
              totalFilteredItems={13}
              changeTablePage={fn}
              handleSearch={fn}
              searchValue={''}
              items={items2}
              itemIds={itemIds2}
              expandableTable={true}
              listSubItems={true}
              placeHolderText={'Find clusters'}
              highLightRowName={''}
              history={history}
              resourceType={resourceType2}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('ResourceTable no search with empty console url', () => {
  it('renders as expected', () => {
    const fn = jest.fn()
    const history = {
      'length': 50,
      'action': 'POP',
      'location': {
        'pathname': '/multicloud/policies/all?index=1',
        'search': '',
        'hash': '',
        'key': 's4wxvc'
      }
    }
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={storePolicyCluster}>
          <BrowserRouter>
            <ResourceTable
              staticResourceData={staticResourceData2}
              tableActions={staticResourceData2.tableActions}
              page={1}
              pageSize={10}
              sortDirection={'asc'}
              handleSort={fn}
              totalFilteredItems={13}
              changeTablePage={fn}
              handleSearch={fn}
              searchValue={''}
              items={items3}
              itemIds={itemIds2}
              expandableTable={true}
              listSubItems={true}
              placeHolderText={'Find clusters'}
              highLightRowName={''}
              history={history}
              resourceType={resourceType2}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('ResourceTable no search', () => {
  it('renders as expected', () => {
    const fn = jest.fn()
    const history = {
      'length': 50,
      'action': 'POP',
      'location': {
        'pathname': '/multicloud/policies/all',
        'search': '',
        'hash': '',
        'key': 's4wxvc'
      }
    }
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={storePolicyCluster}>
          <BrowserRouter>
            <ResourceTable
              staticResourceData={staticResourceData}
              tableActions={staticResourceData.tableActions}
              page={1}
              pageSize={10}
              sortDirection={'asc'}
              handleSort={fn}
              totalFilteredItems={13}
              changeTablePage={fn}
              handleSearch={fn}
              searchValue={''}
              items={items}
              itemIds={itemIds}
              expandableTable={true}
              listSubItems={true}
              placeHolderText={'Search policies'}
              highLightRowName={''}
              history={history}
              resourceType={resourceType}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('ResourceTable no search', () => {
  it('renders as expected', () => {
    const fn = jest.fn()
    const history = {
      'length': 50,
      'action': 'POP',
      'location': {
        'pathname': '/multicloud/policies/all',
        'search': '',
        'hash': '',
        'key': 's4wxvc'
      }
    }
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={storePolicyCluster}>
          <BrowserRouter>
            <ResourceTable
              staticResourceData={staticResourceData}
              tableActions={staticResourceData.tableActions}
              page={1}
              pageSize={10}
              sortDirection={'asc'}
              handleSort={fn}
              totalFilteredItems={13}
              changeTablePage={fn}
              handleSearch={fn}
              searchValue={''}
              items={items}
              itemIds={itemIds}
              expandableTable={true}
              listSubItems={true}
              placeHolderText={'Search policies'}
              highLightRowName={''}
              history={history}
              resourceType={resourceType}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('ResourceTable with search', () => {
  it('renders as expected', () => {
    const fn = jest.fn()
    const history = {
      'length': 50,
      'action': 'POP',
      'location': {
        'pathname': '/multicloud/policies/all',
        'search': '',
        'hash': '',
        'key': 's4wxvc'
      }
    }
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={storePolicyCluster}>
          <BrowserRouter>
            <ResourceTable
              staticResourceData={staticResourceData}
              tableActions={staticResourceData.tableActions}
              page={1}
              pageSize={10}
              sortDirection={'asc'}
              handleSort={fn}
              totalFilteredItems={13}
              changeTablePage={fn}
              handleSearch={fn}
              searchValue={'policy'}
              items={items}
              itemIds={itemIds}
              expandableTable={true}
              listSubItems={true}
              placeHolderText={'Search policies'}
              highLightRowName={''}
              history={history}
              resourceType={resourceType}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('ResourceTable not expandable', () => {
  it('renders as expected', () => {
    const fn = jest.fn()
    const history = {
      'length': 50,
      'action': 'POP',
      'location': {
        'pathname': '/multicloud/policies/all',
        'search': '',
        'hash': '',
        'key': 's4wxvc'
      }
    }
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <Provider store={storePolicyCluster}>
          <BrowserRouter>
            <ResourceTable
              staticResourceData={staticResourceData}
              tableActions={staticResourceData.tableActions}
              page={1}
              pageSize={20}
              sortDirection={'asc'}
              handleSort={fn}
              totalFilteredItems={13}
              changeTablePage={fn}
              handleSearch={fn}
              searchValue={'policy'}
              items={items}
              itemIds={itemIds}
              expandableTable={false}
              listSubItems={false}
              placeHolderText={'Search policies'}
              highLightRowName={''}
              history={history}
              resourceType={resourceType}
            />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
