/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import React from 'react'
import TruncateText from '../../../../src-web/components/common/TruncateText'
import { shallow } from 'enzyme'

describe('TruncateText', () => {
  it('renders as expected for truncated text', () => {
    const props = { maxCharacters: 7, text: 'TruncateText'}
    const component = shallow(
      <TruncateText  {...props} />
    )
    expect(component.instance()).toMatchSnapshot()
  })

  it('renders as expected for truncated text', () => {
    const props = {
      maxCharacters: 5,
      text: 'TruncateText',
      position: 'bottom',
      textEnd: '.',
      maxWidth: '30rem'
    }
    const component = shallow(
      <TruncateText  {...props} />
    )
    expect(component.instance()).toMatchSnapshot()
  })

  it('renders as expected for non truncated text', () => {
    const props = { maxCharacters: 25, text: 'NonTruncateText'}
    const component = shallow(
      <TruncateText  {...props} />
    )
    expect(component.instance()).toMatchSnapshot()
  })

  it('renders as expected for null', () => {
    const props = { maxCharacters: 25, text: null}
    const component = shallow(
      <TruncateText  {...props} />
    )
    expect(component.instance()).toMatchSnapshot()
  })

  it('renders as expected for array', () => {
    const props = { maxCharacters: 25, text: [1,2,3]}
    const component = shallow(
      <TruncateText  {...props} />
    )
    expect(component.instance()).toMatchSnapshot()
  })
})
