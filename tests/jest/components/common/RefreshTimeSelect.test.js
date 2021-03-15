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
import RefreshTimeSelect from '../../../../src-web/components/common/RefreshTimeSelect'
import renderer from 'react-test-renderer'

const refreshControl = {
  reloading: false,
  refreshCookie: 'grc-refresh-interval-cookie',
  timestamp: 'Tue Sep 24 2019 16:07:17 GMT-0400 (Eastern Daylight Time)',
  startPolling: jest.fn(),
  stopPolling: jest.fn()
}
const refreshValues = [5,10,30,60,300,1800,0]

describe('RefreshTimeSelect component', () => {
  it('renders as expected without data', () => {
    const component = renderer.create(
      <RefreshTimeSelect
        locale = {'en-US'}
        refreshValues = {[]}
        refreshControl = {{}}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders as expected with data', () => {
    const component = renderer.create(
      <RefreshTimeSelect
        locale = {''}
        refreshValues = {refreshValues}
        refreshControl = {refreshControl}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders as expected on change', () => {
    const component = renderer.create(
      <RefreshTimeSelect
        locale = {''}
        refreshValues = {refreshValues}
        refreshControl = {refreshControl}
      />
    )
    component.root.findByProps({className: 'selection'}).props.onChange({selectedItem: {pollInterval: 0}})
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders loading when reloading=true', () => {
    refreshControl.reloading = true
    const component = renderer.create(
      <RefreshTimeSelect
        locale = {''}
        refreshValues = {refreshValues}
        refreshControl = {refreshControl}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
