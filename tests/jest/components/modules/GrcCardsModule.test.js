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
import {
  policiesTestingDataSet1, policiesTestingDataSet2, findingsTestingDataSet1
} from './ModuleTestingData'
import { GrcCardsModule } from '../../../../src-web/components/modules/GrcCardsModule'
import { shallow } from 'enzyme'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory(
  {
    'length':5,
    'action':'PUSH',
    'location':{
      'pathname':'/multicloud/policies/all',
      'search':'','hash':''
    }
  }
)

const location1 = {
  pathname: '/multicloud/policies/all'
}

const location2 = {
  pathname: '/multicloud/policies/all',
  search: '?card=true'
}

const location3 = {
  pathname: '/multicloud/policies/all',
  search: '?card=false'
}

describe('GrcCardsModule policies page categories view', () => {
  const viewState = {viewState: {grcCardChoice:0}}
  const activeFilters = {activeFilters:{}}
  const updateViewState = jest.fn()
  const handleDrillDownClick = jest.fn()
  it('renders expand as expected', () => {
    const component = shallow(
      <GrcCardsModule
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={policiesTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={true}
        displayType = {'all'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance()).toMatchSnapshot()
  })

  it('renders collapse as expected', () => {
    const component = shallow(
      <GrcCardsModule
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={policiesTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={false}
        displayType = {'other'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance()).toMatchSnapshot()
  })
})

describe('GrcCardsModule policies page standards view', () => {
  const viewState = {viewState: {grcCardChoice:1}}
  const activeFilters = {activeFilters:{}}
  const updateViewState = jest.fn()
  const handleDrillDownClick = jest.fn()
  it('renders expand as expected', () => {
    const component = shallow(
      <GrcCardsModule
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={policiesTestingDataSet2}
        activeFilters={activeFilters}
        showGrcCard={true}
        displayType = {'all'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance()).toMatchSnapshot()
  })

  it('renders collapse as expected', () => {
    const component = shallow(
      <GrcCardsModule
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={policiesTestingDataSet2}
        activeFilters={activeFilters}
        showGrcCard={false}
        displayType = {'other'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance()).toMatchSnapshot()
  })
})

describe('GrcCardsModule findings page categories view', () => {
  const viewState = {viewState: {grcCardChoice:0}}
  const activeFilters = {activeFilters:{}}
  const updateViewState = jest.fn()
  const handleDrillDownClick = jest.fn()
  it('renders expand as expected', () => {
    const component = shallow(
      <GrcCardsModule
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={findingsTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={true}
        displayType = {'findings'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance()).toMatchSnapshot()
  })

  it('renders collapse as expected', () => {
    const component = shallow(
      <GrcCardsModule
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={findingsTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={false}
        displayType = {'findings'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance()).toMatchSnapshot()
  })
})

describe('GrcCardsModule findings page standards view', () => {
  const viewState = {viewState: {grcCardChoice:1}}
  const activeFilters = {activeFilters:{}}
  const updateViewState = jest.fn()
  const handleDrillDownClick = jest.fn()
  it('renders expand as expected', () => {
    const component = shallow(
      <GrcCardsModule
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={findingsTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={true}
        displayType = {'findings'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance()).toMatchSnapshot()
  })

  it('renders collapse as expected', () => {
    const component = shallow(
      <GrcCardsModule
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={findingsTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={false}
        displayType = {'findings'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance()).toMatchSnapshot()
  })
})

describe('GrcCardsModule collapseClick', () => {
  const viewState = {viewState: {grcCardChoice:0}}
  const activeFilters = {activeFilters:{}}
  const updateViewState = jest.fn()
  const handleDrillDownClick = jest.fn()
  it('collapseClick expand as expected', () => {
    const component = shallow(
      <GrcCardsModule
        history={history}
        location={location2}
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={policiesTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={true}
        displayType = {'all'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance().collapseClick()).toMatchSnapshot()
  })

  it('collapseClick collapse as expected', () => {
    const component = shallow(
      <GrcCardsModule
        history={history}
        location={location1}
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={policiesTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={false}
        displayType = {'all'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance().collapseClick()).toMatchSnapshot()
  })

  it('collapseClick collapse as expected', () => {
    const component = shallow(
      <GrcCardsModule
        history={history}
        location={location3}
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={policiesTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={false}
        displayType = {'all'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance().collapseClick()).toMatchSnapshot()
  })

  it('onDropdownSelect as expected', () => {
    const component = shallow(
      <GrcCardsModule
        history={history}
        location={location2}
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={policiesTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={true}
        displayType = {'all'}
        handleDrillDownClick={handleDrillDownClick} />)
    component.instance().onDropdownSelect({
      'target':{
        'tabIndex':0
      }
    })
    expect(component.instance().state.grcCardChoice).toEqual(0)
    component.instance().onDropdownSelect({
      'target':{
        'tabIndex':1
      }
    })
    expect(component.instance().state.grcCardChoice).toEqual(1)
  })

  it('getPolicyCardChoices as expected', () => {
    const component = shallow(
      <GrcCardsModule
        history={history}
        location={location2}
        viewState={viewState}
        updateViewState={updateViewState}
        grcItems={policiesTestingDataSet1}
        activeFilters={activeFilters}
        showGrcCard={true}
        displayType = {'all'}
        handleDrillDownClick={handleDrillDownClick} />)
    expect(component.instance().getPolicyCardChoices()).toMatchSnapshot()
    expect(component.instance().getPolicyCardChoices('en-us')).toMatchSnapshot()
  })
})
