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
import ResourceFilterView from '../../../../src-web/components/common/ResourceFilterView'
import renderer from 'react-test-renderer'

describe('ResourceFilterView component', () => {
  it('renders as expected', () => {
    const activeFilters = {
      'standards': [
        'HIPAA'
      ]
    }
    const availableFilters = {
      'standards': {
        'name': 'Standards',
        'availableSet': [
          'NIST',
          'FISMA',
          'PCI',
          'HIPAA'
        ]
      },
      'categories': {
        'name': 'Categories',
        'availableSet': [
          'System And Information Integrity',
          'System And Communications Protections'
        ]
      },
      'controls': {
        'name': 'Controls',
        'availableSet': [
          'VA',
          'Secret Encryption',
          'Cert Manager',
          'Mutation Advisor'
        ]
      },
      'type': {
        'name': 'Type',
        'availableSet': [
          'Enforce',
          'Inform only'
        ]
      },
      'severity': {
        'availableSet': []
      }
    }
    const fn = jest.fn()
    const component = renderer.create(
      <ResourceFilterView
        updateFilters={fn}
        onClose={fn}
        activeFilters={activeFilters}
        availableFilters={availableFilters}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('ResourceFilterView component no filter', () => {
  it('renders as expected', () => {
    const fn = jest.fn()
    const component = renderer.create(
      <ResourceFilterView
        updateFilters={fn}
        onClose={fn}
        activeFilters={{}}
        availableFilters={{}}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
