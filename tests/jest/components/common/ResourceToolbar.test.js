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
import { ResourceToolbar } from '../../../../src-web/components/common/ResourceToolbar'
import renderer from 'react-test-renderer'
import GrcApolloClient from '../../../../lib/client/apollo-client'
import { ApolloProvider } from 'react-apollo'

const availableFilters = {
  'standards': {
    'name': 'Standards',
    'availableSet': new Set([
      'NIST',
      'FISMA',
      'PCI',
      'HIPAA'
    ])
  },
  'categories': {
    'name': 'Categories',
    'availableSet': new Set([
      'System And Information Integrity',
      'System And Communications Protections'
    ])
  },
  'controls': {
    'name': 'Controls',
    'availableSet': new Set([
      'VA',
      'Secret Encryption',
      'Cert Manager',
      'Mutation Advisor'
    ])
  },
  'type': {
    'name': 'Type',
    'availableSet': new Set([
      'Enforce',
      'Inform only'
    ])
  },
  'severity': {
    'availableSet': new Set([])
  }
}
const location = {
  'pathname': '/multicloud/policies/policy/cluster1/1569249226915-policy-test',
  'search': '',
  'hash': '',
  'key': 'q1uagn'
}

describe('ResourceToolbar component', () => {
  it('renders with active filters as expected', () => {
    const activeFilters = {
      'standards': new Set([
        'HIPAA'
      ])
    }
    const refreshControl = {
      'reloading': false,
      'refreshCookie': 'grc-refresh-interval-cookie',
      'timestamp': 'Tue Sep 24 2019 09:56:26 GMT-0400 (Eastern Daylight Time)'
    }
    const updateFilterSpy = jest.fn()
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <ResourceToolbar
          updateActiveFilters={updateFilterSpy}
          filterViewOpen={true}
          location={location}
          refreshControl={refreshControl}
          activeFilters={activeFilters}
          availableFilters={availableFilters}
        />
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
    const toolbarComponent = component.root.findByType(ResourceToolbar)
    // Test toggling the filter panel
    const setStateSpy = jest.fn()
    toolbarComponent.instance.setState = setStateSpy
    toolbarComponent.instance.toggleFilterModelPress({key: 'Enter'})
    expect(setStateSpy.mock.calls).toHaveLength(1)
    // Test toggling an active filter
    toolbarComponent.instance.updateActiveFilter('standards', 'HIPAA', false)
    expect(updateFilterSpy).toHaveBeenCalledWith({ standards: new Set() })
  })
  it('renders with no filters as expected', () => {
    const component = renderer.create(
      <ApolloProvider client={GrcApolloClient.getGrcClient()}>
        <ResourceToolbar
          updateActiveFilters={jest.fn()}
          filterViewOpen={false}
          location={location}
          refreshControl={{}}
          activeFilters={{}}
          availableFilters={{}}
        />
      </ApolloProvider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
