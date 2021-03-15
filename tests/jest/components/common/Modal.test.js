/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import Modal from '../../../../src-web/components/common/Modal'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import * as reducers from '../../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import {
  resourceType,
  removeResourceModalLabels, editResourceModalLabels,
  enableResourceModalLabels, disableResourceModalLabels,
  enforceResourceModalLabels, informResourceModalLabels
} from '../modals/ModalsTestingData'

// Mock YamlEditor since we aren't passing it any actual data
jest.mock('../../../../src-web/components/common/YamlEditor', () => {
  return function mockYamlEditor() {
    return <div data-testid='mockYamlEditor' />
  }
})

const data = {
  kind: 'Policy',
  metadata: {
    name: 'test-policy'
  }
}

describe('Modal component', () => {
  const preloadedState = window.__PRELOADED_STATE__
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middleware = [thunkMiddleware]
  const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
    applyMiddleware(...middleware)
  ))
  it('renders RemoveResource as expected', () => {
    const component = mount(
      <BrowserRouter>
        <Modal
          type='resource-remove'
          open={true}
          data={data}
          label={removeResourceModalLabels}
          store={store}
        />
      </BrowserRouter>
    )
    expect(toJson(component.find(Modal))).toMatchSnapshot()
  })
  it('renders EditResource as expected', () => {
    const component = mount(
      <BrowserRouter>
        <Modal
          type='resource-edit'
          open={true}
          data={data}
          label={editResourceModalLabels}
          resourceType={resourceType}
          store={store}
        />
      </BrowserRouter>
    )
    expect(toJson(component.find(Modal))).toMatchSnapshot()
  })
  it('renders EnableResource as expected', () => {
    const component = mount(
      <BrowserRouter>
        <Modal
          type='resource-enable'
          open={true}
          data={data}
          label={enableResourceModalLabels}
          store={store}
        />
      </BrowserRouter>
    )
    expect(toJson(component.find(Modal))).toMatchSnapshot()
  })
  it('renders DisableResource as expected', () => {
    const component = mount(
      <BrowserRouter>
        <Modal
          type='resource-disable'
          open={true}
          data={data}
          label={disableResourceModalLabels}
          store={store}
        />
      </BrowserRouter>
    )
    expect(toJson(component.find(Modal))).toMatchSnapshot()
  })
  it('renders EnforceResource as expected', () => {
    const component = mount(
      <BrowserRouter>
        <Modal
          type='resource-enforce'
          open={true}
          data={data}
          label={enforceResourceModalLabels}
          store={store}
        />
      </BrowserRouter>
    )
    expect(toJson(component.find(Modal))).toMatchSnapshot()
  })
  it('renders InformResource as expected', () => {
    const component = mount(
      <BrowserRouter>
        <Modal
          type='resource-inform'
          open={true}
          data={data}
          label={informResourceModalLabels}
          store={store}
        />
      </BrowserRouter>
    )
    expect(toJson(component.find(Modal))).toMatchSnapshot()
  })
  it('returns null given open=false', () => {
    const component = renderer.create(
      <Modal
        type='resource-remove'
        open={false}
        data={data}
        label={removeResourceModalLabels}
        store={store}
      />
    )
    expect(component.toJSON()).toBeNull()
  })
  it('returns null given no type', () => {
    const component = renderer.create(
      <Modal
        store={store}
      />
    )
    expect(component.toJSON()).toBeNull()
  })
})
