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
import StatusField from '../../../../src-web/components/common/StatusField'
import renderer from 'react-test-renderer'

describe('StatusField', () => {
  it('renders ok as expected', () => {
    const props = {
      status: 'ok',
      text: 'TextStringOK'
    }
    const component = renderer.create(
      <StatusField  {...props} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders warning as expected', () => {
    const props = {
      status: 'warning',
      text: 'TextStringWarning'
    }
    const component = renderer.create(
      <StatusField  {...props} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders failed as expected', () => {
    const props = {
      status: 'failed',
      text: 'TextStringFailed'
    }
    const component = renderer.create(
      <StatusField  {...props} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
  it('renders default as expected', () => {
    const props = {
      status: 'unknown',
      text: 'TextStringDefault'
    }
    const component = renderer.create(
      <StatusField  {...props} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
