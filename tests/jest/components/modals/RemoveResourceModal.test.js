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
import RemoveResourceModal from '../../../../src-web/components/modals/RemoveResourceModal'
import { mount } from 'enzyme'
import * as reducers from '../../../../src-web/reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { resourceModalData, removeResourceModalLabels } from './ModalsTestingData'
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom'

describe('RemoveResourceModal test', () => {
  it('renders as expected', () => {
    const preloadedState = window.__PRELOADED_STATE__
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const middleware = [thunkMiddleware]
    const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(
      applyMiddleware(...middleware)
    ))
    const component = mount(
      <BrowserRouter>
        <RemoveResourceModal
          data={resourceModalData}
          handleClose={jest.fn()}
          handleSubmit={jest.fn()}
          label={removeResourceModalLabels}
          locale={'en'}
          open={true}
          store={store}
        />
      </BrowserRouter>
    )
    expect(toJson(component.instance())).toMatchSnapshot()
    expect(toJson(component.update())).toMatchSnapshot()
    expect(toJson(component)).toMatchSnapshot()
  })
})
