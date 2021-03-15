/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

'use strict'

import renderer from 'react-test-renderer'
import React from 'react'
import TableTimestamp from '../../../../src-web/components/common/TableTimestamp'

Date.now = jest.fn(() => 1600291034000)

describe('PolicyTemplateDetailsView component', () => {
  it('renders as expected (recent)', () => {
    const component = renderer.create(
      <TableTimestamp
        timestamp={'2020-09-14T18:32:33Z'}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('renders as expected (long ago)', () => {
    const component = renderer.create(
      <TableTimestamp
        timestamp={'2015-09-14T18:32:33Z'}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('renders as expected -- unknown timestamp', () => {
    const component = renderer.create(
      <TableTimestamp />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
