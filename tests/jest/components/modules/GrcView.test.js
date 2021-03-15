/* eslint-disable react/display-name */

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
import { GrcViewPolicyCluster, GrcViewPolicyCluster2,
  GrcViewRefreshControl, GrcViewSecondaryHeaderProps, reduxStorePolicyCluster,
} from '../ComponentsTestingData'
//curly braces means pure component without redux
//which is what we want in unit test
import { GrcView } from '../../../../src-web/components/modules/GrcView'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureMockStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { createMemoryHistory } from 'history'

const mockStore = configureMockStore()
const storePolicyCluster = mockStore(reduxStorePolicyCluster)
const history = createMemoryHistory({
  'length':5,
  'action':'PUSH',
  'location':{
    'pathname':'/multicloud/policies/all',
    'search':'',
    'hash':''
  }
})
// Set key so that it's not regenerated every time
history.location.key='s4wxvc'

describe('GrcView component 1', () => {
  const location = {
    pathname: '/multicloud/policies/all'
  }
  it('renders as expected', () => {
    const component = shallow(
      <Provider store={storePolicyCluster}>
        <BrowserRouter>
          <GrcView
            title='Test1'
            history={history}
            location={location}
            loading={false}
            error={null}
            activeFilters={{}}
            grcItems={GrcViewPolicyCluster2}
            refreshControl={GrcViewRefreshControl}
            secondaryHeaderProps={GrcViewSecondaryHeaderProps}
          />
        </BrowserRouter>
      </Provider>
    )
    expect(toJson(component)).toMatchSnapshot()
  })
})

