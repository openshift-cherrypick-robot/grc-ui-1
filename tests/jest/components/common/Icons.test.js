/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import { mount } from 'enzyme'
import {
  GreenCheckCircleIcon,
  RedExclamationCircleIcon,
  YellowExclamationTriangleIcon,
} from '../../../../src-web/components/common/Icons'
import toJson from 'enzyme-to-json'

describe('test component GreenCheckCircleIcon', () => {
  it('renders as expected', () => {
    const component = mount(
      <GreenCheckCircleIcon />
    )
    expect(toJson(component)).toMatchSnapshot()
  })
  it('renders tooltip as expected', () => {
    const component = mount(
      <GreenCheckCircleIcon tooltip='aaaa' />
    )
    expect(toJson(component)).toMatchSnapshot()
  })

})

describe('test component RedExclamationCircleIcon', () => {
  it('renders as expected', () => {
    const component = mount(
      <RedExclamationCircleIcon />
    )
    expect(toJson(component)).toMatchSnapshot()
  })
  it('renders tooltip as expected', () => {
    const component = mount(
      <RedExclamationCircleIcon tooltip='aaaa' />
    )
    expect(toJson(component)).toMatchSnapshot()
  })
})


describe('test component YellowExclamationTriangleIcon', () => {
  it('renders as expected', () => {
    const component = mount(
      <YellowExclamationTriangleIcon tooltip='aaaa' />
    )
    expect(toJson(component)).toMatchSnapshot()
  })
  it('renders tooltip as expected', () => {
    const component = mount(
      <YellowExclamationTriangleIcon />
    )
    expect(toJson(component)).toMatchSnapshot()
  })
})
