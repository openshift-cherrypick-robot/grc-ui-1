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
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { updateActiveFilters } from '../../../../src-web/actions/common'

describe('ResourceFilterBar', () => {
  const history = {
    'length': 5,
    'action': 'POP',
    'location': {
      'pathname': '/multicloud/policies/',
    }
  }
  const location = {
    'pathname': '/multicloud/policies/'
  }
  it('no filters applied will return null', () => {
    const preloadedState = {
      resourceToolbar: {
        activeFilters: {}
      }
    }
    const mockStore = configureMockStore()
    const storePolicyCluster = mockStore(preloadedState)
    const component = renderer.create(
      <Provider store={storePolicyCluster}>
        <BrowserRouter>
          <ResourceFilterBar
            activeFilters={{}}
            history={history}
            location={location}
            updateActiveFilters={updateActiveFilters}
          />
        </BrowserRouter>
      </Provider>
    )
    expect(component.toJSON()).toBeNull()
  })
  it('w/ HIPAA filter returns single filter chip and clear all link', () => {
    const standardSet = { standards: new Set(['HIPAA']) }
    const activeFilters = {
      ...standardSet,
    }
    const preloadedState = {
      resourceToolbar: {
        activeFilters
      }
    }
    const mockStore = configureMockStore()
    const storePolicyCluster = mockStore(preloadedState)
    const component = renderer.create(
      <Provider store={storePolicyCluster}>
        <BrowserRouter>
          <ResourceFilterBar
            activeFilters={activeFilters}
            history={history}
            location={location}
            updateActiveFilters={updateActiveFilters}
          />
        </BrowserRouter>
      </Provider>
    )
    expect(component.toJSON()).toMatchSnapshot()
    // Child 1: Standards Filter chip
    // Child 2: "Clear All" link
    // Clear single filter: should fire Redux store action to clear Standards filter and also clear filter object
    component.toJSON().children[1].children[1].props.onClick()
    expect(storePolicyCluster.getActions().length).toEqual(1)
    expect(storePolicyCluster.getActions()[0]).toEqual({ type: 'ACTIVE_FILTER_UPDATE', activeFilters: {} } )
    // Click "Clear All": should fire second Redux store action clearing all filters
    component.toJSON().children[2].props.onClick()
    expect(storePolicyCluster.getActions().length).toEqual(2)
    expect(storePolicyCluster.getActions()[1]).toEqual({ type: 'ACTIVE_FILTER_UPDATE', activeFilters: {} })
    // Key press on "Clear All": should fire third Redux store action clearing all filters
    component.toJSON().children[2].props.onKeyPress()
    expect(storePolicyCluster.getActions().length).toEqual(3)
    expect(storePolicyCluster.getActions()[2]).toEqual({ type: 'ACTIVE_FILTER_UPDATE', activeFilters: {} })
  })
  it('w/ HIPAA filter returns multiple filter chips and clear all link', () => {
    const standardSet = { standards: new Set(['HIPAA']) }
    const typeSet = { type: new Set(['Enforce']) }
    const activeFilters = {
      ...standardSet,
      ...typeSet
    }
    const preloadedState = {
      resourceToolbar: {
        activeFilters
      }
    }
    const mockStore = configureMockStore()
    const storePolicyCluster = mockStore(preloadedState)
    const component = renderer.create(
      <Provider store={storePolicyCluster}>
        <BrowserRouter>
          <ResourceFilterBar
            activeFilters={activeFilters}
            history={history}
            location={location}
            updateActiveFilters={updateActiveFilters}
          />
        </BrowserRouter>
      </Provider>
    )
    expect(component.toJSON()).toMatchSnapshot()
    // Child 1: Standards Filter chip
    // Child 2: Enforce Filter chip
    // Child 3: "Clear All" link
    // Clear single filter: should fire Redux store action to clear Standards filter, leaving Types
    component.toJSON().children[1].children[1].props.onClick()
    expect(storePolicyCluster.getActions().length).toEqual(1)
    expect(storePolicyCluster.getActions()[0]).toEqual({ type: 'ACTIVE_FILTER_UPDATE', activeFilters: typeSet } )
    // Clear single filter: should fire Redux store action to clear Standards filter, leaving Types
    component.toJSON().children[2].children[1].props.onClick()
    expect(storePolicyCluster.getActions().length).toEqual(2)
    expect(storePolicyCluster.getActions()[1]).toEqual({ type: 'ACTIVE_FILTER_UPDATE', activeFilters: standardSet } )
    // Click "Clear All": should fire second Redux store action clearing all filters
    component.toJSON().children[3].props.onClick()
    expect(storePolicyCluster.getActions().length).toEqual(3)
    expect(storePolicyCluster.getActions()[2]).toEqual({ type: 'ACTIVE_FILTER_UPDATE', activeFilters: {} })
  })
})
