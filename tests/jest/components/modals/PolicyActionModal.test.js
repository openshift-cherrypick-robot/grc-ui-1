/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { PolicyActionModal } from '../../../../src-web/components/modals/PolicyActionModal'
import * as reducers from '../../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Notification } from 'carbon-components-react'
import { Spinner } from '@patternfly/react-core'

import {
  disableResourceModalLabels, enableResourceModalLabels,
  enforceResourceModalLabels, informResourceModalLabels  } from './ModalsTestingData'
import { REQUEST_STATUS } from '../../../../src-web/actions/index'

describe('PolicyActionModal component', () => {
  it('Disable modal renders as expected', () => {
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component = shallow(
      <PolicyActionModal
        type='resource-disable'
        handleClose={jest.fn()}
        handleSubmit={jest.fn()}
        label={disableResourceModalLabels}
        locale={'en'}
        open={true}
        store={store}
      />
    )
    expect(toJson(component)).toMatchSnapshot()
  })

  it('Enable modal renders as expected', () => {
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component = shallow(
      <PolicyActionModal
        type='resource-enable'
        handleClose={jest.fn()}
        handleSubmit={jest.fn()}
        label={enableResourceModalLabels}
        locale={'en'}
        open={true}
        store={store}
      />
    )
    expect(toJson(component)).toMatchSnapshot()
  })

  it('Enforce modal renders as expected', () => {
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component = shallow(
      <PolicyActionModal
        type='resource-enforce'
        handleClose={jest.fn()}
        handleSubmit={jest.fn()}
        label={enforceResourceModalLabels}
        locale={'en'}
        open={true}
        store={store}
      />
    )
    expect(toJson(component)).toMatchSnapshot()
  })

  it('Inform modal renders as expected', () => {
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component = shallow(
      <PolicyActionModal
        type='resource-inform'
        handleClose={jest.fn()}
        handleSubmit={jest.fn()}
        label={informResourceModalLabels}
        locale={'en'}
        open={true}
        store={store}
      />
    )
    expect(toJson(component)).toMatchSnapshot()
  })

  it('Modal renders without data', () => {
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component = shallow(
      <PolicyActionModal
        label={{}}
        locale={'en'}
        open={true}
        store={store}
      />
    )
    expect(toJson(component)).toMatchSnapshot()
  })

  it('Modal returns spinner when loading', () => {
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component = shallow(
      <PolicyActionModal
        label={{}}
        locale={'en'}
        open={true}
        reqStatus={REQUEST_STATUS.IN_PROGRESS}
        store={store}
      />
    )
    expect(component.find(Spinner)).toHaveLength(1)
    expect(toJson(component)).toMatchSnapshot()
  })

  it('Modal returns notification on error', () => {
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component = shallow(
      <PolicyActionModal
        label={{}}
        locale={'en'}
        open={true}
        reqStatus={REQUEST_STATUS.ERROR}
        reqErrorMsg='There was an error.'
        store={store}
      />
    )
    expect(component.find(Notification)).toHaveLength(1)
    expect(toJson(component)).toMatchSnapshot()
  })
})