describe('GrcView component 2', () => {
  const location = {
    pathname: '/multicloud/policies/all'
  }
  it('shows loading when given loading:true', () => {
    const component = renderer.create(
      <Provider store={storePolicyCluster}>
        <BrowserRouter>
          <GrcView
            title='Test2'
            history={history}
            location={location}
            loading={true}
            error={null}
            activeFilters={{}}
            grcItems={GrcViewPolicyCluster}
            refreshControl={GrcViewRefreshControl}
            secondaryHeaderProps={GrcViewSecondaryHeaderProps}
          />
        </BrowserRouter>
      </Provider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('GrcView component 3', () => {
  const location = {
    pathname: '/multicloud/policies/all'
  }
  it('gives an error notification given an error object', () => {
    const component = renderer.create(
      <Provider store={storePolicyCluster}>
        <BrowserRouter>
          <GrcView
            title='Test3'
            history={history}
            location={location}
            loading={false}
            error={{}}
            activeFilters={{}}
            grcItems={GrcViewPolicyCluster}
            refreshControl={GrcViewRefreshControl}
            secondaryHeaderProps={GrcViewSecondaryHeaderProps}
          />
        </BrowserRouter>
      </Provider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('GrcView component 4', () => {
  const location = {
    pathname: '/multicloud/policies/all',
    search: '?index=0&side=true&card=false&toggle=false&filters={"textsearch":["cluster1"]}'
  }
  it('renders as expected', () => {
    const component = renderer.create(
      <Provider store={storePolicyCluster}>
        <BrowserRouter>
          <GrcView
            title='Test4'
            history={history}
            location={location}
            loading={false}
            error={null}
            activeFilters={{'standards':['HIPAA']}}
            grcItems={GrcViewPolicyCluster}
            refreshControl={GrcViewRefreshControl}
            secondaryHeaderProps={GrcViewSecondaryHeaderProps}
          />
        </BrowserRouter>
      </Provider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('GrcView component 7 has create permission', () => {
  const location = {
    pathname: '/multicloud/policies/all',
    search: '?index=1&side=true&card=false&toggle=false&filters={"textsearch":["cluster1"]}'
  }
  it('renders as expected', () => {
    const component = renderer.create(
      <Provider store={storePolicyCluster}>
        <BrowserRouter>
          <GrcView
            title='Test7'
            history={history}
            location={location}
            loading={false}
            error={null}
            activeFilters={{'standards':['HIPAA']}}
            grcItems={[]}
            refreshControl={GrcViewRefreshControl}
            secondaryHeaderProps={GrcViewSecondaryHeaderProps}
            access={reduxStorePolicyCluster.userAccess.access}
          />
        </BrowserRouter>
      </Provider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('GrcView component 8 has not create permission', () => {
  const location = {
    pathname: '/multicloud/policies/all',
    search: '?index=1&side=true&card=false&toggle=false&filters={"textsearch":["cluster1"]}'
  }
  it('renders as expected', () => {
    const component = renderer.create(
      <Provider store={storePolicyCluster}>
        <BrowserRouter>
          <GrcView
            title='Test7'
            history={history}
            location={location}
            loading={false}
            error={null}
            activeFilters={{'standards':['HIPAA']}}
            grcItems={[]}
            refreshControl={GrcViewRefreshControl}
            secondaryHeaderProps={GrcViewSecondaryHeaderProps}
            access={[]}
          />
        </BrowserRouter>
      </Provider>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})

describe('GrcView handleDrillDownClickGrcView', () => {
  const location1 = {
    pathname: '/multicloud/policies/all'
  }
  const location2 = {
    pathname: '/multicloud/policies/findings',
    search: '?index=1&side=true&card=false&toggle=false&filters={"textsearch":["cluster1"]}'
  }
  it('renders as expected', () => {
    const wrapper = shallow(
      <GrcView
        title='Test9'
        history={history}
        location={location1}
        loading={false}
        error={null}
        activeFilters={{}}
        grcItems={[]}
        refreshControl={GrcViewRefreshControl}
        secondaryHeaderProps={GrcViewSecondaryHeaderProps}
      />
    )
    expect(wrapper.instance().handleDrillDownClickGrcView())
      .toEqual('card=false&index=0&toggle=false')
    expect(wrapper.instance().handleDrillDownClickGrcView('standards', 'HIPAA', 'cluster'))
      .toEqual('card=false&index=1&toggle=false')
  })
  it('renders as expected', () => {
    const wrapper = shallow(
      <GrcView
        title='Test9'
        history={history}
        location={location1}
        loading={false}
        error={null}
        activeFilters={{'standards':new Set(['HIPAA'])}}
        grcItems={[]}
        refreshControl={GrcViewRefreshControl}
        secondaryHeaderProps={GrcViewSecondaryHeaderProps}
      />
    )
    expect(wrapper.instance().handleDrillDownClickGrcView('standards', 'HIPAA', 'policy'))
      .toEqual('card=false&index=0&toggle=false')
    expect(wrapper.instance().handleDrillDownClickGrcView(
      'categories',
      'System And Communications Protections',
      'cluster')
    ).toEqual('card=false&index=1&toggle=false')
  })
  it('renders as expected', () => {
    const wrapper = shallow(
      <GrcView
        title='Test9'
        history={history}
        location={location2}
        loading={false}
        error={null}
        activeFilters={{'severity':new Set(['High'])}}
        grcItems={[]}
        refreshControl={GrcViewRefreshControl}
        secondaryHeaderProps={GrcViewSecondaryHeaderProps}
      />
    )
    expect(wrapper.instance().handleDrillDownClickGrcView(
      'categories',
      'System And Information Integrity',
      'finding')
    ).toEqual('card=false&index=0&toggle=false')
  })
  it('renders as expected', () => {
    const wrapper = shallow(
      <GrcView
        title='Test9'
        history={history}
        location={location2}
        loading={false}
        error={null}
        activeFilters={{'standards':new Set(['NIST'])}}
        grcItems={[]}
        refreshControl={GrcViewRefreshControl}
        secondaryHeaderProps={GrcViewSecondaryHeaderProps}
      />
    )
    expect(wrapper.instance().handleDrillDownClickGrcView(
      'standards', 'NIST', 'severity', 'High')
    ).toEqual('card=false&index=0&toggle=false')
  })
})

